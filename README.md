# Fasih: belajar bahasa Inggeris melalui 1,500 perkataan paling kerap digunakan

*An interactive, free, no-login web course that teaches English to Malay speakers.
The interface, meanings and explanations are in Bahasa Melayu.*

Kursus web interaktif percuma untuk penutur bahasa Melayu yang ingin belajar
bahasa Inggeris. Ia berjalan sepenuhnya dalam pelayar dan dihoskan di GitHub Pages.
Laman kembarnya, [Lancar](https://github.com/CircuitCoder-ngh/learnMalay), mengajar
bahasa Melayu kepada penutur bahasa Inggeris.

## How it teaches

| Idea | What the app does |
|---|---|
| **Frequency first** | 1,500 English words ranked by real-world usage, counting every form of a word (go, goes, going, went, gone) together. |
| **Active recall** | Every exercise makes the learner retrieve the word: choose the meaning, choose the word, type it from memory, fill a gap in a sentence, recognise it by ear, or write it from dictation. |
| **Spaced repetition** | An SM-2 style scheduler brings each word back after 1 day, 3 days, a week, and then at growing intervals. Forgotten words return sooner. |
| **Words in context** | Every word has an example sentence with a Malay translation. Sentence-building exercises use only sentences made of words the learner already knows. |
| **Forms and spelling** | Irregular forms (went, children, better) are shown on each card. British spelling is taught, as in Malaysian schools; American spellings are accepted when typing. |
| **Contrastive grammar** | 15 five-minute lessons, written in Malay, on what differs from Malay: *be*, articles, plurals, he/she, tenses, question order, adjective position, prepositions, modals, contractions. |
| **Listening** | Uses the device's built-in English voice (British preferred, any English voice accepted). |

Progress is stored in the browser's `localStorage` and can be exported or imported
from Tetapan (Settings).

## Run locally

No build step and no dependencies. Serve the folder with any static server:

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Project layout

```
index.html, css/, js/      the app (plain ES modules, Malay interface)
js/data/words.js           GENERATED word list and starter sentences
js/data/grammar.js         grammar lessons (Malay explanations, English examples)
content/words-*.tsv        source vocabulary (edit these)
content/sentences.tsv      starter sentences built from the most frequent words
content/frequency/         corpus frequency list used for ranking
tools/check-words.mjs      validates the TSV files
tools/build-data.mjs       ranks, trims to 1,500 and writes js/data/words.js
```

### Editing vocabulary

Each line of `content/words-*.tsv` has eight tab-separated columns:

```
english  malay glosses (; separated)  pos  tier 1-6  forms  example (en)  example (ms)  note (ms)
```

`forms` lists inflected forms that are not made by simply adding -s, -es, -d, -ed
or -ing (went, gone; children; bigger, biggest). A form prefixed with `~` is an
alternative spelling (`~color`). After editing:

```sh
node tools/check-words.mjs content/words-*.tsv
node tools/build-data.mjs --report
```

The build blends each word's corpus frequency across all its forms (60%) with the
editorial tier (40%), merges a word that appears as both noun and verb into one
card, keeps the top 1,500, works out which list words each example sentence uses,
and computes cumulative coverage. Commit the regenerated `js/data/words.js`; the
deploy workflow fails if it is out of date.

## Deployment

`.github/workflows/pages.yml` validates the content, rebuilds the word list and
publishes the site to GitHub Pages on every push to `main`. In the repository
settings, **Pages → Build and deployment → Source** must be set to **GitHub Actions**.

## Sources and credits

- Word frequencies: [hermitdave/FrequencyWords](https://github.com/hermitdave/FrequencyWords)
  (`content/2018/en/en_50k.txt`, CC-BY-SA-4.0), derived from the OpenSubtitles
  2018 corpus. Subtitles reflect spoken language, which suits a course aimed at
  conversation; they also skew towards film dialogue, which is why the ranking
  is blended with editorial judgement.
- Vocabulary entries, translations, example sentences and grammar lessons were
  written for this project with AI assistance and have not yet been reviewed by
  a native Malay speaker or an English teacher. Corrections are welcome.
