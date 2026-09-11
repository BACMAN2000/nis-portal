# -*- coding: utf-8 -*-
"""Audio ElevenLabs del reader "When the Earth Moves" (3.o, U5): todo el texto del libro.

Lee  readers/when-the-earth-moves/audio/manifest.json   (lo genera el libro: id -> {who, text})
y escribe readers/when-the-earth-moves/audio/<id>.mp3  + index.json (los ids que ya tienen mp3).
La pagina reproduce el mp3 si su id esta en index.json; si no, usa la voz del navegador.
Asi se puede generar por tandas y publicar lo que haya: nada se rompe a medias.

Voces: un NARRADOR adulto (britanico, calido) para el texto del libro, y VOCES DE NINO para los
personajes de Fun for Nordic (burbujas, dialogos, trucos de gramatica, "Did you know?", las
presentaciones del principio). Cada edicion tiene 2 ninas, 2 ninos y una mascota, asi que bastan
5 voces de nino (nina A, nina B, nino A, nino B, mascota), repartidas para que dentro de una
misma edicion nadie suene igual:

  nina A  freya, valentina, ingrid      nino A  nico, mateo, diego
  nina B  astrid, sofia, maya           nino B  tomas, erik, oliver
  mascota pip, luna, kili

Uso (desde C:\\Users\\USER\\nis-portal):
  1) python gen_wtem_audio.py --pick       busca voces de nino en la libreria de ElevenLabs,
                                           las agrega a My Voices y guarda audio/voices.json
  2) python gen_wtem_audio.py --preview    una frase de muestra por voz en audio/_preview/
                                           (escuchalas; si alguna no te gusta, cambia su id en voices.json)
  3) python gen_wtem_audio.py --dry-run    cuenta caracteres y creditos y mira cuantos te quedan
  4) python gen_wtem_audio.py              genera los mp3 que falten (se puede cortar y repetir)
     python gen_wtem_audio.py --model eleven_flash_v2_5   (mitad de creditos, algo menos natural)
  5) git add readers/when-the-earth-moves/audio gen_wtem_audio.py; git commit -m "audio U5"; git push

Clave: $env:ELEVENLABS_API_KEY = "sk_..."  o el archivo E:\\A2levelsapikeybattle.txt (como gen_g2u4_audio.py).
"""
import os, sys, json, time, argparse
from urllib import request as urlreq, error as urlerr, parse as urlparse
try: sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception: pass

REPO = os.path.dirname(os.path.abspath(__file__))
ADIR = os.path.join(REPO, "readers", "when-the-earth-moves", "audio")
MANIFEST = os.path.join(ADIR, "manifest.json")
VOICES_JSON = os.path.join(ADIR, "voices.json")
FMT = "mp3_44100_64"

ROLE = {"narrator": "narrator",
        "freya": "girlA", "valentina": "girlA", "ingrid": "girlA",
        "astrid": "girlB", "sofia": "girlB", "maya": "girlB",
        "nico": "boyA", "mateo": "boyA", "diego": "boyA",
        "tomas": "boyB", "erik": "boyB", "oliver": "boyB",
        "pip": "pet", "luna": "pet", "kili": "pet"}
SETTINGS = {"narrator": {"stability": 0.55, "similarity_boost": 0.75, "style": 0.15, "use_speaker_boost": True},
            "kid": {"stability": 0.4, "similarity_boost": 0.8, "style": 0.35, "use_speaker_boost": True}}
SAMPLE = {"narrator": "It is Monday morning at school in Lima. Then the windows shake, and the floor moves too!",
          "girlA": "Hi, I'm Freya! Look at the table and read the numbers with me.",
          "girlB": "Here is the rule: drop, cover, hold on!",
          "boyA": "Oops! Is a tsunami one wave? No, many waves!",
          "boyB": "Drop, cover, hold on. I made it into a song!",
          "pet": "Hello from the Andes! I'm Kili the condor, and I bring you letters."}


def get_key():
    k = os.environ.get("ELEVENLABS_API_KEY")
    if k and k.strip().startswith("sk_"): return k.strip()
    for f in (r"E:\A2levelsapikeybattle.txt", r"C:\Users\USER\mocks-cambridge\A2 Level.txt", r"C:\Projects\mocks-cambridge\A2 Level.txt"):
        if os.path.exists(f):
            k = open(f, encoding="utf-8-sig").read().strip().splitlines()[0].strip()
            if k.startswith("sk_"): return k
    sys.exit('No hay una API key valida (empieza con "sk_").\n  PowerShell:  $env:ELEVENLABS_API_KEY = "sk_..."')


def api(path, key, body=None, method=None):
    req = urlreq.Request("https://api.elevenlabs.io" + path,
                         data=(json.dumps(body).encode() if body is not None else None),
                         method=method or ("POST" if body is not None else "GET"),
                         headers={"xi-api-key": key, "Content-Type": "application/json"})
    with urlreq.urlopen(req, timeout=180) as r:
        raw = r.read()
        try: return json.loads(raw)
        except Exception: return raw


def tts(key, vid, text, dest, model, kind):
    body = {"text": text, "model_id": model, "voice_settings": SETTINGS[kind]}
    req = urlreq.Request("https://api.elevenlabs.io/v1/text-to-speech/%s?output_format=%s" % (vid, FMT),
                         data=json.dumps(body).encode(), method="POST",
                         headers={"xi-api-key": key, "Content-Type": "application/json", "Accept": "audio/mpeg"})
    with urlreq.urlopen(req, timeout=180) as r:
        data = r.read()
    with open(dest + ".part", "wb") as f:
        f.write(data)
    os.replace(dest + ".part", dest)


def load_voices():
    if not os.path.exists(VOICES_JSON):
        sys.exit("Falta audio/voices.json. Primero:  python gen_wtem_audio.py --pick")
    v = json.load(open(VOICES_JSON, encoding="utf-8"))
    miss = [r for r in ("narrator", "girlA", "girlB", "boyA", "boyB", "pet") if not v.get(r)]
    if miss: sys.exit("voices.json no tiene voz para: " + ", ".join(miss))
    return v


def search_shared(key, gender, terms):
    seen, out = set(), []
    for accent in ("british", None):
        for term in terms:
            q = {"page_size": "40", "search": term, "language": "en", "gender": gender}
            if accent: q["accent"] = accent
            try: vs = api("/v1/shared-voices?" + urlparse.urlencode(q), key).get("voices", [])
            except Exception as e: print("  (busqueda '%s' fallo: %s)" % (term, e)); vs = []
            for v in vs:
                blob = " ".join(str(v.get(k) or "") for k in ("name", "description", "age", "use_case", "descriptive")).lower()
                if v["voice_id"] in seen or not any(w in blob for w in ("child", "kid", "little", "young girl", "young boy", "boy", "girl")): continue
                seen.add(v["voice_id"]); out.append(v)
        if len(out) >= 4: break
    out.sort(key=lambda v: -(v.get("cloned_by_count") or 0))
    return out


def pick(key):
    have = api("/v1/voices", key).get("voices", [])
    by_name = {v["name"].lower(): v["voice_id"] for v in have}
    chosen = json.load(open(VOICES_JSON, encoding="utf-8")) if os.path.exists(VOICES_JSON) else {}
    if not chosen.get("narrator"):
        for n in ("lily", "alice", "matilda"):
            if n in by_name: chosen["narrator"] = by_name[n]; print("narrador:", n.title()); break
    girls = search_shared(key, "female", ["child", "kid", "little girl", "young girl"])
    boys = search_shared(key, "male", ["child", "kid", "little boy", "young boy"])
    print("\nCandidatas nina:"); [print("  %-22s %s — %s" % (v["voice_id"], v.get("name"), (v.get("description") or "")[:60])) for v in girls[:6]]
    print("Candidatos nino:"); [print("  %-22s %s — %s" % (v["voice_id"], v.get("name"), (v.get("description") or "")[:60])) for v in boys[:6]]
    plan = [("girlA", girls, 0), ("girlB", girls, 1), ("boyA", boys, 0), ("boyB", boys, 1), ("pet", girls + boys, 2)]
    for role, pool, idx in plan:
        if chosen.get(role) or len(pool) <= idx: continue
        v = pool[idx]
        name = "WTEM %s — %s" % (role, v.get("name"))
        try:
            api("/v1/voices/add/%s/%s" % (v["public_owner_id"], v["voice_id"]), key, {"new_name": name})
            print("agregada a My Voices:", name)
        except urlerr.HTTPError as e:
            print("  no se pudo agregar %s (%s) — revisa el limite de voces de tu plan" % (v.get("name"), e.code))
        chosen[role] = v["voice_id"]
    os.makedirs(ADIR, exist_ok=True)
    json.dump(chosen, open(VOICES_JSON, "w", encoding="utf-8"), indent=2, ensure_ascii=False)
    print("\nGuardado", VOICES_JSON, json.dumps(chosen, indent=2))
    print("Siguiente paso:  python gen_wtem_audio.py --preview")


def write_index():
    ids = sorted(f[:-4] for f in os.listdir(ADIR) if f.endswith(".mp3") and len(f) == 16)
    json.dump(ids, open(os.path.join(ADIR, "index.json"), "w"), separators=(",", ":"))
    return len(ids)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--pick", action="store_true")
    ap.add_argument("--preview", action="store_true")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--model", default="eleven_multilingual_v2")
    ap.add_argument("--limit", type=int, default=0, help="generar como mucho N clips en esta tanda")
    a = ap.parse_args()
    key = get_key()
    if a.pick: return pick(key)
    voices = load_voices()
    if a.preview:
        pdir = os.path.join(ADIR, "_preview"); os.makedirs(pdir, exist_ok=True)
        for role, text in SAMPLE.items():
            tts(key, voices[role], text, os.path.join(pdir, role + ".mp3"), a.model, "narrator" if role == "narrator" else "kid")
            print("  ✓ _preview/%s.mp3" % role)
        print("Escuchalas en", pdir, "(la carpeta _preview no hace falta subirla).")
        return
    man = json.load(open(MANIFEST, encoding="utf-8"))
    todo = [(i, v) for i, v in man.items() if not os.path.exists(os.path.join(ADIR, i + ".mp3"))]
    chars = sum(len(v["text"]) for _, v in todo)
    mult = 0.5 if "flash" in a.model or "turbo" in a.model else 1.0
    print("%d clips en total · faltan %d · %d caracteres (~%d creditos con %s)" % (len(man), len(todo), chars, chars * mult, a.model))
    try:
        sub = api("/v1/user/subscription", key)
        left = sub.get("character_limit", 0) - sub.get("character_count", 0)
        print("Te quedan ~%d creditos este mes (plan %s)." % (left, sub.get("tier")))
        if left < chars * mult: print("OJO: no alcanzan para todo. Se generara hasta que se acaben y se puede seguir el mes siguiente.")
    except Exception:
        pass
    if a.dry_run: return
    done = 0
    for i, v in todo:
        if a.limit and done >= a.limit: break
        role = ROLE.get(v["who"], "narrator")
        try:
            tts(key, voices[role], v["text"], os.path.join(ADIR, i + ".mp3"), a.model, "narrator" if role == "narrator" else "kid")
        except urlerr.HTTPError as e:
            if e.code in (401, 402, 429):
                print("\nParo: ElevenLabs respondio %d (cuota o limite). Lo generado queda guardado." % e.code); break
            print("  ✗ %s (%s) — sigo" % (i, e.code)); continue
        except Exception as e:
            print("  ✗ %s (%s) — sigo" % (i, e)); time.sleep(2); continue
        done += 1
        if done % 20 == 0: print("  %d/%d · indice actualizado (%d mp3)" % (done, len(todo), write_index()))
    n = write_index()
    print("\nListo: %d mp3 nuevos, %d en total. Ahora:  git add readers/when-the-earth-moves/audio; git commit -m \"audio U5\"; git push" % (done, n))


if __name__ == "__main__":
    main()
