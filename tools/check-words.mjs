#!/usr/bin/env node
// Validates content/words-*.tsv. Usage: node tools/check-words.mjs content/words-a.tsv
//
// Columns (tab-separated, no header):
//   1 english headword (base form)      5 forms: irregular forms, comma-separated; ~x marks an alternative spelling
//   2 malay glosses, "; " separated     6 example sentence in English (must contain the headword)
//   3 part of speech                    7 Malay translation of the example
//   4 tier 1-6 (1 = most frequent)      8 note in Malay (optional)
import { readFileSync } from 'node:fs';

const POS = new Set(['n', 'v', 'adj', 'adv', 'pron', 'prep', 'conj', 'num', 'intj', 'phrase', 'det', 'aux']);
const norm = (s) => ` ${s.toLowerCase().replace(/[’‘]/g, "'").replace(/[.,!?;:"“”()…]/g, ' ').replace(/\s+/g, ' ').trim()} `;

let failed = false;
for (const file of process.argv.slice(2)) {
  const lines = readFileSync(file, 'utf8').split('\n').filter((l) => l.trim() !== '');
  const seen = new Map();
  const errors = [];
  lines.forEach((line, i) => {
    const n = i + 1;
    const cols = line.split('\t');
    if (cols.length !== 8) { errors.push(`${n}: expected 8 tab-separated columns, got ${cols.length}: ${line.slice(0, 60)}`); return; }
    const [en, ms, pos, tier, forms, exEn, exMs, note] = cols.map((c) => c.trim());
    if (!en) errors.push(`${n}: empty headword`);
    if (!ms) errors.push(`${n}: ${en}: empty Malay gloss`);
    if (/^to /i.test(en)) errors.push(`${n}: ${en}: headword should not start with "to "`);
    if (!POS.has(pos)) errors.push(`${n}: ${en}: bad pos "${pos}"`);
    if (!/^[1-6]$/.test(tier)) errors.push(`${n}: ${en}: tier must be 1-6, got "${tier}"`);
    if (forms && !/^~?[\p{L}'-]+( [\p{L}'-]+)?(, ?~?[\p{L}'-]+( [\p{L}'-]+)?)*$/u.test(forms)) errors.push(`${n}: ${en}: forms must be comma-separated words, got "${forms}"`);
    if (forms.split(',').map((f) => f.trim().replace(/^~/, '').toLowerCase()).includes(en.toLowerCase())) errors.push(`${n}: ${en}: forms repeats the headword`);
    if (!exEn || !exMs) errors.push(`${n}: ${en}: missing example sentence or translation`);
    if (exEn && !norm(exEn).includes(norm(en))) errors.push(`${n}: ${en}: example does not contain the headword as a standalone word: "${exEn}"`);
    const words = exEn.split(/\s+/).filter(Boolean).length;
    if (exEn && (words < 2 || words > 10)) errors.push(`${n}: ${en}: example should be 2-10 words, has ${words}`);
    if (exEn && !/[.!?]$/.test(exEn)) errors.push(`${n}: ${en}: example needs end punctuation`);
    if (exMs && !/[.!?]$/.test(exMs)) errors.push(`${n}: ${en}: translation needs end punctuation`);
    if (note && note.length > 90) errors.push(`${n}: ${en}: note too long (${note.length})`);
    const key = en.toLowerCase();
    if (seen.has(key)) errors.push(`${n}: ${en}: duplicate headword (first at line ${seen.get(key)})`);
    else seen.set(key, n);
  });
  console.log(`${file}: ${lines.length} entries, ${errors.length} problems`);
  errors.slice(0, 80).forEach((e) => console.log('  ' + e));
  if (errors.length) failed = true;
}
process.exit(failed ? 1 : 0);
