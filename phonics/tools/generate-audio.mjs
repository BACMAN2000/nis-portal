#!/usr/bin/env node
/* ============================================================================
   NIS Phonics Studio — ElevenLabs audio generator
   ----------------------------------------------------------------------------
   Generates one clear, slow, well-pronounced .mp3 per word and per phoneme
   sound, for 4 voice variants (US/UK × female/male), into ../audio/<variant>/.
   The app plays these automatically; if a clip is missing it falls back to the
   browser speech engine. Designed for PK · K · Grade 1.

   USAGE (Node 18+):
     1. Put your key in tools/.env   →   ELEVENLABS_API_KEY=sk_xxx
        (or set the env var:  Windows PowerShell:  $env:ELEVENLABS_API_KEY="sk_xxx")
     2. See your account's voices (to pick/confirm IDs):
            node tools/generate-audio.mjs --list
     3. Generate everything:
            node tools/generate-audio.mjs
        ...or one variant:
            node tools/generate-audio.mjs us-female
        ...or one quick sample (5 words, to test a voice):
            node tools/generate-audio.mjs us-female --sample

   It is RESUMABLE: existing files are skipped, so you can stop/rerun safely.
   ============================================================================ */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');           // phonics/
const AUDIO_DIR = path.join(ROOT, 'audio');
const INDEX = path.join(ROOT, 'index.html');

/* ---- 1) Voices: edit these IDs to match the ones you pick in your account.
   Run `--list` to print every voice ID available to you. The defaults below
   are clear, young ElevenLabs library voices (good "kindergarten teacher" tone). */
const VOICES = {
  'us-female': { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Sarah — US, soft young female' },
  'us-male'  : { id: 'bIHbv24MWmeRgasZH58o', name: 'Will — US, friendly young male' },
  'uk-female': { id: 'Xb7hH8MSUJpSbSDYk0k2', name: 'Alice — UK, clear female' },
  'uk-male'  : { id: 'JBFqnCBsd6RMkjVDRZzb', name: 'George — UK, warm male' }
};

/* ---- 2) Voice/model settings tuned for clear, slow, child-friendly speech ---- */
const MODEL_ID = 'eleven_multilingual_v2';
const VOICE_SETTINGS = { stability: 0.6, similarity_boost: 0.85, style: 0.0, use_speaker_boost: true, speed: 0.82 };
const OUTPUT_FORMAT = 'mp3_44100_128';

/* ---- 3) Phonetic spelling so isolated SOUNDS are spoken as sounds, not
   letter names. Keyed by the phoneme's `say` value used in the app. ---- */
const SOUND_TEXT = {
  a:'aah', e:'ehh', i:'ih', u:'uh', oo:'oo', ah:'ah', uh:'uh', ee:'eee', ay:'ay',
  eye:'eye', oh:'ohh', aw:'aww', ow:'ow', oy:'oy', er:'er',
  p:'puh', b:'buh', t:'tuh', d:'duh', k:'kuh', g:'guh', f:'fff', v:'vvv', th:'th',
  s:'sss', z:'zzz', sh:'shh', zh:'zhuh', h:'huh', ch:'chuh', j:'juh', m:'mmm',
  n:'nnn', ng:'ng', l:'lll', r:'rrr', w:'wuh', y:'yuh'
};
/* Per-grapheme sound clips (keyed by the grapheme), so the sound-by-sound plays
   /ar/, /sh/, /igh/… as ONE sound. MUST match GRAPHEME_SOUNDS in index.html. */
const GRAPHEME_SOUNDS = {
  b:'buh',c:'kuh',d:'duh',f:'fff',g:'guh',h:'huh',j:'juh',k:'kuh',l:'lll',m:'mmm',n:'nnn',
  p:'puh',q:'kwuh',r:'rrr',s:'sss',t:'tuh',v:'vvv',w:'wuh',x:'ks',y:'yuh',z:'zzz',
  a:'aah',e:'ehh',i:'ih',o:'ah',u:'uh',
  sh:'shh',ch:'chuh',th:'th',wh:'wuh',ck:'kuh',ng:'ng',ph:'fff',qu:'kwuh',tch:'chuh',dge:'juh',
  ai:'ay',ay:'ay',ea:'eee',ee:'eee',oa:'ohh',oo:'oo',igh:'eye',ow:'ow',ou:'ow',oi:'oy',oy:'oy',
  ar:'are',or:'or',er:'er',ir:'er',ur:'er'
};

/* ---------- load API key from env or tools/.env ---------- */
function loadEnv(){
  const envPath = path.join(__dirname, '.env');
  if(fs.existsSync(envPath)){
    for(const line of fs.readFileSync(envPath,'utf8').split(/\r?\n/)){
      const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
      if(m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g,'');
    }
  }
}
loadEnv();
const API_KEY = process.env.ELEVENLABS_API_KEY;

/* ---------- extract words + phoneme sounds from index.html (stays in sync) ---------- */
function extractContent(){
  const html = fs.readFileSync(INDEX,'utf8');
  const words = new Set();
  // phoneme example words + say values
  const sounds = new Map(); // key -> text to speak
  const phoRe = /word:"([a-z]+)"[^}]*say:"([a-z]+)"/g; let m;
  while((m = phoRe.exec(html))){
    words.add(m[1]);
    const key = m[2].toLowerCase().replace(/[^a-z]/g,'');
    sounds.set(key, SOUND_TEXT[m[2]] || m[2]);
  }
  // per-grapheme sound clips (keyed by grapheme) used by the sound-by-sound
  for(const [g,txt] of Object.entries(GRAPHEME_SOUNDS)) sounds.set(g, txt);
  // every words:[ ... ] array (patterns + families)
  const arrRe = /words:\[([^\]]*)\]/g;
  while((m = arrRe.exec(html))){
    (m[1].match(/"([a-z_]+)"/g)||[]).forEach(s=>words.add(s.replace(/"/g,'').replace(/_e/g,'')));
  }
  // simple string arrays of 3+ words (WORD_BANK, sound boxes)
  const bankRe = /\[((?:"[a-z]+",?\s*){3,})\]/g;
  while((m = bankRe.exec(html))){
    (m[1].match(/"([a-z]+)"/g)||[]).forEach(s=>words.add(s.replace(/"/g,'')));
  }
  const wordItems = [...words].filter(Boolean).map(w=>({key:w, text:w}));
  const soundItems = [...sounds.entries()].map(([key,text])=>({key, text}));
  return { wordItems, soundItems };
}

/* ---------- ElevenLabs TTS ---------- */
async function tts(voiceId, text, settings){
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=${OUTPUT_FORMAT}`;
  const res = await fetch(url, {
    method:'POST',
    headers:{ 'xi-api-key':API_KEY, 'Content-Type':'application/json', 'Accept':'audio/mpeg' },
    body: JSON.stringify({ text, model_id: MODEL_ID, voice_settings: settings })
  });
  if(!res.ok){
    const body = await res.text();
    const err = new Error(`HTTP ${res.status}: ${body.slice(0,200)}`);
    err.status = res.status;
    throw err;
  }
  return Buffer.from(await res.arrayBuffer());
}
async function ttsWithRetry(voiceId, text){
  // try with speed; if the model rejects the speed field, retry without it
  try { return await tts(voiceId, text, VOICE_SETTINGS); }
  catch(e){
    if(e.status === 422){
      const { speed, ...noSpeed } = VOICE_SETTINGS;
      return await tts(voiceId, text, noSpeed);
    }
    if(e.status === 429){ await sleep(3000); return await tts(voiceId, text, VOICE_SETTINGS); }
    throw e;
  }
}
const sleep = ms => new Promise(r=>setTimeout(r,ms));

async function listVoices(){
  const res = await fetch('https://api.elevenlabs.io/v1/voices', { headers:{ 'xi-api-key':API_KEY } });
  if(!res.ok){ console.error('Could not list voices:', res.status, await res.text()); process.exit(1); }
  const { voices } = await res.json();
  console.log(`\n${voices.length} voices in your account:\n`);
  for(const v of voices){
    const a = (v.labels && (v.labels.accent || v.labels.descriptive)) || '';
    const g = (v.labels && v.labels.gender) || '';
    const age = (v.labels && v.labels.age) || '';
    console.log(`  ${v.voice_id}  ${(v.name||'').padEnd(16)}  ${[g,age,a].filter(Boolean).join(' · ')}`);
  }
  console.log('\nPaste the IDs you like into the VOICES block at the top of this script.\n');
}

/* ---------- main ---------- */
async function main(){
  const args = process.argv.slice(2);
  if(args.includes('--dry')){
    const { wordItems, soundItems } = extractContent();
    const chars = [...wordItems,...soundItems].reduce((s,it)=>s+it.text.length,0);
    console.log(`words: ${wordItems.length}  sounds: ${soundItems.length}  chars/variant: ~${chars}  ·  4 variants: ~${chars*4}`);
    console.log('sample words:', wordItems.slice(0,20).map(w=>w.key).join(' '));
    console.log('sounds:', soundItems.map(s=>`${s.key}→"${s.text}"`).join('  '));
    return;
  }
  if(!API_KEY){
    console.error('\n✖ No ELEVENLABS_API_KEY found.\n  Put it in phonics/tools/.env  (ELEVENLABS_API_KEY=sk_...)\n  or set the env var, then re-run.\n');
    process.exit(1);
  }
  if(args.includes('--list')) return listVoices();

  const sample = args.includes('--sample');
  const only = args.find(a=>VOICES[a]);
  const variants = only ? [only] : Object.keys(VOICES);

  let { wordItems, soundItems } = extractContent();
  let items = [...soundItems, ...wordItems];
  if(sample) items = wordItems.slice(0, 5);

  const totalChars = items.reduce((s,it)=>s+it.text.length,0);
  console.log(`\nPhonics audio generation`);
  console.log(`  clips per variant : ${items.length}  (${wordItems.length} words + ${soundItems.length} sounds)`);
  console.log(`  variants          : ${variants.join(', ')}`);
  console.log(`  characters/variant: ~${totalChars}   ·  all variants: ~${totalChars*variants.length}`);
  console.log(`  model             : ${MODEL_ID}  (speed ${VOICE_SETTINGS.speed})\n`);

  let made=0, skipped=0, failed=0, charsUsed=0;
  for(const variant of variants){
    const voice = VOICES[variant];
    if(!voice){ console.error(`No voice configured for "${variant}"`); continue; }
    const outDir = path.join(AUDIO_DIR, variant);
    fs.mkdirSync(outDir, { recursive:true });
    console.log(`▶ ${variant}  (${voice.name})`);
    for(const it of items){
      const file = path.join(outDir, `${it.key}.mp3`);
      if(fs.existsSync(file) && fs.statSync(file).size > 0){ skipped++; continue; }
      try{
        const buf = await ttsWithRetry(voice.id, it.text);
        fs.writeFileSync(file, buf);
        made++; charsUsed += it.text.length;
        if(made % 25 === 0) process.stdout.write(`    …${made} generated\n`);
        await sleep(120); // be gentle with rate limits
      }catch(e){
        failed++;
        console.error(`    ✖ ${variant}/${it.key} (“${it.text}”): ${e.message}`);
        if(e.status === 401){ console.error('\n  401 = bad API key. Stopping.\n'); process.exit(1); }
      }
    }
  }
  console.log(`\n✓ Done. generated ${made}, skipped ${skipped}, failed ${failed}.  ~${charsUsed} characters billed this run.`);
  console.log(`  Files are in phonics/audio/<variant>/.  Commit them, push, and the app uses them automatically.\n`);
}
main().catch(e=>{ console.error(e); process.exit(1); });
