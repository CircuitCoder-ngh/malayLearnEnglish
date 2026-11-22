#!/usr/bin/env node
// Merges content/words-*.tsv, ranks the entries by real-world frequency, keeps the
// top TARGET words and writes js/data/words.js.
//
//   node tools/build-data.mjs            build
//   node tools/build-data.mjs --report   build and print diagnostics
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const TARGET = 1500;
const REPORT = process.argv.includes('--report');

// ---- frequency corpus (OpenSubtitles 2018, via hermitdave/FrequencyWords) ----
// The corpus splits contractions: "don't" is counted as "don" + "'t".
const freq = new Map();
let corpusTotal = 0;
for (const line of readFileSync(join(ROOT, 'content/frequency/en_50k.txt'), 'utf8').split('\n')) {
  const [w, c] = line.trim().split(' ');
  if (!w || !c) continue;
  freq.set(w, Number(c));
  corpusTotal += Number(c);
}

// Pieces of contractions, mapped to the headword they belong to ('' = grammar only, e.g. possessive 's).
const CONTRACTION = {
  "'t": 'not', "'m": 'be', "'re": 'be', "'s": 'be', "'ll": 'will', "'ve": 'have', "'d": 'would',
  don: 'do', doesn: 'do', didn: 'do', won: 'will', isn: 'be', aren: 'be', wasn: 'be', weren: 'be', ain: 'be',
  couldn: 'could', wouldn: 'would', shouldn: 'should', haven: 'have', hasn: 'have', hadn: 'have', mustn: 'must',
  // other spellings and fused forms of words that are on the list
  cannot: 'can', others: 'other', ones: 'one', lot: 'a lot', lots: 'a lot', bit: 'a bit', ok: 'okay', alright: 'all right',
  excuse: 'excuse me', "'cause": 'because',
};
// Words every Malaysian learner already knows: never counted as unknown in a sentence.
const FAMILIAR = new Set(['ringgit', 'sen', 'nasi', 'lemak']);

// ---- read entries ----
const CONTENT = process.env.CONTENT_DIR || join(ROOT, 'content'); // override for tests
const files = readdirSync(CONTENT).filter((f) => /^words-.*\.tsv$/.test(f)).sort();
const byWord = new Map();
const merged = [];
const uniq = (arr) => [...new Map(arr.map((x) => [x.toLowerCase(), x])).values()];
for (const f of files) {
  const lines = readFileSync(join(CONTENT, f), 'utf8').split('\n').filter((l) => l.trim());
  for (const line of lines) {
    const c = line.split('\t').map((x) => x.trim());
    if (c.length !== 8) throw new Error(`${f}: bad column count: ${line}`);
    const listed = c[4] ? c[4].split(',').map((x) => x.trim()).filter(Boolean) : [];
    const e = {
      word: c[0], gloss: c[1].split(/\s*;\s*/).filter(Boolean), pos: [c[2]], tier: Number(c[3]),
      forms: listed.filter((x) => !x.startsWith('~')), alt: listed.filter((x) => x.startsWith('~')).map((x) => x.slice(1)),
      ex: c[5], exTr: c[6], note: c[7], src: f,
    };
    const key = e.word.toLowerCase();
    const prev = byWord.get(key);
    if (prev) {
      // English reuses one word as noun and verb (work, love, change): one card, both meanings.
      const [a, b] = prev.tier <= e.tier ? [prev, e] : [e, prev];
      const bare = (g) => g.toLowerCase().replace(/\([^)]*\)/g, '').trim();
      const seen = new Set(a.gloss.map(bare));
      const extra = b.gloss.filter((g) => bare(g) && !seen.has(bare(g)) && seen.add(bare(g)));
      byWord.set(key, {
        ...a, gloss: [...a.gloss.slice(0, 2), ...extra].slice(0, 4), pos: uniq([...a.pos, ...b.pos]), tier: Math.min(a.tier, b.tier),
        forms: uniq([...a.forms, ...b.forms]), alt: uniq([...a.alt, ...b.alt]), note: a.note || b.note,
      });
      merged.push(`${e.word}: [${prev.src} ${prev.pos}] ${prev.gloss.join('; ')}  +  [${e.src} ${e.pos}] ${e.gloss.join('; ')}`);
    } else byWord.set(key, e);
  }
}
let entries = [...byWord.values()];

// ---- every written form of each headword ----
function regularForms(word, pos) {
  const w = word.toLowerCase();
  if (w.includes(' ')) return [];
  const out = [];
  const sibilant = /(s|x|z|ch|sh|o)$/.test(w);
  if (pos.some((p) => p === 'v' || p === 'aux')) {
    out.push(w + 's', w + 'ing', w + 'ed');
    if (sibilant) out.push(w + 'es');
    if (w.endsWith('e')) out.push(w + 'd', w.slice(0, -1) + 'ing');
  }
  if (pos.includes('n')) {
    out.push(w + 's');
    if (sibilant) out.push(w + 'es');
  }
  return out;
}
const headwords = new Map(entries.map((e) => [e.word.toLowerCase(), e]));
const own = (e) => freq.get(e.word.toLowerCase()) || 0;
const claims = new Map();
for (const e of entries) {
  for (const f of [...e.forms, ...e.alt, ...regularForms(e.word, e.pos)]) {
    const t = f.toLowerCase();
    if (t.includes(' ') || headwords.has(t)) continue; // a headword always belongs to itself
    const cur = claims.get(t);
    if (!cur || own(e) > own(cur)) claims.set(t, e);
  }
}
const resolve = (tok) => headwords.get(tok) || claims.get(tok) || (CONTRACTION[tok] != null ? headwords.get(CONTRACTION[tok]) : undefined);

// ---- rank: blend corpus frequency (all forms) with the editors' tier estimate ----
for (const e of entries) e.count = 0;
for (const [tok, c] of freq) { const e = resolve(tok); if (e) e.count += c; }
const N = entries.length;
entries.filter((e) => e.count > 0).sort((a, b) => b.count - a.count).forEach((e, i) => { e.pc = i + 1; });
for (const e of entries) {
  const pt = (e.tier - 0.5) * (N / 6);
  e.score = e.pc != null ? 0.6 * e.pc + 0.4 * pt : pt;
}
entries.sort((a, b) => a.score - b.score || a.word.localeCompare(b.word, 'en'));

// Closed sets are kept whole: a learner should not get eight months out of twelve.
const PINNED = new Set(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
  'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'twenty', 'thirty', 'forty', 'fifty', 'hundred', 'thousand',
  'mine', 'yours', 'his', 'hers', 'ours', 'theirs']);
const pinnedOut = entries.slice(TARGET).filter((e) => PINNED.has(e.word));
const kept = entries.slice(0, TARGET);
for (let i = kept.length - 1, n = pinnedOut.length; i >= 0 && n > 0; i--) {
  if (!PINNED.has(kept[i].word)) { kept.splice(i, 1); n--; }
}
const keptSet = new Set([...kept, ...pinnedOut]);
const dropped = entries.filter((e) => !keptSet.has(e));
entries = entries.filter((e) => keptSet.has(e));
const index = new Map(entries.map((e, i) => [e, i]));

// ---- which list words does a sentence use? ----
const STRIP = /[.,!?;:"“”()…]/g;
const words = (s) => s.replace(/[’‘]/g, "'").replace(STRIP, ' ').split(/\s+/).filter(Boolean);
const phraseHeads = entries.filter((e) => e.word.includes(' ')).map((e) => e.word.toLowerCase());
const unmappedCounts = new Map();

// "don't" -> do + not, "I'm" -> I + be, "Ali's" -> Ali
function pieces(tok) {
  const m = tok.match(/^(.+?)(n't|'m|'re|'ll|'ve|'d|'s|')$/);
  if (!m) return [tok];
  if (m[2] === "n't") return [{ ca: 'can', wo: 'will', sha: 'shall' }[m[1]] || m[1], 'not'];
  const extra = { "'m": 'be', "'re": 'be', "'ll": 'will', "'ve": 'have', "'d": 'would' }[m[2]];
  return extra ? [m[1], extra] : [m[1]];
}

function analyse(sentence, self) {
  const names = new Set();
  sentence.split(/[.!?]+\s*/).forEach((part) => words(part).forEach((t, i) => { if (i > 0 && /^\p{Lu}/u.test(t) && t !== 'I' && !/^I'/.test(t)) names.add(t.toLowerCase().replace(/'s$/, '')); }));
  let text = ' ' + words(sentence).join(' ').toLowerCase() + ' ';
  const deps = new Set();
  for (const p of phraseHeads) if (text.includes(` ${p} `)) { deps.add(index.get(headwords.get(p))); text = text.replaceAll(` ${p} `, ' '); }
  let unknown = 0;
  for (const tok of text.trim().split(' ').filter(Boolean)) {
    for (const piece of pieces(tok)) {
      const e = resolve(piece);
      if (e && index.has(e)) deps.add(index.get(e));
      else if (!names.has(piece) && !FAMILIAR.has(piece) && !/^\d+$/.test(piece)) { unknown++; unmappedCounts.set(piece, (unmappedCounts.get(piece) || 0) + 1); }
    }
  }
  return { deps: [...deps].filter((i) => i !== self).sort((a, b) => a - b), unk: unknown };
}

entries.forEach((e, i) => Object.assign(e, analyse(e.ex, i)));

// Extra starter sentences built from the most frequent words only.
const seenSentences = new Set(entries.map((e) => e.ex));
const extra = readFileSync(join(ROOT, 'content/sentences.tsv'), 'utf8').split('\n').filter((l) => l.trim()).map((l) => {
  const [text, tr] = l.split('\t').map((x) => x.trim());
  if (!text || !tr) throw new Error(`sentences.tsv: bad line: ${l}`);
  return { text, tr, ...analyse(text, -1) };
}).filter((s) => !seenSentences.has(s.text));

// ---- share of everyday speech covered at each rank (headwords and all their forms) ----
const credit = new Array(entries.length).fill(0);
for (const [tok, c] of freq) { const e = resolve(tok); if (e && index.has(e)) credit[index.get(e)] += c; }
let cum = 0;
const coverage = credit.map((c) => { cum += c; return Math.round((cum / corpusTotal) * 1000) / 10; });

// ---- write ----
const rows = entries.map((e, i) => [e.word, e.gloss, e.pos.join('+'), e.forms, e.alt, e.ex, e.exTr, e.note || '', e.deps, e.unk, coverage[i]]);
const fmt = (x) => JSON.stringify(x).replace(/\],\[/g, '],\n[');
writeFileSync(join(ROOT, 'js/data/words.js'), `// GENERATED by tools/build-data.mjs from content/*.tsv. Do not edit by hand.
// Row: [english, [malay glosses], parts of speech, [irregular forms], [alternative spellings], example, translation, note, example word indexes, unknown tokens in example, cumulative coverage %]
export const WORD_ROWS = ${fmt(rows)};

// Starter sentences. Row: [english, malay, word indexes used, unknown tokens]
export const SENTENCE_ROWS = ${fmt(extra.map((x) => [x.text, x.tr, x.deps, x.unk]))};
`);
console.log(`words.js: ${entries.length} words (from ${N} candidates in ${files.length} files), coverage at end: ${coverage.at(-1)}%`);

if (REPORT) {
  console.log(`\nMerged duplicate headwords (${merged.length}):`);
  merged.forEach((m) => console.log('  ' + m));
  console.log(`\nDropped (${dropped.length}): ${dropped.map((e) => e.word).join(', ')}`);
  console.log(`\nNo corpus frequency (${entries.filter((e) => !e.count).length}): ${entries.filter((e) => !e.count).map((e) => e.word).join(', ')}`);
  const un = [...unmappedCounts].sort((a, b) => b[1] - a[1]);
  console.log(`\nExample tokens not in the word list (${un.length} distinct): ${un.slice(0, 200).map(([t, c]) => `${t}×${c}`).join(' ')}`);
  console.log(`\nStarter sentences: ${extra.length}; with unknown words: ${extra.filter((x) => x.unk).map((x) => x.text).join(' | ') || 'none'}`);
  console.log('Starter sentences by hardest word: ' + [50, 100, 150, 200, 250, 400].map((r) => `≤${r}: ${extra.filter((x) => Math.max(...x.deps) < r).length}`).join(' | '));
  console.log('\nCoverage by rank: ' + [50, 100, 250, 500, 750, 1000, 1250, 1500].map((r) => `${r}: ${coverage[Math.min(r, coverage.length) - 1]}%`).join(' | '));
  console.log('\nFirst 60: ' + entries.slice(0, 60).map((e) => e.word).join(', '));
  const missing = [];
  for (const [tok] of freq) { if (missing.length >= 150) break; if (!resolve(tok)) missing.push(tok); }
  console.log('\nMost frequent corpus tokens not among candidates: ' + missing.join(' '));
}
