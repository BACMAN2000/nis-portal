# Phonics audio — ElevenLabs generator

Generates clear, slow, well-pronounced `.mp3` clips for every word and phoneme
sound in the Phonics Studio, in **4 voice variants**: US/UK × female/male.
The app plays them automatically and falls back to the browser voice when a clip
is missing — so it keeps working before and during generation.

Tuned for **PK · Kindergarten · Grade 1**: slow pace (`speed 0.82`), high
stability, neutral style.

## One-time setup
1. Install Node 18+ (has built-in `fetch`).
2. In **this** folder, copy `.env.example` → `.env` and paste your key:
   ```
   ELEVENLABS_API_KEY=sk_xxxxxxxx
   ```
   (Get it at elevenlabs.io → Profile → API Keys. `.env` is git-ignored.)

## Pick your voices (optional but recommended)
List every voice your account can use, with accent/gender labels:
```
node tools/generate-audio.mjs --list
```
Copy the IDs you like into the `VOICES` block at the top of `generate-audio.mjs`.
Good "kindergarten teacher" picks: a soft young female + a friendly young male,
one each for US and UK accents. Defaults are already filled in.

## Generate
From the `phonics/` folder:
```
# test one voice quickly (5 words):
node tools/generate-audio.mjs us-female --sample

# one full variant:
node tools/generate-audio.mjs us-female

# everything (all 4 variants):
node tools/generate-audio.mjs
```
It is **resumable** — already-generated files are skipped, so you can stop and
re-run anytime.

## Cost
~591 clips per variant (≈ 2,200 characters). All 4 variants ≈ **8,900
characters** total, one time. That fits inside the **free** ElevenLabs plan
(10,000 credits/month); the Starter plan ($5) adds a commercial licence with no
attribution.

## Publish
After generating, commit `phonics/audio/` and push `main`. GitHub Pages serves
the clips and the app uses them — no code change needed.

## Notes
- Isolated phoneme sounds use phonetic spellings (e.g. `sh → "shh"`, `a → "aah"`)
  so they sound like *sounds*, not letter names. Review the 38 sound clips and
  tweak `SOUND_TEXT` in the script if any need adjusting.
- Whole words come out excellent; they are the bulk of the audio.
