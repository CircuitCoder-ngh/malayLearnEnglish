// Spaced-repetition scheduling (an SM-2 variant with automatic grading).
//
// Per-word state, stored under the English headword:
//   i  interval in days (0 while the word is still in its first learning steps)
//   e  ease multiplier
//   d  day number the word is next due
//   r  successful reviews in a row
//   l  lapses (times forgotten after graduating)
//   a  day number the word was first introduced
//   st learning step reached (1..LEARN_STEPS) while i === 0

import { dayNumber } from './util.js';

export const LEARN_STEPS = 3;
const FIRST_INTERVALS = [1, 3, 7];
const START_EASE = 2.5;
const MIN_EASE = 1.3;
const MAX_INTERVAL = 365;

export function newState() {
  return { i: 0, e: START_EASE, d: dayNumber(), r: 0, l: 0, a: dayNumber(), st: 1 };
}

// Word passed all in-session learning steps: first review tomorrow.
export function graduate(ws) {
  ws.i = 1;
  ws.r = 1;
  ws.d = dayNumber() + 1;
  delete ws.st;
  return ws;
}

// User said "I already know this": skip the learning steps, check again in two weeks.
export function markKnown(ws) {
  ws.i = 14;
  ws.r = 3;
  ws.d = dayNumber() + 14;
  ws.k = 1;
  delete ws.st;
  return ws;
}

export function review(ws, correct) {
  const today = dayNumber();
  if (correct) {
    ws.r += 1;
    let next;
    if (ws.r <= FIRST_INTERVALS.length) next = Math.max(FIRST_INTERVALS[ws.r - 1], ws.i + 1);
    else next = Math.round(ws.i * ws.e);
    // Reviewing late and still remembering is evidence of a stronger memory.
    const overdue = Math.max(0, today - ws.d);
    if (overdue > 0) next += Math.round(overdue * 0.5);
    ws.i = Math.min(MAX_INTERVAL, Math.max(ws.i + 1, next));
    ws.e = Math.min(3, ws.e + 0.05);
  } else {
    ws.l += 1;
    ws.r = 0;
    ws.e = Math.max(MIN_EASE, ws.e - 0.2);
    ws.i = 1;
  }
  // A little jitter keeps words learned together from always coming back together.
  const fuzz = ws.i >= 7 ? Math.round((Math.random() - 0.5) * ws.i * 0.1) : 0;
  ws.d = today + ws.i + fuzz;
  return ws;
}

export function statusOf(ws) {
  if (!ws) return 'new';
  if (ws.i === 0) return 'learning';
  if (ws.i < 7) return 'young';
  if (ws.i < 21) return 'familiar';
  return 'mastered';
}

export const STATUS_LABEL = {
  new: 'Belum mula',
  learning: 'Sedang belajar',
  young: 'Baharu',
  familiar: 'Biasa',
  mastered: 'Mahir',
};

export const isDue = (ws, today = dayNumber()) => !!ws && (ws.i === 0 || ws.d <= today);
