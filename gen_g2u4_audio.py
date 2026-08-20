# -*- coding: utf-8 -*-
"""Genera el audio ElevenLabs de la Unit 4 de 2.º grado (In the Kitchen).

Sintetiza con VOZ DE NIÑO (elegida de la librería de ElevenLabs) y escribe:

  g2u4-audio/w-<palabra>.mp3        las 40 palabras del vocabulario
  g2u4-audio/step-<receta>-<n>.mp3  cada paso de Little Chef
  g2u4-audio/done-<receta>.mp3      la celebración final de cada receta

Los juegos (g2-u4-data.js `say()`) reproducen el mp3 si HAS_MP3=true y caen
a speechSynthesis si el archivo falla. Tras generar: poner HAS_MP3=true en
g2-u4-data.js, bump g2-u4-data.js?v= en los 5 juegos, commit+push.

Vocabulario y guiones se leen DIRECTAMENTE de g2-u4-data.js y de
recipe-builder-g2u4.html, así el audio siempre coincide con los juegos.

Uso:
  1) Clave: $env:ELEVENLABS_API_KEY = "sk_..."   (o en mocks-cambridge\\"A2 Level.txt")
  2) python gen_g2u4_audio.py --list-child-voices [--accent british|american]
       busca voces de niño en la librería y lista candidatas (id, nombre, acento)
  3) python gen_g2u4_audio.py --add-voice <owner_public_id>:<voice_id> --name "Nombre"
       añade una voz de la librería a My Voices (necesario antes de usarla)
  4) python gen_g2u4_audio.py --voice <voice_id> [--dry-run] [--force]
       genera los mp3 (por defecto solo los que falten)
"""
import os, re, sys, json, argparse
from urllib import request as urlreq, error as urlerr, parse as urlparse
try: sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception: pass

REPO  = os.path.dirname(os.path.abspath(__file__))
DATA  = os.path.join(REPO, "g2-u4-data.js")
RECIP = os.path.join(REPO, "recipe-builder-g2u4.html")
OUT   = os.path.join(REPO, "g2u4-audio")
MODEL = "eleven_multilingual_v2"
FMT   = "mp3_44100_128"

def get_key():
    k = os.environ.get("ELEVENLABS_API_KEY")
    if k and k.strip().startswith("sk_"): return k.strip()
    # Ojo: mocks-cambridge\"A2 Level.txt" contiene un key ID (no sirve);
    # la key real vive en E:\A2levelsapikeybattle.txt (2026-08-20).
    for f in (r"E:\A2levelsapikeybattle.txt", r"C:\Users\USER\mocks-cambridge\A2 Level.txt"):
        if os.path.exists(f):
            k = open(f, encoding="utf-8-sig").read().strip()
            if k.startswith("sk_"): return k
    sys.exit('No hay una API key valida (deben empezar con "sk_").\n'
             '  PowerShell:  $env:ELEVENLABS_API_KEY = "sk_..."\n'
             '  o pegarla en E:\\A2levelsapikeybattle.txt')

def api(path, key, body=None, method=None):
    req = urlreq.Request("https://api.elevenlabs.io" + path,
        data=(json.dumps(body).encode() if body is not None else None),
        method=method or ("POST" if body is not None else "GET"),
        headers={"xi-api-key": key, "Content-Type": "application/json"})
    with urlreq.urlopen(req, timeout=180) as r:
        raw = r.read()
        try: return json.loads(raw)
        except Exception: return raw

def slug(t): return re.sub(r"(^-|-$)", "", re.sub(r"[^a-z0-9]+", "-", t.lower()))

def collect():
    """[(archivo_sin_ext, texto)] leído de los juegos."""
    js = open(DATA, encoding="utf-8").read()
    # las tres listas de vocabulario: entradas {w:'...'}
    words = re.findall(r"\{w:'([^']+)'", js)
    items = [("w-" + slug(w), w) for w in words]
    html = open(RECIP, encoding="utf-8").read()
    # recetas: key:'sandwich' ... steps con say:'...'
    for m in re.finditer(r"\{key:'(\w+)'.*?steps:\[(.*?)\]", html, re.S):
        rkey, block = m.group(1), m.group(2)
        for n, s in enumerate(re.findall(r"\{say:'((?:[^'\\]|\\.)*)'", block), 1):
            items.append(("step-%s-%d" % (rkey, n), s.replace("\\'", "'")))
    # celebraciones (mismo texto que dice finish() en el juego)
    for m in re.finditer(r"\{key:'(\w+)'[^\n]*?name:'([^']+)'", html):
        items.append(("done-" + m.group(1), "You made %s! Great job, chef!" % m.group(2)))
    return items

def list_child_voices(key, accent=None):
    q = {"page_size": "30", "search": "child", "language": "en", "category": "high_quality"}
    if accent: q["accent"] = accent
    d = api("/v1/shared-voices?" + urlparse.urlencode(q), key)
    vs = d.get("voices", [])
    if not vs:  # sin filtro de categoría si no hubo resultados
        q.pop("category", None)
        vs = api("/v1/shared-voices?" + urlparse.urlencode(q), key).get("voices", [])
    print("%-22s %-8s %-10s %-8s %s" % ("voice_id", "edad", "acento", "género", "nombre — descripción"))
    for v in vs:
        print("%-22s %-8s %-10s %-8s %s — %s" % (
            v.get("voice_id",""), v.get("age",""), v.get("accent",""), v.get("gender",""),
            v.get("name",""), (v.get("description") or "")[:70]))
        print("   add con: --add-voice %s:%s --name \"%s\"" % (
            v.get("public_owner_id",""), v.get("voice_id",""), v.get("name","")))
    if not vs: print("(sin resultados; prueba sin --accent)")

def tts(key, vid, text, dest):
    body = {"text": text, "model_id": MODEL,
            "voice_settings": {"stability": 0.5, "similarity_boost": 0.8}}
    req = urlreq.Request(
        "https://api.elevenlabs.io/v1/text-to-speech/%s?output_format=%s" % (vid, FMT),
        data=json.dumps(body).encode(), method="POST",
        headers={"xi-api-key": key, "Content-Type": "application/json", "Accept": "audio/mpeg"})
    with urlreq.urlopen(req, timeout=180) as r, open(dest, "wb") as f:
        f.write(r.read())

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--list-child-voices", action="store_true")
    ap.add_argument("--accent", choices=["british", "american"])
    ap.add_argument("--add-voice", help="owner_public_id:voice_id")
    ap.add_argument("--name", help="nombre para --add-voice")
    ap.add_argument("--voice", help="voice_id para generar")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--force", action="store_true")
    a = ap.parse_args()
    key = get_key()

    if a.list_child_voices:
        return list_child_voices(key, a.accent)
    if a.add_voice:
        owner, vid = a.add_voice.split(":", 1)
        r = api("/v1/voices/add/%s/%s" % (owner, vid), key, {"new_name": a.name or "Child EN"})
        return print("Añadida a My Voices:", r)

    items = collect()
    chars = sum(len(t) for _, t in items)
    print("%d clips · %d caracteres (~%d créditos)" % (len(items), chars, chars))
    if a.dry_run:
        for f, t in items: print("  %-24s %s" % (f + ".mp3", t))
        return
    if not a.voice: sys.exit("Falta --voice <voice_id> (usa --list-child-voices para elegir).")
    os.makedirs(OUT, exist_ok=True)
    done = skip = 0
    for f, t in items:
        dest = os.path.join(OUT, f + ".mp3")
        if os.path.exists(dest) and not a.force:
            skip += 1; continue
        tts(key, a.voice, t, dest)
        done += 1; print("  ✓", f + ".mp3")
    print("Generados %d · ya existían %d → %s" % (done, skip, OUT))
    print("Ahora: HAS_MP3=true en g2-u4-data.js, bump ?v= en los 5 juegos, commit+push.")

if __name__ == "__main__":
    main()
