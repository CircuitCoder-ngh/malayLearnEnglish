// Routing and screens. The interface is in Malay; the language being learned is English.

import { h, svg, dayNumber, dayLabel, norm } from './util.js';
import { get, save, settings, setSetting, onSetting, today, streak, exportData, importData, reset } from './store.js';
import { statusOf, STATUS_LABEL } from './srs.js';
import { speak, onVoices, availableVoices, currentVoice, hasVoice, voiceIsOnline, selectVoice } from './speech.js';
import { WORDS, TOTAL, UNITS, UNIT_SIZE, posLabel, counts, coverage, readableSentences } from './vocab.js';
import { LESSONS } from './data/grammar.js';
import { runSession, plan } from './session.js';
import { audioButton, rich, openWord, icon } from './ui.js';

const app = document.getElementById('app');
const STAGE_SIZE = 250;
const STAGES = [
  ['Basics', 'Asas'], ['Everyday', 'Kehidupan harian'], ['Conversation', 'Perbualan'],
  ['Stories', 'Cerita'], ['The world', 'Dunia luas'], ['Fluency', 'Kefasihan'],
];
const num = (n) => n.toLocaleString('en-MY');
const pct = (x) => `${x.toFixed(x < 10 ? 1 : 0)}%`;

const ICONS = {
  home: 'M12 3 3 10.5V21h6v-6h6v6h6V10.5L12 3z',
  words: 'M4 5h16v2H4V5zm0 6h16v2H4v-2zm0 6h10v2H4v-2z',
  grammar: 'M5 3h11a3 3 0 0 1 3 3v15H8a3 3 0 0 1-3-3V3zm3 15a1 1 0 0 0 0 2h9v-2H8zm0-11v2h8V7H8z',
  progress: 'M4 20V10h3v10H4zm6.5 0V4h3v16h-3zM17 20v-7h3v7h-3z',
  settings: 'M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z',
};

const NAV = [
  ['', 'Utama', 'home'], ['words', 'Perkataan', 'words'], ['grammar', 'Tatabahasa', 'grammar'], ['progress', 'Kemajuan', 'progress'], ['settings', 'Tetapan', 'settings'],
];

// ---------- shell ----------

function applyTheme() {
  const t = settings().theme;
  if (t === 'auto') document.documentElement.removeAttribute('data-theme');
  else document.documentElement.setAttribute('data-theme', t);
}
applyTheme();
onSetting((k) => { if (k === 'theme') applyTheme(); if (k === 'voiceURI') selectVoice(); });

function buildNav() {
  for (const nav of document.querySelectorAll('[data-nav]')) {
    nav.replaceChildren(...NAV.map(([route, label, ic]) => h('a', { href: `#/${route}`, dataset: { route } }, icon(ICONS[ic], 22), h('span', null, label))));
  }
}

function markNav(route) {
  const top = route.split('/')[0];
  document.querySelectorAll('[data-nav] a').forEach((a) => {
    const on = a.dataset.route === top || (top === 'method' && a.dataset.route === '');
    a.classList.toggle('active', on);
    if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  });
}

function parseHash() {
  const raw = location.hash.replace(/^#\/?/, '');
  const [path, query = ''] = raw.split('?');
  return { path, params: new URLSearchParams(query) };
}

const go = (path) => { location.hash = `#/${path}`; };

function render() {
  const { path, params } = parseHash();
  document.body.classList.toggle('in-session', path === 'learn');
  markNav(path);
  window.scrollTo(0, 0);
  const [head, arg] = path.split('/');
  if (head === 'learn') return runSession(app, params.get('mode') || 'daily', { count: Number(params.get('n')) || undefined }, () => go(''));
  if (head === 'words') return wordsView(params);
  if (head === 'grammar') return arg ? lessonView(arg) : grammarView();
  if (head === 'progress') return progressView();
  if (head === 'settings') return settingsView();
  if (head === 'method') return methodView();
  return homeView();
}

// ---------- home ----------

function ring(fraction, big, small) {
  const r = 52;
  const c = 2 * Math.PI * r;
  return h('div', { class: 'ring' },
    svg('svg', { viewBox: '0 0 120 120', role: 'img', 'aria-label': `${big} ${small}` },
      svg('circle', { cx: 60, cy: 60, r, class: 'ring-track' }),
      svg('circle', { cx: 60, cy: 60, r, class: 'ring-value', 'stroke-dasharray': c, 'stroke-dashoffset': c * (1 - Math.min(1, fraction)), transform: 'rotate(-90 60 60)' }),
    ),
    h('div', { class: 'ring-label' }, h('div', { class: 'ring-big' }, big), h('div', { class: 'ring-small' }, small)),
  );
}

function methodPoints() {
  return [
    ['Perkataan paling kerap dahulu', `${num(TOTAL)} perkataan di sini disusun mengikut kekerapan sebenar penggunaannya. Beberapa ratus perkataan pertama sudah merangkumi sebahagian besar pertuturan harian.`],
    ['Mengingat, bukan membaca semula', 'Setiap perkataan dilatih dengan mengeluarkannya daripada ingatan: memilih, menaip, mendengar dan mengisi tempat kosong. Usaha mengingat itulah yang menjadikan ingatan kekal.'],
    ['Ulang kaji tepat pada masanya', 'Setiap perkataan muncul semula tepat sebelum anda terlupa: selepas sehari, kemudian tiga hari, seminggu, dan semakin jarang setiap kali anda menjawab dengan betul.'],
    ['Perkataan dalam ayat', 'Setiap perkataan disertakan ayat sebenar, dan anda membina ayat daripada perkataan yang anda tahu, supaya kosa kata menjadi bahasa yang boleh digunakan.'],
  ];
}

function homeView() {
  const st = get();
  if (!st.onboarded) return welcomeView();
  const p = plan();
  const c = counts();
  const sk = streak();
  const cov = coverage();
  const todayStats = today();
  const reviewsDue = p.due.length + p.learning.length;
  const hasWork = reviewsDue + p.fresh.length > 0;
  const sentenceCount = readableSentences({ maxGap: 0 }).length;
  const nextLesson = LESSONS.find((l) => !st.grammar[l.id]);
  const minutes = Math.max(1, Math.round(reviewsDue * 0.2 + p.fresh.length * 0.9));

  const todayCard = h('section', { class: 'card today' },
    h('div', { class: 'kicker' }, 'Hari ini'),
    hasWork
      ? [
        h('h2', null, todayStats.t ? 'Sambung sesi hari ini' : 'Sesi anda sudah sedia'),
        h('div', { class: 'today-counts' },
          h('div', null, h('b', null, String(reviewsDue)), ' ulang kaji'),
          h('div', null, h('b', null, String(p.fresh.length)), ' perkataan baharu'),
          h('div', null, h('b', null, `~${minutes}`), ' minit'),
        ),
        h('a', { class: 'btn primary big', href: '#/learn' }, todayStats.t ? 'Sambung' : 'Mula sesi'),
      ]
      : [
        h('h2', null, 'Selesai untuk hari ini'),
        h('p', { class: 'muted' }, c.started < TOTAL
          ? 'Tiada apa-apa yang perlu diulang kaji. Ulang kaji seterusnya tiba esok. Sesi pendek setiap hari lebih berkesan daripada sesi panjang sekali-sekala.'
          : 'Anda sudah bertemu setiap perkataan. Teruskan mengulang kaji dan perkataan itu akan kekal dalam ingatan.'),
        h('div', { class: 'actions wrap start' },
          p.remainingNew ? h('a', { class: 'btn primary', href: '#/learn?mode=more&n=5' }, 'Belajar 5 perkataan lagi') : null,
          sentenceCount >= 4 ? h('a', { class: 'btn', href: '#/learn?mode=sentences' }, 'Latihan ayat') : null,
          c.learned >= 4 ? h('a', { class: 'btn', href: '#/learn?mode=dictation' }, 'Latihan imlak') : null,
        ),
      ],
  );

  const milestone = [50, 100, 250, 500, 750, 1000, 1250].find((m) => m > c.learned && m < TOTAL) || TOTAL;
  const progressCard = h('section', { class: 'card progress-card' },
    ring(c.learned / TOTAL, num(c.learned), `daripada ${num(TOTAL)} perkataan`),
    h('div', null,
      h('div', { class: 'kicker' }, 'Apa yang anda boleh faham'),
      h('div', { class: 'cov' }, h('b', null, pct(cov)), ' daripada perkataan dalam pertuturan harian bahasa Inggeris'),
      h('p', { class: 'muted small' }, c.learned < TOTAL
        ? `Sasaran seterusnya: ${num(milestone)} perkataan, yang meliputi kira-kira ${WORDS[milestone - 1].cov.toFixed(0)}%.`
        : 'Setiap perkataan dalam senarai sudah dipelajari.'),
    ),
  );

  const side = h('div', { class: 'grid-3' },
    h('a', { class: 'card link-card', href: sentenceCount >= 4 ? '#/learn?mode=sentences' : '#/words' },
      h('div', { class: 'kicker' }, 'Ayat'),
      h('h3', null, sentenceCount ? `${num(sentenceCount)} ayat yang anda boleh baca` : 'Ayat dibuka semasa anda belajar'),
      h('p', { class: 'muted small' }, 'Bina dan dengar ayat yang dibuat hanya daripada perkataan yang anda tahu.'),
    ),
    nextLesson
      ? h('a', { class: 'card link-card', href: `#/grammar/${nextLesson.id}` },
        h('div', { class: 'kicker' }, `Tatabahasa · ${LESSONS.indexOf(nextLesson) + 1} daripada ${LESSONS.length}`),
        h('h3', null, rich(nextLesson.title)),
        h('p', { class: 'muted small' }, rich(nextLesson.blurb)))
      : h('a', { class: 'card link-card', href: '#/grammar' }, h('div', { class: 'kicker' }, 'Tatabahasa'), h('h3', null, 'Semua pelajaran selesai'), h('p', { class: 'muted small' }, 'Baca semula mana-mana pelajaran pada bila-bila masa.')),
    h('a', { class: 'card link-card', href: c.learned >= 4 ? '#/learn?mode=dictation' : '#/learn' },
      h('div', { class: 'kicker' }, 'Imlak'),
      h('h3', null, c.learned >= 4 ? 'Dengar dan taip' : 'Imlak dibuka selepas sesi pertama'),
      h('p', { class: 'muted small' }, 'Dengar perkataan yang sudah anda pelajari dan eja dengan betul. Ejaan bahasa Inggeris tidak mengikut bunyi, jadi ini latihan yang penting.'),
    ),
  );

  app.replaceChildren(h('div', { class: 'page home' },
    h('header', { class: 'hero' },
      h('div', null,
        h('h1', { lang: 'en' }, c.started ? 'Welcome back' : 'Welcome'),
        h('p', { class: 'hero-sub' }, c.started ? 'Selamat kembali' : 'Selamat datang'),
      ),
      h('div', { class: `streak ${sk.doneToday ? 'lit' : ''}`, title: sk.doneToday ? 'Anda sudah belajar hari ini' : 'Belajar hari ini untuk menyambung rekod anda' },
        h('span', { class: 'streak-n' }, String(sk.count)), h('span', { class: 'streak-l' }, 'hari berturut')),
    ),
    todayCard, progressCard, side, pathSection(),
    h('p', { class: 'foot muted small' }, h('a', { href: '#/method' }, 'Cara kursus ini berfungsi')),
  ));
}

function pathSection() {
  const st = get();
  const stages = [];
  for (let s = 0; s * STAGE_SIZE < TOTAL; s++) {
    const from = s * STAGE_SIZE;
    const to = Math.min(TOTAL, from + STAGE_SIZE);
    const learned = WORDS.slice(from, to).filter((w) => st.words[w.word]?.i > 0).length;
    const cells = [];
    for (let u = from / UNIT_SIZE; u * UNIT_SIZE < to; u++) {
      const ws = WORDS.slice(u * UNIT_SIZE, (u + 1) * UNIT_SIZE);
      const done = ws.filter((w) => st.words[w.word]?.i > 0).length;
      const frac = done / ws.length;
      cells.push(h('a', {
        class: `unit ${frac === 1 ? 'full' : frac > 0 ? 'part' : ''}`, href: `#/words?unit=${u + 1}`,
        style: { '--fill': `${Math.round(frac * 100)}%` },
        title: `Unit ${u + 1}: perkataan ${u * UNIT_SIZE + 1}–${u * UNIT_SIZE + ws.length}, ${done} dipelajari`,
        'aria-label': `Unit ${u + 1}, ${done} daripada ${ws.length} dipelajari`,
      }, String(u + 1)));
    }
    const [en, ms] = STAGES[s] || [`Stage ${s + 1}`, `Peringkat ${s + 1}`];
    stages.push(h('div', { class: 'stage-block' },
      h('div', { class: 'stage-head' },
        h('div', null, h('span', { class: 'stage-n' }, `Peringkat ${s + 1}`), h('strong', { lang: 'en' }, en), h('span', { class: 'muted' }, ` · ${ms}`)),
        h('div', { class: 'muted small' }, `${learned}/${to - from} · mencapai liputan ${WORDS[to - 1].cov.toFixed(0)}%`),
      ),
      h('div', { class: 'units' }, cells),
    ));
  }
  return h('section', { class: 'card path' }, h('div', { class: 'kicker' }, 'Laluan anda'), h('h2', null, `${num(TOTAL)} perkataan dalam ${UNITS} unit`), stages);
}

function welcomeView() {
  let goal = settings().newPerDay;
  const goals = [[5, 'Santai', '5 minit sehari'], [10, 'Sederhana', '10 minit sehari'], [15, 'Serius', '15 minit sehari'], [20, 'Intensif', '20+ minit sehari']];
  const picker = h('div', { class: 'goal-picker', role: 'radiogroup', 'aria-label': 'Perkataan baharu sehari' });
  const paint = () => picker.replaceChildren(...goals.map(([n, name, time]) => h('button', {
    class: `goal ${goal === n ? 'on' : ''}`, role: 'radio', 'aria-checked': String(goal === n), onclick: () => { goal = n; paint(); },
  }, h('b', null, `${n} perkataan`), h('span', null, name), h('span', { class: 'muted small' }, time))));
  paint();
  const eta = h('p', { class: 'muted small' });
  const paintEta = () => { eta.textContent = `Dengan ${goal} perkataan baharu sehari, anda akan bertemu kesemua ${num(TOTAL)} perkataan dalam masa kira-kira ${Math.ceil(TOTAL / goal / 30)} bulan.`; };
  picker.addEventListener('click', paintEta);
  paintEta();
  app.replaceChildren(h('div', { class: 'page welcome' },
    h('header', { class: 'hero tall' },
      h('div', null,
        h('p', { class: 'hero-sub' }, 'Selamat datang · Welcome'),
        h('h1', null, `Belajar bahasa Inggeris melalui ${num(TOTAL)} perkataan paling kerap digunakan`),
        h('p', { class: 'lead' }, `Dalam mana-mana bahasa, sebilangan kecil perkataan melakukan sebahagian besar kerja. Dalam bahasa Inggeris, ${num(TOTAL)} perkataan dalam kursus ini, bersama bentuk-bentuknya seperti go, goes dan went, merangkumi kira-kira ${WORDS[TOTAL - 1].cov.toFixed(0)}% daripada semua perkataan yang dituturkan dalam perbualan harian. Pelajarinya mengikut urutan kegunaan, dan selebihnya menjadi jauh lebih mudah.`),
      ),
    ),
    h('section', { class: 'method-grid' }, methodPoints().map(([t, d], i) => h('div', { class: 'card method' }, h('div', { class: 'method-n' }, String(i + 1)), h('h3', null, t), h('p', { class: 'muted' }, d)))),
    h('section', { class: 'card' },
      h('div', { class: 'kicker' }, 'Pilih rentak anda'),
      h('h2', null, 'Berapa perkataan baharu sehari?'),
      picker, eta,
      h('div', { class: 'actions start' }, h('button', { class: 'btn primary big', onclick: () => { setSetting('newPerDay', goal); get().onboarded = true; save(); go('learn'); } }, 'Mula belajar')),
      h('p', { class: 'muted small' }, 'Tiada akaun diperlukan. Kemajuan anda disimpan dalam pelayar ini, dan anda boleh menukar rentak pada bila-bila masa.'),
    ),
  ));
}

function methodView() {
  app.replaceChildren(h('div', { class: 'page narrow' },
    h('header', { class: 'page-head' }, h('h1', null, 'Cara kursus ini berfungsi'), h('p', { class: 'muted' }, 'Empat idea daripada kajian tentang ingatan, digunakan untuk bahasa Inggeris.')),
    h('section', { class: 'method-grid' }, methodPoints().map(([t, d], i) => h('div', { class: 'card method' }, h('div', { class: 'method-n' }, String(i + 1)), h('h3', null, t), h('p', { class: 'muted' }, d)))),
    h('section', { class: 'card prose' },
      h('h2', null, 'Sesi harian'),
      h('p', null, 'Buka aplikasi dan tekan Mula. Sesi menggabungkan ulang kaji yang sudah tiba masanya dengan beberapa perkataan baharu. Perkataan baharu mula-mula ditunjukkan bersama sebutan, maksud dan contoh ayat; sedikit kemudian anda memilih maksudnya, kemudian memilih perkataan itu berdasarkan maksudnya, kemudian menaipnya daripada ingatan. Selepas itu ia dijadualkan: esok, kemudian tiga hari, seminggu, dan seterusnya.'),
      h('p', null, 'Jika anda terlupa sesuatu perkataan, ia akan muncul semula lebih awal. Itu tandanya sistem berfungsi, bukan kegagalan.'),
      h('h2', null, 'Dari mana senarai perkataan ini'),
      h('p', null, 'Perkataan disusun menggunakan kiraan kekerapan daripada koleksi besar sari kata filem dan televisyen berbahasa Inggeris, yang mencerminkan cara orang sebenarnya bercakap, digabungkan dengan pertimbangan editorial supaya senarai ini kemas dan berguna. Peratusan liputan yang ditunjukkan diukur berdasarkan koleksi yang sama, dan mengira semua bentuk sesuatu perkataan (contohnya go, goes, going, went, gone).'),
      h('h2', null, 'Ejaan dan sebutan'),
      h('p', null, 'Kursus ini menggunakan ejaan British seperti yang diajar di sekolah di Malaysia (colour, centre). Ejaan Amerika (color, center) diterima apabila anda menaip. Ejaan bahasa Inggeris tidak mengikut sebutan seperti bahasa Melayu, jadi dengar setiap perkataan dan sebut dengan kuat.'),
      h('h2', null, 'Tatabahasa'),
      h('p', null, 'Pelajaran tatabahasa sengaja dibuat pendek dan menumpukan perkara yang berbeza daripada bahasa Melayu: kata kerja be, a dan the, bentuk jamak, dan kala. Baca satu pelajaran pada bila-bila masa, dan gunakan kebanyakan masa anda untuk perkataan dan ayat.'),
      h('h2', null, 'Petua'),
      h('ul', null,
        h('li', null, 'Belajar sedikit setiap hari. Sepuluh minit sehari lebih baik daripada sejam seminggu sekali.'),
        h('li', null, 'Sebut setiap perkataan dan ayat dengan kuat.'),
        h('li', null, 'Biarkan latihan menaip dihidupkan. Menghasilkan perkataan lebih sukar daripada mengenalinya, dan kesukaran itulah yang membina ingatan.'),
        h('li', null, 'Siapkan ulang kaji sebelum menambah perkataan baharu. Sesi melakukannya untuk anda.'),
      ),
    ),
    h('div', { class: 'actions start' }, h('a', { class: 'btn primary', href: '#/' }, 'Kembali ke laman utama')),
  ));
}

// ---------- words ----------

function wordsView(params) {
  const st = get();
  let query = '';
  let filter = 'all';
  let unit = Number(params.get('unit')) || 0;
  let limit = 100;
  const list = h('div', { class: 'word-list' });
  const countEl = h('div', { class: 'muted small' });

  const matches = (w) => {
    if (unit && w.unit !== unit - 1) return false;
    const s = statusOf(st.words[w.word]);
    if (filter === 'new' && s !== 'new') return false;
    if (filter === 'learning' && !(s === 'learning' || s === 'young')) return false;
    if (filter === 'known' && !(s === 'familiar' || s === 'mastered')) return false;
    if (!query) return true;
    const q = norm(query);
    return norm(w.word).includes(q) || w.gloss.some((g) => norm(g).includes(q)) || [...w.forms, ...w.alt].some((f) => norm(f) === q);
  };

  const paint = () => {
    const found = WORDS.filter(matches);
    countEl.textContent = `${num(found.length)} perkataan`;
    list.replaceChildren(...found.slice(0, limit).map((w) => {
      const s = statusOf(st.words[w.word]);
      return h('button', { class: 'word-row', onclick: () => openWord(w, paint) },
        h('span', { class: 'rank' }, String(w.rank)),
        h('span', { class: 'w-en', lang: 'en' }, w.word),
        h('span', { class: 'w-tr' }, w.gloss.join('; ')),
        h('span', { class: 'w-pos' }, posLabel(w)),
        h('span', { class: `dot ${s}`, title: STATUS_LABEL[s] }),
      );
    }));
    if (!found.length) list.append(h('p', { class: 'muted empty' }, 'Tiada perkataan yang sepadan.'));
    if (found.length > limit) list.append(h('button', { class: 'btn ghost more', onclick: () => { limit += 200; paint(); } }, `Tunjuk lagi (${found.length - limit} lagi)`));
  };

  const chips = h('div', { class: 'chips', role: 'group', 'aria-label': 'Tapis mengikut kemajuan' });
  const paintChips = () => chips.replaceChildren(...[['all', 'Semua'], ['new', 'Belum mula'], ['learning', 'Sedang belajar'], ['known', 'Sudah mahir']].map(([k, label]) =>
    h('button', { class: `chip-btn ${filter === k ? 'on' : ''}`, 'aria-pressed': String(filter === k), onclick: () => { filter = k; limit = 100; paintChips(); paint(); } }, label)));
  paintChips();

  const unitSel = h('select', { 'aria-label': 'Unit', onchange: (e) => { unit = Number(e.target.value); limit = 100; paint(); } },
    h('option', { value: '0' }, 'Semua unit'),
    Array.from({ length: UNITS }, (_, i) => h('option', { value: String(i + 1), selected: unit === i + 1 }, `Unit ${i + 1} (${i * UNIT_SIZE + 1}–${Math.min(TOTAL, (i + 1) * UNIT_SIZE)})`)),
  );
  const search = h('input', { type: 'search', placeholder: 'Cari dalam bahasa Inggeris atau Melayu', 'aria-label': 'Cari perkataan', oninput: (e) => { query = e.target.value; limit = 100; paint(); } });

  app.replaceChildren(h('div', { class: 'page' },
    h('header', { class: 'page-head' }, h('h1', null, 'Senarai perkataan'), h('p', { class: 'muted' }, `Kesemua ${num(TOTAL)} perkataan, yang paling kerap dahulu. Ketik perkataan untuk melihat contoh, bentuk lain dan jadualnya.`)),
    h('div', { class: 'toolbar' }, search, unitSel),
    h('div', { class: 'toolbar' }, chips, countEl),
    h('div', { class: 'legend' }, ['new', 'learning', 'young', 'familiar', 'mastered'].map((s) => h('span', null, h('span', { class: `dot ${s}` }), STATUS_LABEL[s]))),
    list,
  ));
  paint();
}

// ---------- grammar ----------

function grammarView() {
  const st = get();
  app.replaceChildren(h('div', { class: 'page narrow' },
    h('header', { class: 'page-head' }, h('h1', null, 'Tatabahasa'), h('p', { class: 'muted' }, `${LESSONS.length} pelajaran pendek tentang perkara yang berbeza antara bahasa Inggeris dan bahasa Melayu. Setiap satu mengambil masa kira-kira lima minit.`)),
    h('div', { class: 'lesson-list' }, LESSONS.map((l, i) => {
      const done = st.grammar[l.id];
      return h('a', { class: `card lesson-card ${done ? 'done' : ''}`, href: `#/grammar/${l.id}` },
        h('div', { class: 'lesson-n' }, done ? '✓' : String(i + 1)),
        h('div', null, h('h3', null, rich(l.title)), h('p', { class: 'muted small' }, rich(l.blurb)),
          done ? h('p', { class: 'small done-note' }, `Selesai · kuiz ${done.score}/${l.quiz.length}`) : null),
      );
    })),
  ));
}

function lessonView(id) {
  const st = get();
  const idx = LESSONS.findIndex((l) => l.id === id);
  const lesson = LESSONS[idx];
  if (!lesson) return grammarView();
  const nextL = LESSONS[idx + 1];
  let answered = 0;
  let score = 0;
  const result = h('div', { class: 'quiz-result', 'aria-live': 'polite' });

  const table = (t) => h('div', { class: 'table-wrap' }, h('table', null,
    h('thead', null, h('tr', null, t.head.map((c) => h('th', null, rich(c))))),
    h('tbody', null, t.rows.map((r) => h('tr', null, r.map((c) => h('td', null, rich(c))))))));
  const sections = lesson.sections.map((s) => h('section', { class: 'lesson-section' },
    s.h ? h('h2', null, rich(s.h)) : null,
    (s.p || []).map((p) => h('p', null, rich(p))),
    s.table ? table(s.table) : null,
    s.ex ? h('div', { class: 'examples' }, s.ex.map(([en, ms]) => h('div', { class: 'ex-row' },
      h('div', { class: 'ex-en', lang: 'en' }, en, audioButton(en.replace(/[→/]/g, ','))), h('div', { class: 'ex-tr' }, ms)))) : null,
    (s.after || []).map((p) => h('p', null, rich(p))),
    s.tip ? h('div', { class: 'tip' }, rich(s.tip)) : null,
  ));

  const quiz = lesson.quiz.map((q, qi) => {
    const why = h('div', { class: 'why', hidden: true }, rich(q.why));
    const buttons = q.opts.map((o, oi) => h('button', { class: 'choice', onclick: () => {
      if (buttons[0].disabled) return;
      buttons.forEach((b, bi) => { b.disabled = true; if (bi === q.a) b.classList.add('right'); else if (bi === oi) b.classList.add('wrong'); });
      why.hidden = false;
      answered++;
      if (oi === q.a) score++;
      if (answered === lesson.quiz.length) {
        st.grammar[lesson.id] = { done: dayNumber(), score };
        save();
        result.replaceChildren(h('div', { class: 'card quiz-done' },
          h('h3', null, score === lesson.quiz.length ? 'Sempurna! Markah penuh.' : `Markah anda ${score} daripada ${lesson.quiz.length}`),
          h('p', { class: 'muted' }, 'Pelajaran ditandakan sebagai selesai. Corak-corak ini akan semakin jelas apabila anda bertemunya dalam contoh ayat.'),
          h('div', { class: 'actions start wrap' },
            nextL ? h('a', { class: 'btn primary', href: `#/grammar/${nextL.id}` }, `Seterusnya: ${nextL.title.replace(/\*/g, '')}`) : null,
            h('a', { class: 'btn ghost', href: '#/grammar' }, 'Semua pelajaran'))));
        result.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    } }, h('span', { class: 'choice-text' }, rich(o))));
    return h('div', { class: 'quiz-q' }, h('p', { class: 'q' }, h('span', { class: 'q-n' }, `${qi + 1}.`), ' ', rich(q.q)), h('div', { class: 'choices' }, buttons), why);
  });

  app.replaceChildren(h('div', { class: 'page narrow lesson' },
    h('a', { class: 'back', href: '#/grammar' }, '← Semua pelajaran'),
    h('header', { class: 'page-head' }, h('div', { class: 'kicker' }, `Pelajaran ${idx + 1} daripada ${LESSONS.length}`), h('h1', null, rich(lesson.title)), h('p', { class: 'lead' }, rich(lesson.blurb))),
    h('div', { class: 'card prose' }, sections),
    h('section', { class: 'card' }, h('div', { class: 'kicker' }, 'Uji diri'), h('h2', null, 'Kuiz ringkas'), quiz),
    result,
  ));
}

// ---------- progress ----------

function bars(data, { label }) {
  const max = Math.max(1, ...data.map((d) => d.value));
  return h('div', { class: 'bars', role: 'img', 'aria-label': `${label}: ${data.map((d) => `${d.name} ${d.value}`).join(', ')}` },
    data.map((d) => h('div', { class: `bar-col ${d.strong ? 'strong' : ''}`, tabindex: '0' },
      h('div', { class: 'bar-tip' }, h('b', null, String(d.value)), ` ${d.unit}`, h('br'), d.name),
      h('div', { class: 'bar-track' }, h('div', { class: `bar ${d.value ? '' : 'zero'}`, style: { height: `${d.value ? Math.max(3, (d.value / max) * 100) : 0}%` } })),
      h('div', { class: 'bar-x' }, d.tick),
    )),
  );
}

function progressView() {
  const st = get();
  const c = counts();
  const sk = streak();
  const day = dayNumber();
  const by = { new: 0, learning: 0, young: 0, familiar: 0, mastered: 0 };
  for (const w of WORDS) by[statusOf(st.words[w.word])]++;

  let t7 = 0, ok7 = 0;
  for (let d = day - 6; d <= day; d++) { const x = st.days[d]; if (x) { t7 += x.t; ok7 += x.ok; } }

  const activity = [];
  for (let d = day - 13; d <= day; d++) {
    const x = st.days[d] || { t: 0, s: 0 };
    activity.push({ value: x.t + x.s, unit: 'jawapan', name: dayLabel(d, { weekday: 'long', day: 'numeric', month: 'short' }), tick: dayLabel(d, { weekday: 'narrow' }), strong: d === day });
  }
  const forecast = [];
  for (let d = day; d < day + 7; d++) {
    let n = 0;
    for (const w of WORDS) { const s = st.words[w.word]; if (s && s.i > 0 && (d === day ? s.d <= d : s.d === d)) n++; }
    forecast.push({ value: n, unit: 'ulang kaji', name: d === day ? 'Hari ini' : dayLabel(d, { weekday: 'long', day: 'numeric', month: 'short' }), tick: d === day ? 'Hari ini' : dayLabel(d, { weekday: 'short' }), strong: d === day });
  }

  const order = ['mastered', 'familiar', 'young', 'learning', 'new'];
  const grammarDone = LESSONS.filter((l) => st.grammar[l.id]).length;

  app.replaceChildren(h('div', { class: 'page' },
    h('header', { class: 'page-head' }, h('h1', null, 'Kemajuan')),
    h('div', { class: 'stat-tiles' },
      [[sk.count, 'hari berturut-turut'], [num(c.learned), 'perkataan dipelajari'], [pct(coverage()), 'pertuturan harian'], [t7 ? `${Math.round((ok7 / t7) * 100)}%` : '–', 'ketepatan, 7 hari lepas'], [`${grammarDone}/${LESSONS.length}`, 'pelajaran tatabahasa']]
        .map(([n, l]) => h('div', { class: 'card stat-tile' }, h('div', { class: 'stat-n' }, String(n)), h('div', { class: 'stat-l' }, l))),
    ),
    h('section', { class: 'card' },
      h('h2', null, 'Kekuatan ingatan'),
      h('p', { class: 'muted small' }, `Sejauh mana setiap satu daripada ${num(TOTAL)} perkataan melekat dalam ingatan, daripada belum disentuh hingga jangka panjang.`),
      h('div', { class: 'stack', role: 'img', 'aria-label': order.map((k) => `${STATUS_LABEL[k]} ${by[k]}`).join(', ') },
        order.filter((k) => by[k]).map((k) => h('div', { class: `seg ${k}`, style: { flexGrow: String(by[k]) }, title: `${STATUS_LABEL[k]}: ${by[k]}` }))),
      h('div', { class: 'legend' }, order.map((k) => h('span', null, h('span', { class: `dot ${k}` }), `${STATUS_LABEL[k]} `, h('b', null, String(by[k]))))),
    ),
    h('div', { class: 'grid-2' },
      h('section', { class: 'card' }, h('h2', null, 'Aktiviti'), h('p', { class: 'muted small' }, 'Soalan dijawab setiap hari, 14 hari lepas'), bars(activity, { label: 'Jawapan setiap hari' })),
      h('section', { class: 'card' }, h('h2', null, 'Ulang kaji akan datang'), h('p', { class: 'muted small' }, 'Perkataan yang dijadualkan muncul semula, 7 hari akan datang'), bars(forecast, { label: 'Ulang kaji setiap hari' })),
    ),
  ));
}

// ---------- settings ----------

function settingsView() {
  const s = settings();
  const row = (label, help, control) => h('div', { class: 'set-row' }, h('div', null, h('div', { class: 'set-label' }, label), help ? h('div', { class: 'muted small' }, help) : null), control);
  const toggle = (key, label) => h('label', { class: 'switch' }, h('input', { type: 'checkbox', checked: s[key], 'aria-label': label, onchange: (e) => setSetting(key, e.target.checked) }), h('span', { class: 'track' }));
  const select = (key, options, label, parse = String) => h('select', { 'aria-label': label, onchange: (e) => setSetting(key, parse(e.target.value)) },
    options.map(([v, l]) => h('option', { value: String(v), selected: String(s[key]) === String(v) }, l)));

  const voiceRow = h('div');
  const paintVoice = () => {
    const voices = availableVoices();
    const msg = hasVoice()
      ? 'Pilih loghat yang anda suka, contohnya British (en-GB) atau Amerika (en-US).' + (voiceIsOnline() ? ' Suara ini distrim dari internet, jadi ia boleh lambat atau senyap jika sambungan lemah. Suara bertanda “pada peranti ini” lebih boleh diharap.' : '')
      : 'Pelayar ini tiada suara bahasa Inggeris, jadi audio, latihan mendengar dan imlak tidak tersedia. Cuba Chrome, Edge atau Safari, atau pasang suara bahasa Inggeris dalam tetapan peranti anda.';
    voiceRow.replaceChildren(
      row('Suara', msg, voices.length
        ? h('select', { 'aria-label': 'Suara', onchange: (e) => setSetting('voiceURI', e.target.value) }, voices.map((v) => h('option', { value: v.voiceURI, selected: currentVoice() === v }, `${v.name} (${v.lang}) · ${v.localService ? 'pada peranti ini' : 'perlu internet'}`)))
        : h('span', { class: 'muted small' }, 'Tidak tersedia')),
      hasVoice() ? row('Uji', null, h('button', { class: 'btn', onclick: () => speak('Hello! How are you today?') }, 'Mainkan contoh')) : null,
    );
  };
  paintVoice();
  onVoices(() => { if (voiceRow.isConnected) paintVoice(); });

  const fileInput = h('input', { type: 'file', accept: 'application/json,.json', hidden: true, onchange: async (e) => {
    const f = e.target.files[0];
    if (!f) return;
    try {
      const text = await f.text();
      if (!confirm('Gantikan kemajuan dalam pelayar ini dengan kandungan fail ini?')) return;
      importData(text);
      applyTheme();
      alert('Kemajuan dipulihkan.');
      settingsView();
    } catch (err) { alert(err.message || 'Fail itu tidak dapat dibaca.'); }
  } });

  app.replaceChildren(h('div', { class: 'page narrow' },
    h('header', { class: 'page-head' }, h('h1', null, 'Tetapan')),
    h('section', { class: 'card' }, h('h2', null, 'Belajar'),
      row('Perkataan baharu sehari', 'Ulang kaji tidak dihadkan; hanya perkataan baharu.', select('newPerDay', [[5, '5 · santai'], [10, '10 · sederhana'], [15, '15 · serius'], [20, '20 · intensif'], [30, '30 · pecut']], 'Perkataan baharu sehari', Number)),
      row('Latihan menaip', 'Taip perkataan daripada ingatan. Lebih sukar daripada memilih, dan jauh lebih berkesan.', toggle('typing', 'Latihan menaip')),
    ),
    h('section', { class: 'card' }, h('h2', null, 'Bunyi'),
      row('Audio', 'Butang pembesar suara dan latihan mendengar.', toggle('audio', 'Audio')),
      row('Main secara automatik', 'Sebut setiap perkataan apabila ia muncul.', toggle('autoplay', 'Main secara automatik')),
      row('Kelajuan sebutan', null, select('rate', [[0.7, 'Perlahan'], [0.9, 'Biasa'], [1.05, 'Laju']], 'Kelajuan sebutan', Number)),
      voiceRow,
    ),
    h('section', { class: 'card' }, h('h2', null, 'Paparan'),
      row('Tema', null, select('theme', [['auto', 'Ikut peranti'], ['light', 'Cerah'], ['dark', 'Gelap']], 'Tema')),
    ),
    h('section', { class: 'card' }, h('h2', null, 'Data anda'),
      h('p', { class: 'muted small' }, 'Kemajuan disimpan dalam pelayar ini sahaja. Eksport sandaran untuk memindahkannya ke peranti lain atau menyimpannya dengan selamat.'),
      h('div', { class: 'actions start wrap' },
        h('button', { class: 'btn', onclick: () => {
          const a = h('a', { href: URL.createObjectURL(new Blob([exportData()], { type: 'application/json' })), download: `fasih-kemajuan-${new Date().toISOString().slice(0, 10)}.json` });
          a.click();
          setTimeout(() => URL.revokeObjectURL(a.href), 1000);
        } }, 'Eksport kemajuan'),
        h('button', { class: 'btn', onclick: () => fileInput.click() }, 'Import kemajuan'),
        fileInput,
        h('button', { class: 'btn danger', onclick: () => { if (confirm('Padam semua kemajuan dalam pelayar ini? Tindakan ini tidak boleh dibatalkan.')) { reset(); applyTheme(); go(''); } } }, 'Set semula semua'),
      ),
    ),
    h('p', { class: 'muted small foot' }, h('a', { href: '#/method' }, 'Cara kursus ini berfungsi')),
  ));
}

// ---------- boot ----------

buildNav();
window.addEventListener('hashchange', render);
render();
