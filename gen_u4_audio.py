# -*- coding: utf-8 -*-
"""Genera el audio ElevenLabs del listening de la Unidad 4.

Lee los guiones directamente de listening-mind-over-matter.html (bloque `const DATA`),
sintetiza cada turno con la voz que le corresponde, los une con ffmpeg insertando
pausas naturales, y escribe:

  audio/listening/u4-<LEVEL>.mp3          un archivo por nivel
  audio/listening/manifest.json           duraciones + marcas de tiempo por turno

El HTML reproduce el mp3 si existe y cae de vuelta a la voz del navegador si no.

Uso:
  PowerShell:  $env:ELEVENLABS_API_KEY = "sk_..."
  bash:        export ELEVENLABS_API_KEY="sk_..."

  python gen_u4_audio.py                 # genera lo que falte
  python gen_u4_audio.py --force         # regenera todo
  python gen_u4_audio.py --dry-run       # sólo cuenta caracteres y coste

La key NUNCA se guarda en el repo: sólo se lee de la variable de entorno.
"""
import os, re, sys, json, time, hashlib, argparse, subprocess, tempfile
from urllib import request as urlreq, error as urlerr
try: sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception: pass

REPO = os.path.dirname(os.path.abspath(__file__))
HTML = os.path.join(REPO, "listening-mind-over-matter.html")
OUT  = os.path.join(REPO, "audio", "listening")
MODEL = "eleven_multilingual_v2"

# host = narradora británica · guest = voz masculina británica para el diálogo B2/C1
VOICES = {
    "host":  ("Charlotte", "XB0fDUnXU5powFXDhCwa"),
    "guest": ("Daniel",    "onwK4e9ZLuTAKqWW03F9"),
}
# ritmo por nivel: más lento y más pausado abajo, natural arriba
SPEED = {"A2": 0.82, "B1": 0.90, "B2": 0.97, "C1": 1.0}
GAP   = {"A2": 1.1,  "B1": 0.9,  "B2": 0.7,  "C1": 0.6}   # segundos de silencio entre turnos


def get_key():
    k = os.environ.get("ELEVENLABS_API_KEY")
    if k: return k.strip()
    sys.exit('No hay ELEVENLABS_API_KEY.\n'
             '  PowerShell:  $env:ELEVENLABS_API_KEY = "sk_..."\n'
             '  bash:        export ELEVENLABS_API_KEY="sk_..."')


def parse_scripts():
    """Extrae {nivel: [(who, text), ...]} del bloque DATA del HTML."""
    src = open(HTML, encoding="utf-8").read()
    out = {}
    for lv in ("A2", "B1", "B2", "C1"):
        # localiza el bloque del nivel y, dentro, su array script:[ ... ]
        i = src.index("\n%s:{ label:\"%s\"" % (lv, lv))
        j = src.index("script:[", i)
        k = src.index("\n ],", j)
        block = src[j:k]
        turns = re.findall(r'\{w:"(host|guest)",\s*t:"((?:[^"\\]|\\.)*)"\}', block, re.S)
        if not turns:
            sys.exit(f"No se pudieron leer los turnos de {lv}")
        out[lv] = [(w, re.sub(r"\s+", " ", t).strip()) for w, t in turns]
    return out


def tts(key, voice_id, text, speed):
    body = json.dumps({
        "text": text,
        "model_id": MODEL,
        "voice_settings": {"stability": 0.45, "similarity_boost": 0.75,
                           "style": 0.15, "use_speaker_boost": True, "speed": speed},
    }).encode()
    req = urlreq.Request(f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}",
                         data=body, headers={"xi-api-key": key, "Content-Type": "application/json"})
    for attempt in range(4):
        try:
            return urlreq.urlopen(req, timeout=180).read()
        except urlerr.HTTPError as e:
            msg = e.read()[:300].decode(errors="replace")
            if e.code in (429, 500, 502, 503) and attempt < 3:
                time.sleep(4 * (attempt + 1)); continue
            sys.exit(f"ElevenLabs HTTP {e.code}: {msg}")
        except Exception as e:
            if attempt < 3: time.sleep(3); continue
            sys.exit(f"ElevenLabs error: {e}")


def dur(path):
    r = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                        "-of", "default=nw=1:nk=1", path], capture_output=True, text=True)
    return round(float(r.stdout.strip()), 3)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--force", action="store_true")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--only", help="sólo este nivel (A2/B1/B2/C1)")
    a = ap.parse_args()

    scripts = parse_scripts()
    levels = [a.only] if a.only else ["A2", "B1", "B2", "C1"]

    total = sum(len(t) for lv in levels for w, t in scripts[lv])
    print(f"Caracteres a sintetizar: {total:,}  (modelo {MODEL})")
    for lv in levels:
        n = sum(len(t) for w, t in scripts[lv])
        speakers = sorted(set(w for w, t in scripts[lv]))
        print(f"  {lv}: {len(scripts[lv])} turnos · {n:,} chars · voces: {', '.join(speakers)}")
    if a.dry_run:
        return

    key = get_key()
    os.makedirs(OUT, exist_ok=True)
    manifest_path = os.path.join(OUT, "manifest.json")
    manifest = {}
    if os.path.exists(manifest_path):
        manifest = json.load(open(manifest_path, encoding="utf-8"))

    for lv in levels:
        final = os.path.join(OUT, f"u4-{lv}.mp3")
        sig = hashlib.sha1(json.dumps(scripts[lv], ensure_ascii=False).encode()).hexdigest()[:12]
        if os.path.exists(final) and not a.force and manifest.get(lv, {}).get("sig") == sig:
            print(f"{lv}: sin cambios, se conserva ({dur(final)}s)"); continue

        print(f"{lv}: sintetizando {len(scripts[lv])} turnos…")
        tmp = tempfile.mkdtemp(prefix=f"u4{lv}_")
        parts, marks, t0 = [], [], 0.0
        gap = GAP[lv]
        silence = os.path.join(tmp, "gap.mp3")
        subprocess.run(["ffmpeg", "-y", "-v", "error", "-f", "lavfi", "-t", str(gap),
                        "-i", "anullsrc=r=44100:cl=mono", "-q:a", "9", silence], check=True)

        for i, (who, text) in enumerate(scripts[lv]):
            name, vid = VOICES[who]
            data = tts(key, vid, text, SPEED[lv])
            p = os.path.join(tmp, f"{i:02d}.mp3")
            open(p, "wb").write(data)
            d = dur(p)
            marks.append({"i": i, "who": who, "voice": name, "start": round(t0, 3),
                          "end": round(t0 + d, 3), "text": text})
            t0 += d + gap
            parts += [p, silence]
            print(f"   {i+1:2d}/{len(scripts[lv])} {who:5s} {name:9s} {d:6.2f}s  {len(text):4d} chars")
        parts = parts[:-1]                                   # sin silencio final

        lst = os.path.join(tmp, "list.txt")
        open(lst, "w", encoding="utf-8").write("".join(f"file '{p}'\n".replace("\\", "/") for p in parts))
        subprocess.run(["ffmpeg", "-y", "-v", "error", "-f", "concat", "-safe", "0",
                        "-i", lst, "-c:a", "libmp3lame", "-b:a", "96k", "-ar", "44100", final], check=True)

        # ?v=<sig> — cada regeneración cambia la URL, así Cloudflare no puede
        # servir ni un mp3 viejo ni un 404 cacheado de antes del deploy.
        manifest[lv] = {"file": f"audio/listening/u4-{lv}.mp3?v={sig[:8]}", "sig": sig,
                        "duration": dur(final), "turns": marks,
                        "voices": {w: VOICES[w][0] for w in set(x["who"] for x in marks)}}
        size = os.path.getsize(final) / 1024
        print(f"{lv}: ✔ {final}  {manifest[lv]['duration']}s · {size:.0f} KB")

    json.dump(manifest, open(manifest_path, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("\nmanifest:", manifest_path)
    for lv in manifest:
        m = manifest[lv]
        print(f"  {lv}: {m['duration']}s · {len(m['turns'])} turnos · {', '.join(m['voices'].values())}")


if __name__ == "__main__":
    main()
