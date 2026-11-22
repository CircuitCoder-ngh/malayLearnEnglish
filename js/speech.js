// Text-to-speech through the browser's built-in voices (Web Speech API).
// Uses an English voice: British first (the spelling taught in Malaysian schools), then any other.
//
// Browser speech is unreliable in a few well-known ways, each handled below:
//  - "online" voices are streamed from the internet and may start late or never;
//  - an utterance queued in the same instant as cancel() can be silently dropped;
//  - the speech queue can get stuck in a paused state;
//  - a speaking utterance can be garbage-collected and cut off.

import { settings } from './store.js';

const synth = 'speechSynthesis' in window ? window.speechSynthesis : null;
let voices = [];
let chosen = null;
let avoid = null;       // an online voice that failed during this visit
let avoidUntil = 0;     // ...and how long to steer around it before trying it again
let current = null;     // strong reference to the utterance being spoken
let token = 0;          // identifies the latest speak() request
let startTimer = null;
let watchdog = null;
const listeners = new Set();

function score(v) {
  const lang = (v.lang || '').toLowerCase().replace('_', '-');
  if (lang === 'en-gb') return 4;
  if (lang === 'en-us') return 3;
  if (lang.startsWith('en')) return 2;
  return 0;
}

// Voices installed on the device come first: they work offline and start instantly.
const rank = (v) => (v.localService ? 10 : 0) + score(v);

function refresh() {
  if (!synth) return;
  voices = synth.getVoices().filter((v) => score(v) > 0).sort((a, b) => rank(b) - rank(a));
  const wanted = settings().voiceURI;
  chosen = voices.find((v) => v.voiceURI === wanted) || voices.find((v) => v !== avoid) || voices[0] || null;
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
export const voiceIsOnline = () => !!chosen && !chosen.localService;
export function selectVoice() { avoid = null; refresh(); }

let lastToast = 0;
function toast(message) {
  if (Date.now() - lastToast < 15000) return;
  lastToast = Date.now();
  const el = document.createElement('div');
  el.className = 'toast';
  el.setAttribute('role', 'status');
  el.textContent = message;
  document.body.append(el);
  setTimeout(() => el.remove(), 7000);
}

// Speaks `text`. `onState` (optional) is called with 'loading', 'playing', then 'idle' or 'failed'.
export function speak(text, { slow = false, onState } = {}) {
  if (!synth || !chosen || !settings().audio) return false;
  const id = ++token;
  const state = (s) => { try { onState?.(s); } catch { /* a removed button is fine */ } };
  clearTimeout(startTimer);
  clearTimeout(watchdog);

  const start = (voice, isRetry) => {
    if (id !== token) return state('idle');
    const u = new SpeechSynthesisUtterance(text);
    u.voice = voice;
    u.lang = voice.lang;
    u.rate = (settings().rate || 0.9) * (slow ? 0.7 : 1);
    let started = false;
    let finished = false;

    const giveUp = () => {
      if (finished || id !== token) return;
      finished = true;
      clearTimeout(watchdog);
      synth.cancel();
      const fallback = !isRetry ? voices.find((v) => v.localService && v !== voice) : null;
      if (fallback) {
        // Use the device voice straight away for the next minute instead of waiting on the network each time.
        avoid = voice;
        avoidUntil = Date.now() + 60000;
        if (!settings().voiceURI) chosen = fallback; // no explicit choice: stay on the device voice
        startTimer = setTimeout(() => start(fallback, true), 120);
      } else {
        state('failed');
        toast('Audio tidak dapat dimainkan. Suara ini memerlukan sambungan internet: semak sambungan anda, atau pilih suara lain dalam Tetapan.');
      }
    };

    u.onstart = () => { started = true; clearTimeout(watchdog); state('playing'); };
    u.onend = () => { finished = true; if (current === u) current = null; if (id === token) state('idle'); };
    u.onerror = (e) => {
      if (finished) return;
      // "interrupted" and "canceled" just mean a newer request replaced this one.
      if (e.error === 'interrupted' || e.error === 'canceled') { if (current === u) current = null; state('idle'); return; }
      giveUp();
    };

    current = u;
    try { synth.resume(); } catch { /* not paused */ }
    synth.speak(u);
    // An online voice gives no error when the network is slow: it simply never starts.
    if (!voice.localService) watchdog = setTimeout(() => { if (!started) giveUp(); }, 3500);
  };

  const deviceVoice = chosen === avoid && Date.now() < avoidUntil ? voices.find((v) => v.localService) : null;
  const voice = deviceVoice || chosen;
  state('loading');
  if (synth.speaking || synth.pending) {
    synth.cancel();
    startTimer = setTimeout(() => start(voice, false), 100);
  } else {
    start(voice, false);
  }
  return true;
}

export const canListen = () => hasVoice() && settings().audio;
