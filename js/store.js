// Persistent learner state (localStorage).

import { dayNumber } from './util.js';

const KEY = 'fasih.v1';

const DEFAULTS = () => ({
  v: 1,
  onboarded: false,
  settings: { newPerDay: 10, typing: true, audio: true, autoplay: true, rate: 0.9, voiceURI: '', theme: 'auto' },
  words: {},      // headword -> SRS state
  days: {},       // dayNumber -> { n: new words, r: reviews, ok: correct answers, t: answers, s: sentences }
  grammar: {},    // lesson id -> { done: dayNumber, score }
  sentences: {},  // example sentence (Malay) -> { n: attempts, ok: correct }
});

let state = load();
const listeners = new Set();

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return merge(DEFAULTS(), JSON.parse(raw));
  } catch { /* corrupt or unavailable storage: start fresh */ }
  return DEFAULTS();
}

function merge(base, saved) {
  const out = { ...base, ...saved };
  out.settings = { ...base.settings, ...(saved.settings || {}) };
  for (const k of ['words', 'days', 'grammar', 'sentences']) if (!out[k] || typeof out[k] !== 'object') out[k] = {};
  return out;
}

let saveTimer = null;
export function save() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(flush, 150);
}

export function flush() {
  clearTimeout(saveTimer);
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* storage full or blocked */ }
}
window.addEventListener('pagehide', flush);

export const get = () => state;
export const settings = () => state.settings;

export function setSetting(key, value) {
  state.settings[key] = value;
  save();
  listeners.forEach((fn) => fn(key, value));
}
export const onSetting = (fn) => listeners.add(fn);

export function today() {
  const d = dayNumber();
  return (state.days[d] ||= { n: 0, r: 0, ok: 0, t: 0, s: 0 });
}

export function streak() {
  const d = dayNumber();
  const active = (n) => { const x = state.days[n]; return !!x && x.t + x.s + x.n > 0; };
  let n = 0;
  let cur = active(d) ? d : d - 1; // today not yet done doesn't break the streak
  while (active(cur)) { n++; cur--; }
  return { count: n, doneToday: active(d) };
}

export function exportData() {
  return JSON.stringify({ app: 'fasih', exported: new Date().toISOString(), state }, null, 1);
}

export function importData(text) {
  const parsed = JSON.parse(text);
  const incoming = parsed && parsed.app === 'fasih' ? parsed.state : null;
  if (!incoming || typeof incoming.words !== 'object') throw new Error('Fail ini bukan sandaran kemajuan Fasih.');
  state = merge(DEFAULTS(), incoming);
  flush();
}

export function reset() {
  state = DEFAULTS();
  flush();
}
