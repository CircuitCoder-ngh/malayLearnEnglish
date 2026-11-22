// Text-to-speech through the browser's built-in English voices (Web Speech API).

import { settings } from './store.js';

const synth = 'speechSynthesis' in window ? window.speechSynthesis : null;
let voices = [];
let chosen = null;
const listeners = new Set();

// British English first (the spelling taught in Malaysian schools), then any English voice.
function score(v) {
  const lang = (v.lang || '').toLowerCase().replace('_', '-');
  if (lang === 'en-gb') return 4;
  if (lang === 'en-us') return 3;
  if (lang.startsWith('en')) return 2;
  return 0;
}

function refresh() {
  if (!synth) return;
  voices = synth.getVoices().filter((v) => score(v) > 0).sort((a, b) => score(b) - score(a) || Number(b.localService) - Number(a.localService));
  const wanted = settings().voiceURI;
  chosen = voices.find((v) => v.voiceURI === wanted) || voices[0] || null;
  document.documentElement.classList.toggle('has-voice', !!chosen);
  listeners.forEach((fn) => fn());
}

if (synth) {
  refresh();
  synth.addEventListener?.('voiceschanged', refresh);
  // Some browsers populate the list late without firing the event.
  setTimeout(refresh, 500);
  setTimeout(refresh, 2000);
}

export const onVoices = (fn) => listeners.add(fn);
export const availableVoices = () => voices;
export const currentVoice = () => chosen;
export const hasVoice = () => !!chosen;
export function selectVoice() { refresh(); }

export function speak(text, { slow = false } = {}) {
  if (!synth || !chosen || !settings().audio) return false;
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.voice = chosen;
  u.lang = chosen.lang;
  u.rate = (settings().rate || 0.9) * (slow ? 0.7 : 1);
  synth.speak(u);
  return true;
}

export const canListen = () => hasVoice() && settings().audio;
