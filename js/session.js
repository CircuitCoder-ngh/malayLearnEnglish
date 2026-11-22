// The study session: builds a queue of exercises and runs them one at a time.

import { h, shuffle, pick, norm, levenshtein, dayNumber } from './util.js';
import { get, save, flush, settings, today } from './store.js';
import { newState, graduate, markKnown, review, LEARN_STEPS } from './srs.js';
import { speak, canListen } from './speech.js';
import { WORDS, posLabel, byWord, sharesGloss, distractors, nextNewWords, readableSentences, englishTiles, malayTiles } from './vocab.js';
import { audioButton, wordFacts } from './ui.js';

const MAX_REVIEWS = 60;
const SENTENCES_IN_DAILY = 4;
const PRAISE = ['Correct!', 'Great!', 'Well done!', 'Exactly!'];

// ---------- planning ----------

export function plan() {
  const st = get();
  const day = dayNumber();
  const learning = [];
  const due = [];
  for (const w of WORDS) {
    const s = st.words[w.word];
    if (!s) continue;
    if (s.i === 0) learning.push(w);
    else if (s.d <= day) due.push(w);
  }
  const newLeft = Math.max(0, settings().newPerDay - today().n);
  const fresh = nextNewWords(newLeft);
  return { learning, due, fresh, remainingNew: nextNewWords(1).length > 0 };
}

function buildQueue(kind, opts) {
  const st = get();
  if (kind === 'sentences') return sentenceItems(opts.count || 8, new Set(), true);
  if (kind === 'dictation') {
    // Extra spelling practice on words already learned. It does not change their schedule.
    if (!canListen()) return [];
    const learned = WORDS.filter((w) => st.words[w.word]?.i > 0 && !w.word.includes(' '));
    return shuffle(learned).slice(0, opts.count || 10).map((w) => ({ type: 'practice', kind: 'dictation', w }));
  }

  const p = plan();
  const fresh = kind === 'more' ? nextNewWords(opts.count || 5) : p.fresh;
  const due = shuffle(p.due).sort((a, b) => st.words[a.word].d - st.words[b.word].d).slice(0, MAX_REVIEWS);
  const queue = p.learning.map((w) => ({ type: 'learn', w, step: st.words[w.word].st || 1 }));
  const intros = fresh.map((w) => ({ type: 'intro', w }));
  const reviews = shuffle(due.slice(0, 12)).concat(due.slice(12)).map((w) => ({ type: 'review', w }));
  // Interleave: a new word after every few reviews keeps the session varied.
  const gap = intros.length ? Math.max(2, Math.min(4, Math.floor(reviews.length / intros.length))) : 0;
  let ri = 0;
  while (intros.length || ri < reviews.length) {
    for (let k = 0; k < gap && ri < reviews.length; k++) queue.push(reviews[ri++]);
    if (intros.length) queue.push(intros.shift());
    else while (ri < reviews.length) queue.push(reviews[ri++]);
  }
  return queue;
}

function sentenceItems(count, focus, allowStretch) {
  const st = get();
  let pool = readableSentences({ maxGap: 0 });
  if (pool.length < count && allowStretch) pool = readableSentences({ maxGap: 1 });
  const seen = (s) => st.sentences[s.text]?.n || 0;
  const fresh = (s) => Number(s.deps.some((i) => focus.has(WORDS[i])));
  const scored = shuffle(pool).sort((a, b) => (seen(a) - seen(b)) || (fresh(b) - fresh(a)));
  return scored.slice(0, count).map((s, i) => {
    const modes = ['to-malay', 'to-english'];
    if (canListen()) modes.push('listen');
    return { type: 'sentence', s, mode: seen(s) > 0 ? pick(modes) : modes[i % 2] };
  });
}

const unitsOf = (item) => {
  if (item.type === 'intro') return 1 + LEARN_STEPS;
  if (item.type === 'learn') return LEARN_STEPS - item.step + 1;
  return 1;
};

// ---------- answer checking ----------

function checkTyped(input, w) {
  const a = norm(input);
  const t = norm(w.word);
  if (!a) return 'empty';
  if (a === t || a === t.replace(/-/g, ' ') || a.replace(/-/g, ' ') === t) return 'exact';
  if (w.alt.some((x) => norm(x) === a)) return 'exact'; // American spelling
  const other = byWord.get(a);
  if (other) return sharesGloss(other, w) ? 'synonym' : 'wrong';
  const tolerance = t.length >= 8 ? 2 : t.length >= 5 ? 1 : 0;
  if (levenshtein(a, t) <= tolerance) return 'close';
  return 'wrong';
}

function clozeParts(w) {
  const esc = w.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const m = new RegExp(`(^|[^\\p{L}'’-])(${esc})(?![\\p{L}'’-])`, 'iu').exec(w.ex);
  if (!m) return null;
  const start = m.index + m[1].length;
  return { before: w.ex.slice(0, start), after: w.ex.slice(start + m[2].length), found: m[2] };
}

// ---------- the session ----------

export function runSession(root, kind = 'daily', opts = {}, onExit) {
  const st = get();
  // Browsers load their voices a moment after the page: give them a chance before deciding there are none.
  if (kind === 'dictation' && !canListen() && settings().audio && !opts.waited) {
    root.replaceChildren(h('div', { class: 'session' }, h('div', { class: 'card summary' }, h('p', { class: 'muted' }, 'Memuatkan suara…'))));
    setTimeout(() => { if (root.isConnected && location.hash.includes('dictation')) runSession(root, kind, { ...opts, waited: true }, onExit); }, 900);
    return;
  }
  const queue = buildQueue(kind, opts);
  const stats = { answers: 0, correct: 0, learned: [], reviewed: 0, practised: 0, sentences: 0, sentencesOk: 0, started: Date.now() };
  const touched = new Set();
  let total = queue.reduce((n, it) => n + unitsOf(it), 0);
  let done = 0;
  let sentencePhase = kind !== 'daily' && kind !== 'more';
  let keyHandler = null;

  const bar = h('div', { class: 'progress-fill' });
  const stage = h('div', { class: 'stage' });
  const shell = h('div', { class: 'session' },
    h('div', { class: 'session-top' },
      h('button', { class: 'icon-btn', 'aria-label': 'Tamatkan sesi', title: 'Tamatkan sesi', onclick: () => finish(true) }, '✕'),
      h('div', { class: 'progress', role: 'progressbar', 'aria-label': 'Kemajuan sesi' }, bar),
    ),
    stage,
  );
  root.replaceChildren(shell);

  const onKey = (e) => { if (keyHandler) keyHandler(e); };
  document.addEventListener('keydown', onKey);

  function cleanup() {
    document.removeEventListener('keydown', onKey);
    keyHandler = null;
    flush();
  }

  // After an answer, Enter moves on. The short delay stops the same key press that
  // submitted the answer from also skipping the feedback.
  function continueOnEnter() {
    const since = Date.now();
    keyHandler = (e) => {
      if (e.key !== 'Enter') return;
      e.preventDefault();
      if (!e.repeat && Date.now() - since > 150) next();
    };
  }

  function requeue(item, offset) {
    queue.splice(Math.min(queue.length, offset), 0, item);
  }

  function setProgress() {
    bar.style.width = `${total ? Math.min(100, Math.round((done / total) * 100)) : 0}%`;
  }

  function show(label, ...content) {
    stage.replaceChildren(h('div', { class: 'card exercise' }, label ? h('div', { class: 'kicker' }, label) : null, ...content));
    stage.scrollIntoView({ block: 'nearest' });
    setProgress();
  }

  function next() {
    save();
    if (!queue.length && !sentencePhase) {
      sentencePhase = true;
      const items = sentenceItems(SENTENCES_IN_DAILY, touched, false);
      if (items.length >= 2 && (stats.learned.length || stats.reviewed)) {
        queue.push(...items);
        total += items.length;
      }
    }
    if (!queue.length) return finish(false);
    keyHandler = null; // each exercise installs its own keyboard shortcuts
    const item = queue.shift();
    if (item.type === 'intro') return intro(item);
    if (item.type === 'sentence') return sentence(item);
    return quiz(item);
  }

  // ----- new word -----
  function intro(item) {
    const { w } = item;
    const go = (known) => {
      const ws = (st.words[w.word] = newState());
      today().n += 1;
      touched.add(w);
      if (known) {
        markKnown(ws);
        done += 1 + LEARN_STEPS;
      } else {
        done += 1;
        requeue({ type: 'learn', w, step: 1 }, 2);
      }
      next();
    };
    const cont = h('button', { class: 'btn primary', onclick: () => go(false) }, 'Faham');
    show(`Perkataan baharu · #${w.rank}`,
      h('div', { class: 'intro' },
        h('div', { class: 'headword-row' }, h('div', { class: 'headword', lang: 'en' }, w.word), audioButton(w.word, 'lg')),
        h('div', { class: 'gloss' }, w.gloss.join('; ')),
        wordFacts(w),
      ),
      h('div', { class: 'actions' },
        h('button', { class: 'btn ghost', onclick: () => go(true) }, 'Saya sudah tahu'),
        cont,
      ),
    );
    if (settings().autoplay) speak(w.word);
    cont.focus({ preventScroll: true });
    keyHandler = (e) => { if (e.key === 'Enter') { e.preventDefault(); go(false); } };
  }

  // ----- word questions -----
  function chooseKind(item) {
    const ws = st.words[item.w.word];
    const typing = settings().typing;
    const listen = canListen();
    const cloze = !!clozeParts(item.w);
    if (item.type === 'relearn') return 'mcq-to-english';
    if (item.type === 'learn') {
      if (item.step === 1) return 'mcq-to-malay';
      if (item.step === 2) return 'mcq-to-english';
      return typing ? 'type' : cloze ? 'cloze-mcq' : 'mcq-to-english';
    }
    const opts = [];
    if (ws.i < 3) {
      opts.push('mcq-to-malay', 'mcq-to-english');
      if (listen) opts.push('listen-mcq');
      if (listen && typing) opts.push('dictation');
    } else if (ws.i < 7) {
      opts.push('mcq-to-english');
      if (cloze) opts.push('cloze-mcq');
      if (listen) opts.push('listen-mcq');
      if (listen && typing) opts.push('dictation');
    } else if (typing) {
      opts.push('type', 'type');
      if (cloze) opts.push('cloze-type');
      if (listen) opts.push('listen-mcq', 'dictation');
    } else {
      opts.push('mcq-to-english');
      if (cloze) opts.push('cloze-mcq');
      if (listen) opts.push('listen-mcq');
    }
    return pick(opts);
  }

  function quiz(item) {
    const { w } = item;
    const kind = item.kind || chooseKind(item);
    const label = item.type === 'practice' ? 'Imlak' : item.type === 'review' ? 'Ulang kaji' : item.type === 'relearn' ? 'Sekali lagi' : 'Belajar';
    let answered = false;

    const resolve = (correct, note) => {
      if (answered) return;
      answered = true;
      touched.add(w);
      const ws = st.words[w.word];
      if (item.type !== 'relearn') {
        stats.answers++;
        if (correct) stats.correct++;
        const d = today();
        d.t++;
        if (correct) d.ok++;
      }
      if (item.type === 'learn') {
        if (correct) {
          done++;
          if (item.step >= LEARN_STEPS) { graduate(ws); stats.learned.push(w); }
          else { ws.st = item.step + 1; requeue({ type: 'learn', w, step: item.step + 1 }, item.step === 1 ? 3 : 5); }
        } else {
          requeue({ type: 'learn', w, step: item.step }, 3);
        }
      } else if (item.type === 'practice') {
        done++;
        stats.practised++;
        if (!correct && !item.retry) { requeue({ ...item, retry: true }, 3); total++; }
      } else if (item.type === 'review') {
        done++;
        stats.reviewed++;
        today().r++;
        review(ws, correct);
        if (!correct) requeue({ type: 'relearn', w }, 4);
      } else if (!correct) {
        requeue({ type: 'relearn', w }, 3);
      }
      feedback(correct, w, note);
    };

    if (kind === 'mcq-to-malay' || kind === 'listen-mcq') {
      const listenOnly = kind === 'listen-mcq';
      const options = shuffle([w, ...distractors(w)]);
      show(label,
        h('div', { class: 'prompt' },
          h('div', { class: 'ask' }, listenOnly ? 'Dengar. Apakah maksudnya?' : 'Apakah maksud perkataan ini?'),
          listenOnly
            ? h('div', { class: 'headword-row' }, audioButton(w.word, 'xl'))
            : h('div', { class: 'headword-row' }, h('div', { class: 'headword', lang: 'en' }, w.word), audioButton(w.word, 'lg')),
        ),
        choiceList(options.map((o) => ({ text: o.gloss.slice(0, 2).join('; '), right: o === w })), resolve),
      );
      if (listenOnly || settings().autoplay) speak(w.word);
    } else if (kind === 'mcq-to-english') {
      const options = shuffle([w, ...distractors(w)]);
      show(label,
        h('div', { class: 'prompt' },
          h('div', { class: 'ask' }, 'Apakah perkataan ini dalam bahasa Inggeris?'),
          h('div', { class: 'headword gloss-prompt' }, w.gloss.join('; ')),
          h('div', { class: 'pos-hint' }, posLabel(w)),
        ),
        choiceList(options.map((o) => ({ text: o.word, lang: 'en', right: o === w })), resolve),
      );
    } else if (kind === 'cloze-mcq' || kind === 'cloze-type') {
      const parts = clozeParts(w);
      const blank = h('span', { class: 'blank' }, ' ');
      const head = h('div', { class: 'prompt' },
        h('div', { class: 'ask' }, 'Lengkapkan ayat'),
        h('div', { class: 'cloze', lang: 'en' }, parts.before, blank, parts.after),
        h('div', { class: 'cloze-tr' }, w.exTr),
      );
      const reveal = () => { blank.textContent = parts.found; blank.classList.add('filled'); };
      if (kind === 'cloze-mcq') {
        const options = shuffle([w, ...distractors(w)]);
        const shown = (o) => (/^(I|[A-Z][a-z]+day|January|February|March|April|May|June|July|August|September|October|November|December)$/.test(o.word) ? o.word : o.word.toLowerCase());
        show(label, head, choiceList(options.map((o) => ({ text: shown(o), lang: 'en', right: o === w })), (ok) => { reveal(); resolve(ok); }));
      } else {
        show(label, head, typeBox(w, (ok, note) => { reveal(); resolve(ok, note); }));
      }
    } else if (kind === 'dictation') {
      // English spelling cannot be guessed from the sound, so hearing and writing is its own skill.
      show(label,
        h('div', { class: 'prompt' },
          h('div', { class: 'ask' }, 'Dengar dan taip perkataan itu'),
          h('div', { class: 'headword-row' }, audioButton(w.word, 'xl')),
          h('div', { class: 'pos-hint' }, `maksud: ${w.gloss.join('; ')}`),
        ),
        typeBox(w, resolve),
      );
      speak(w.word);
    } else {
      show(label,
        h('div', { class: 'prompt' },
          h('div', { class: 'ask' }, 'Taip dalam bahasa Inggeris'),
          h('div', { class: 'headword gloss-prompt' }, w.gloss.join('; ')),
          h('div', { class: 'pos-hint' }, posLabel(w)),
        ),
        typeBox(w, resolve),
      );
    }
  }

  function choiceList(options, resolve) {
    const buttons = options.map((o, i) => h('button', {
      class: 'choice', lang: o.lang || null,
      onclick: () => choose(i),
    }, h('span', { class: 'key' }, String(i + 1)), h('span', { class: 'choice-text' }, o.text)));
    let locked = false;
    function choose(i) {
      if (locked || !options[i]) return;
      locked = true;
      buttons.forEach((b, j) => {
        b.disabled = true;
        if (options[j].right) b.classList.add('right');
        else if (j === i) b.classList.add('wrong');
      });
      resolve(options[i].right);
    }
    keyHandler = (e) => {
      const n = Number(e.key);
      if (n >= 1 && n <= options.length) { e.preventDefault(); choose(n - 1); }
    };
    return h('div', { class: 'choices' }, buttons);
  }

  function typeBox(w, resolve) {
    const input = h('input', {
      class: 'type-input', type: 'text', lang: 'en', autocomplete: 'off', autocapitalize: 'none', autocorrect: 'off', spellcheck: 'false',
      placeholder: 'Taip perkataan Inggeris', 'aria-label': 'Jawapan anda dalam bahasa Inggeris', enterkeyhint: 'done',
    });
    const msg = h('div', { class: 'type-msg', 'aria-live': 'polite' });
    let locked = false;
    const submit = () => {
      if (locked) return;
      const res = checkTyped(input.value, w);
      if (res === 'empty') { input.focus(); return; }
      if (res === 'synonym') {
        msg.textContent = `“${input.value.trim()}” mempunyai maksud yang hampir sama, tetapi perkataan lain dikehendaki di sini. Ia bermula dengan huruf “${w.word[0]}”.`;
        input.select();
        return;
      }
      locked = true;
      input.disabled = true;
      input.classList.add(res === 'wrong' ? 'wrong' : 'right');
      resolve(res !== 'wrong', res === 'close' ? `Hampir betul: perhatikan ejaan. Anda menaip “${input.value.trim()}”.` : null);
    };
    const hint = h('button', { class: 'btn text', onclick: () => {
      const letters = w.word.replace(/[^\p{L}]/gu, '').length;
      msg.textContent = `Bermula dengan huruf “${w.word[0]}”, ${letters} huruf.`;
      input.focus();
    } }, 'Petunjuk');
    const giveUp = h('button', { class: 'btn text', onclick: () => { if (!locked) { locked = true; input.disabled = true; resolve(false); } } }, 'Tidak tahu');
    const check = h('button', { class: 'btn primary', onclick: submit }, 'Semak');
    const box = h('div', { class: 'typebox' }, input, msg, h('div', { class: 'actions' }, hint, giveUp, check));
    setTimeout(() => input.focus({ preventScroll: true }), 30);
    keyHandler = (e) => { if (e.key === 'Enter' && !locked) { e.preventDefault(); submit(); } };
    return box;
  }

  function feedbackHead(correct, wrongSub) {
    return h('div', { class: 'feedback-head' },
      h('span', { class: 'mark', 'aria-hidden': 'true' }, correct ? '✓' : '✕'),
      correct ? h('strong', { lang: 'en' }, pick(PRAISE)) : h('strong', null, 'Belum tepat'),
      h('span', { class: 'feedback-sub' }, correct ? 'Betul' : wrongSub),
    );
  }

  function feedback(correct, w, note) {
    const cont = h('button', { class: 'btn primary', onclick: next }, 'Teruskan');
    const panel = h('div', { class: `feedback ${correct ? 'good' : 'bad'}`, role: 'status' },
      feedbackHead(correct, 'Ini jawapannya'),
      note ? h('div', { class: 'feedback-note' }, note) : null,
      h('div', { class: 'answer-row' },
        h('span', { class: 'answer-en', lang: 'en' }, w.word), audioButton(w.word),
        h('span', { class: 'answer-tr' }, w.gloss.join('; ')),
      ),
      h('div', { class: 'answer-ex' }, h('span', { lang: 'en' }, w.ex), h('span', { class: 'muted' }, ' — ' + w.exTr)),
      h('div', { class: 'actions' }, cont),
    );
    stage.querySelector('.exercise').append(panel);
    if (settings().autoplay) speak(w.word);
    setProgress();
    setTimeout(() => { cont.focus({ preventScroll: true }); panel.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }, 20);
    continueOnEnter();
  }

  // ----- sentences -----
  function sentence(item) {
    const { s, mode } = item;
    const toEnglish = mode !== 'to-malay';
    const target = toEnglish ? englishTiles(s.text) : malayTiles(s.tr);
    const extraPool = toEnglish
      ? WORDS.filter((x) => st.words[x.word] && !x.word.includes(' ')).map((x) => (x.word === 'I' || /^[A-Z]/.test(x.word) ? x.word : x.word.toLowerCase()))
      : readableSentences({ maxGap: 1 }).flatMap((x) => malayTiles(x.tr));
    const targetSet = new Set(target.map((t) => norm(t)));
    const extras = [...new Set(shuffle(extraPool).filter((t) => !targetSet.has(norm(t))))].slice(0, target.length <= 3 ? 2 : 3);
    const bank = shuffle([...target, ...extras]).map((text, id) => ({ id, text, used: false }));
    const answer = [];
    let locked = false;

    const line = h('div', { class: 'answer-line', lang: toEnglish ? 'en' : null, 'aria-label': 'Ayat anda' });
    const tray = h('div', { class: 'tile-bank', lang: toEnglish ? 'en' : null });
    const check = h('button', { class: 'btn primary', disabled: true, onclick: submit }, 'Semak');

    function paint() {
      line.replaceChildren(...answer.map((t) => h('button', { class: 'tile', disabled: locked, onclick: () => { if (locked) return; t.used = false; answer.splice(answer.indexOf(t), 1); paint(); } }, t.text)));
      if (!answer.length) line.append(h('span', { class: 'placeholder' }, 'Ketik perkataan mengikut urutan'));
      tray.replaceChildren(...bank.map((t) => h('button', { class: `tile ${t.used ? 'used' : ''}`, disabled: t.used || locked, onclick: () => { t.used = true; answer.push(t); paint(); if (toEnglish && settings().autoplay && mode !== 'listen') speak(t.text); } }, t.text)));
      check.disabled = !answer.length || locked;
    }

    function submit() {
      if (locked || !answer.length) return;
      locked = true;
      const correct = norm(answer.map((t) => t.text).join(' ')) === norm(target.join(' '));
      const rec = (st.sentences[s.text] ||= { n: 0, ok: 0 });
      rec.n++;
      if (correct) rec.ok++;
      today().s++;
      stats.sentences++;
      if (correct) stats.sentencesOk++;
      done++;
      if (!correct && !item.retry) { requeue({ ...item, retry: true }, 3); total++; }
      line.classList.add(correct ? 'right' : 'wrong');
      paint();
      check.parentElement.hidden = true;
      const cont = h('button', { class: 'btn primary', onclick: next }, 'Teruskan');
      const panel = h('div', { class: `feedback ${correct ? 'good' : 'bad'}`, role: 'status' },
        feedbackHead(correct, 'Ini ayatnya'),
        h('div', { class: 'answer-row' }, h('span', { class: 'answer-en', lang: 'en' }, s.text), audioButton(s.text)),
        h('div', { class: 'answer-ex muted' }, s.tr),
        h('div', { class: 'actions' }, cont),
      );
      stage.querySelector('.exercise').append(panel);
      if (settings().autoplay) speak(s.text);
      setProgress();
      setTimeout(() => { cont.focus({ preventScroll: true }); panel.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }, 20);
      continueOnEnter();
    }

    const prompt = mode === 'listen'
      ? h('div', { class: 'prompt' }, h('div', { class: 'ask' }, 'Dengar dan bina ayat'),
          h('div', { class: 'headword-row' }, audioButton(s.text, 'xl'), h('button', { class: 'btn text', onclick: () => speak(s.text, { slow: true }) }, 'Lebih perlahan')))
      : toEnglish
        ? h('div', { class: 'prompt' }, h('div', { class: 'ask' }, 'Katakan dalam bahasa Inggeris'), h('div', { class: 'sentence-prompt' }, s.tr))
        : h('div', { class: 'prompt' }, h('div', { class: 'ask' }, 'Apakah maksud ayat ini?'),
            h('div', { class: 'headword-row' }, h('div', { class: 'sentence-prompt', lang: 'en' }, s.text), audioButton(s.text, 'lg')));

    const newWords = s.deps.map((i) => WORDS[i]).filter((x) => !st.words[x.word]);
    show('Latihan ayat', prompt,
      newWords.length && mode !== 'listen' ? h('div', { class: 'new-word-hint' }, 'Baharu di sini: ', newWords.map((x) => h('span', null, h('b', { lang: 'en' }, x.word), ` = ${x.gloss[0]}`))) : null,
      line, tray,
      h('div', { class: 'actions' }, check),
    );
    paint();
    if (mode === 'listen' || (mode === 'to-malay' && settings().autoplay)) speak(s.text);
    keyHandler = (e) => {
      if (locked) return;
      if (e.key === 'Enter') { e.preventDefault(); submit(); }
      else if (e.key === 'Backspace' && answer.length) { e.preventDefault(); const t = answer.pop(); t.used = false; paint(); }
    };
  }

  // ----- summary -----
  function finish(early) {
    cleanup();
    const nothingDone = !stats.answers && !stats.sentences && !touched.size;
    if (early && nothingDone) return onExit();
    const mins = Math.max(1, Math.round((Date.now() - stats.started) / 60000));
    const acc = stats.answers ? Math.round((stats.correct / stats.answers) * 100) : null;
    const p = plan();
    const moreToday = p.learning.length + p.due.length + p.fresh.length;
    const extraOnly = kind === 'dictation' || kind === 'sentences';
    const tiles = [
      extraOnly ? null : [stats.learned.length, 'perkataan baharu dipelajari'],
      extraOnly ? null : [stats.reviewed, 'perkataan diulang kaji'],
      stats.practised ? [stats.practised, 'perkataan dieja'] : null,
      stats.sentences ? [`${stats.sentencesOk}/${stats.sentences}`, 'ayat betul'] : null,
      acc != null ? [`${acc}%`, 'ketepatan'] : null,
      [mins, 'minit'],
    ].filter(Boolean);
    bar.style.width = early ? bar.style.width : '100%';
    stage.replaceChildren(h('div', { class: 'card summary' },
      h('div', { class: 'kicker' }, early ? 'Sesi dihentikan' : 'Sesi selesai'),
      early ? h('h1', null, 'Kemajuan disimpan') : h('h1', { lang: 'en' }, pick(['Well done!', 'Great job!', 'Excellent!'])),
      h('p', { class: 'muted' }, early
        ? 'Semua jawapan anda telah disimpan. Perkataan yang masih dipelajari akan muncul dahulu pada sesi seterusnya.'
        : stats.learned.length
          ? 'Anda akan bertemu perkataan ini lagi esok, kemudian pada selang masa yang semakin panjang, tepat sebelum anda terlupa.'
          : extraOnly
            ? 'Latihan tambahan ini tidak mengubah jadual ulang kaji anda.'
            : 'Setiap perkataan kini menunggu sehingga tepat sebelum anda terlupa.'),
      h('div', { class: 'stat-row' }, tiles.map(([n, l]) => h('div', { class: 'stat' }, h('div', { class: 'stat-n' }, String(n)), h('div', { class: 'stat-l' }, l)))),
      stats.learned.length ? h('div', { class: 'learned-list' }, stats.learned.map((w) => h('span', { class: 'chip' }, h('b', { lang: 'en' }, w.word), ` ${w.gloss[0]}`))) : null,
      h('div', { class: 'actions wrap' },
        h('button', { class: 'btn ghost', onclick: onExit }, 'Kembali ke laman utama'),
        moreToday ? h('button', { class: 'btn primary', onclick: () => runSession(root, 'daily', {}, onExit) }, early ? 'Sambung semula' : 'Teruskan belajar') : null,
        !moreToday && p.remainingNew ? h('button', { class: 'btn', onclick: () => runSession(root, 'more', { count: 5 }, onExit) }, 'Belajar 5 perkataan lagi') : null,
        !moreToday && readableSentences({ maxGap: 1 }).length >= 4 ? h('button', { class: 'btn', onclick: () => runSession(root, 'sentences', {}, onExit) }, 'Latihan ayat') : null,
        kind === 'dictation' ? h('button', { class: 'btn', onclick: () => runSession(root, 'dictation', {}, onExit) }, 'Imlak lagi') : null,
      ),
    ));
  }

  if (!queue.length) {
    cleanup();
    stage.replaceChildren(h('div', { class: 'card summary' },
      h('h1', null, kind === 'sentences' ? 'Belum ada ayat' : kind === 'dictation' ? (canListen() ? 'Belum ada perkataan' : 'Tiada suara bahasa Inggeris') : 'Semua sudah selesai'),
      h('p', { class: 'muted' }, kind === 'sentences'
        ? 'Belajar beberapa perkataan lagi dahulu. Ayat dibuka sebaik sahaja anda tahu setiap perkataan di dalamnya.'
        : kind === 'dictation'
          ? (canListen()
            ? 'Siapkan sesi pertama anda dahulu. Imlak menggunakan perkataan yang sudah anda pelajari.'
            : settings().audio
              ? 'Pelayar ini tidak mempunyai suara bahasa Inggeris, jadi perkataan tidak dapat dibacakan. Cuba Chrome, Edge atau Safari, atau pasang suara bahasa Inggeris dalam tetapan teks-ke-pertuturan peranti anda.'
              : 'Audio dimatikan. Hidupkannya dalam Tetapan untuk menggunakan latihan imlak.')
          : 'Tiada apa-apa yang perlu diulang kaji sekarang. Kembali esok, atau belajar beberapa perkataan tambahan.'),
      h('div', { class: 'actions' }, h('button', { class: 'btn primary', onclick: onExit }, 'Kembali ke laman utama')),
    ));
    return;
  }
  next();
}
