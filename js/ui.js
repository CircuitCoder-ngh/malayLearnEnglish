// Shared interface pieces: audio buttons, word facts, the word detail dialog, text markup.

import { h, fmtInterval, dayNumber } from './util.js';
import { get, save } from './store.js';
import { speak } from './speech.js';
import { statusOf, STATUS_LABEL, newState, markKnown } from './srs.js';
import { posLabel, UNIT_SIZE } from './vocab.js';

const SPEAKER = 'M3 9v6h4l5 4V5L7 9H3zm13.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z';

export function icon(path, size = 20) {
  const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  s.setAttribute('viewBox', '0 0 24 24');
  s.setAttribute('width', size);
  s.setAttribute('height', size);
  s.setAttribute('aria-hidden', 'true');
  const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  p.setAttribute('d', path);
  p.setAttribute('fill', 'currentColor');
  s.append(p);
  return s;
}

// Hidden by CSS when the browser has no English voice.
export function audioButton(text, size = '') {
  const btn = h('button', {
    class: `audio-btn ${size}`, type: 'button', 'aria-label': `Dengar: ${text}`, title: 'Dengar',
    onclick: (e) => {
      e.stopPropagation();
      speak(text, { onState: (s) => { btn.classList.toggle('busy', s === 'loading'); btn.classList.toggle('playing', s === 'playing'); } });
    },
  }, icon(SPEAKER, size === 'xl' ? 34 : size === 'lg' ? 24 : 18));
  return btn;
}

// "*word*" marks English (tap to hear), "**text**" marks emphasis.
export function rich(text) {
  const out = [];
  const re = /\*\*(.+?)\*\*|\*(.+?)\*/g;
  let last = 0;
  let m;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1] != null) out.push(h('strong', null, m[1]));
    else {
      const t = m[2];
      out.push(h('span', { class: 'en', lang: 'en', role: 'button', tabindex: '0', title: 'Ketik untuk dengar', onclick: () => speak(t.replace(/[→/]/g, ',')) }, t));
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function wordFacts(w) {
  return h('div', { class: 'facts' },
    h('div', { class: 'tags' }, h('span', { class: 'tag' }, posLabel(w))),
    w.forms.length ? h('div', { class: 'forms' }, h('span', { class: 'muted' }, 'Bentuk lain: '),
      w.forms.map((f, i) => h('span', null, i ? ', ' : '', h('b', { lang: 'en' }, f)))) : null,
    w.alt.length ? h('div', { class: 'forms' }, h('span', { class: 'muted' }, 'Ejaan Amerika: '),
      w.alt.map((f, i) => h('span', null, i ? ', ' : '', h('b', { lang: 'en' }, f)))) : null,
    h('div', { class: 'example' },
      h('div', { class: 'example-en', lang: 'en' }, w.ex, audioButton(w.ex)),
      h('div', { class: 'example-tr' }, w.exTr),
    ),
    w.note ? h('div', { class: 'note' }, w.note) : null,
  );
}

export function openWord(w, onChange) {
  const st = get();
  const dlg = h('dialog', { class: 'sheet' });
  const close = () => { dlg.close(); dlg.remove(); };
  const paint = () => {
    const ws = st.words[w.word];
    const status = statusOf(ws);
    dlg.replaceChildren(
      h('div', { class: 'sheet-top' },
        h('span', { class: 'kicker' }, `#${w.rank} · unit ${Math.floor(w.idx / UNIT_SIZE) + 1}`),
        h('button', { class: 'icon-btn', 'aria-label': 'Tutup', onclick: close }, '✕'),
      ),
      h('div', { class: 'headword-row' }, h('div', { class: 'headword', lang: 'en' }, w.word), audioButton(w.word, 'lg')),
      h('div', { class: 'gloss' }, w.gloss.join('; ')),
      wordFacts(w),
      h('div', { class: 'srs-line' },
        h('span', { class: `dot ${status}` }), STATUS_LABEL[status],
        ws && ws.i > 0 ? h('span', { class: 'muted' }, ` · ulang kaji seterusnya ${fmtInterval(Math.max(0, ws.d - dayNumber()))}`) : null,
        ws && ws.l ? h('span', { class: 'muted' }, ` · terlupa ${ws.l} kali`) : null,
      ),
      h('div', { class: 'actions wrap' },
        status === 'new' || status === 'learning'
          ? h('button', { class: 'btn', onclick: () => { st.words[w.word] = markKnown(ws || newState()); save(); onChange?.(); paint(); } }, 'Saya sudah tahu')
          : null,
        ws ? h('button', { class: 'btn ghost', onclick: () => { delete st.words[w.word]; save(); onChange?.(); paint(); } }, 'Set semula perkataan ini') : null,
      ),
    );
  };
  paint();
  dlg.addEventListener('click', (e) => { if (e.target === dlg) close(); });
  dlg.addEventListener('close', () => dlg.remove());
  document.body.append(dlg);
  dlg.showModal();
  speak(w.word);
}
