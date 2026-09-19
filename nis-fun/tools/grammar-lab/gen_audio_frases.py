"""Audio de las FRASES sueltas del Grammar Lab (los botones 🔊): el gancho de
la primera pantalla (hook.text) y el truco para recordar (remember.trick) de
cada tema. El motor las pide por SAY.frase(t, b, 'grammar') ->
audio/grammar/<slug>.mp3, con el slug de SAY.slug (60 chars, puede acabar en
guion): aqui se calcula igual, si no el mp3 nunca se encuentra y el navegador
lee con su voz (en iPad, a veces con ninguna).

Los ganchos que son una CONVERSACION («Liam: "…" Sofia: "…"», o «"…," says
Nadia») se graban a varias voces: cada personaje con la suya y SIN leer
«Liam:» ni «says Nadia» (Paolo, 19-sep-2026: «son dos personas hablando; no
menciones de quien es cada parte»). La narracion que no es atribucion («It's
Monday morning.») la lee Miss Vega. El pegado multivoz es el de
tools/gen_secondary_audio.py (edge-tts + ffmpeg).

Uso:  python tools/grammar-lab/gen_audio_frases.py [--force] [--level ket] [--solo-conversaciones] [--ver]
Luego subir: tar -C audio -cf - grammar | ssh -i ~/.ssh/cohasset_s3 root@204.168.174.160 "tar -C /opt/nis-media/nis-fun-audio -xf -"
"""
import os, sys, re, json, glob, asyncio, unicodedata, importlib.util
import edge_tts

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
spec = importlib.util.spec_from_file_location("gsa", os.path.join(ROOT, "tools", "gen_secondary_audio.py"))
gsa = importlib.util.module_from_spec(spec); spec.loader.exec_module(gsa)

RATE = "-6%"
# Varias voces, no una para toda la pagina (Paolo, 19-sep-2026: «se torna
# aburrido»). El mismo elenco de los dialogos (tools/grammar-lab/gen_audio.py);
# a cada frase le toca una voz fija (por su slug), asi al repetirla suena igual.
# Nadia NO es Maisie (voz de niña): Paolo, 19-sep, «demasiado niña, no va con
# el resto». Es Emily (en-IE): la unica joven que queda con acento de las islas.
VOCES = ["en-GB-SoniaNeural", "en-GB-RyanNeural", "en-GB-LibbyNeural", "en-GB-ThomasNeural", "en-IE-EmilyNeural"]
ELENCO = {"Miss Vega": "en-GB-SoniaNeural", "Sofia": "en-GB-LibbyNeural", "Nadia": "en-IE-EmilyNeural",
          "Mateo": "en-GB-RyanNeural", "Liam": "en-GB-ThomasNeural", "Narrator": "en-GB-SoniaNeural"}
CAST = ["Miss Vega", "Sofia", "Nadia", "Mateo", "Liam"]
GENERO = {"Miss Vega": "f", "Sofia": "f", "Nadia": "f", "Mateo": "m", "Liam": "m"}
# Voces para quien habla sin ser del elenco («says the seller», «says his aunt»).
EXTRA = {"m": "en-IE-ConnorNeural", "f": "en-AU-NatashaNeural"}
NARRADOR = "Narrator"   # la narracion la lee Miss Vega (como en los dialogos de secundaria)
NOMBRE = r'(?:Miss Vega|Sofia|Nadia|Mateo|Liam)'
# verbos de decir: «says Nadia», «he asks», «Liam laughs:», «Nadia texts Sofia:» son atribucion y no se leen
HABLA = r'(?:says|asks|adds|replies|answers|whispers|shouts|laughs|smiles|texts|writes|thinks|explains|continues|sighs|groans|mutters|jokes|insists|agrees|admits|announces|suggests|wonders|begins|repeats|interrupts|calls|tells the class)'
EXTRA_SUJ = r'(?:the|his|her|my|their|a) [a-z]+'
POST = re.compile(r'^,?\s*(?:(' + HABLA + r')\s+(' + NOMBRE + r'|he|she|' + EXTRA_SUJ + r')|(he|she)\s+(' + HABLA + r'))\s*([.,:!;]?)\s*')
PRE = re.compile(r'(?:^|(?<=[.!?:,] ))(' + NOMBRE + r')(?:\s+' + HABLA + r'(?:\s+(?:' + NOMBRE + r'|his head|her head))?)?\s*[.:,]?\s*$')
VOCATIVO = re.compile(r'(?:^|, )(' + NOMBRE + r')(?=[?!.,;:]|$)')
# Los ganchos que la sintaxis no resuelve (quien dice que): indice de la cita -> hablante.
OVERRIDES = {"ket/word-building-a2.json": {2: "Mateo", 3: "Miss Vega"},   # «…a teacher, right?» lo pregunta el alumno
             "ket/countable-uncountable.json": {2: "Miss Vega"}}            # «And how much juice?» sigue preguntando la profe

def voz_de(s, es_gancho):
    if es_gancho: return "en-GB-SoniaNeural"
    return VOCES[1:][sum(ord(c) for c in s) % (len(VOCES) - 1)]

def slug(t):
    t = re.sub(r'<[^>]+>', ' ', str(t)).replace('…', '...').replace('—', ', ')
    t = re.sub(r'\s+', ' ', t).strip().lower()
    t = unicodedata.normalize('NFD', t); t = ''.join(c for c in t if not unicodedata.combining(c))
    t = t.replace("'", ''); t = re.sub(r'[^a-z0-9]+', '-', t).strip('-')
    return t[:60]
def limpia(t): return re.sub(r'<[^>]+>', '', str(t)).replace('&amp;', '&')
# Lo que se manda a la voz: la raya larga («found them — they're in the bag»)
# edge-tts la lee como una pausa larga y la frase siguiente arranca cortada
# (Paolo, 19-sep-2026: «después de la coma que no se detenga mucho… no suena
# natural»). Como coma la ilación es la de hablar. El slug NO cambia: sale del
# texto original, igual que en el navegador.
def para_voz(t): return re.sub(r'\s*—\s*', ', ', limpia(t)).replace(', ,', ',')

def es_conversacion(t):
    return bool(re.search(r'[“"]', limpia(t))) and bool(re.search(NOMBRE, limpia(t)))

def _nombres(t): return [m.group(0) for m in re.finditer(NOMBRE, t)]
def _candidato(narr):
    """Quien acaba de actuar en la narracion («Miss Vega takes a photo.») habla despues."""
    for fr in reversed(re.split(r'(?<=[.!?:])\s+', narr)):
        n = _nombres(fr)
        if n: return n[0]
    return None

def guion(t, clave=None):
    """[(hablante|None, texto)] — None = narracion. Las atribuciones («Liam:»,
    «says Nadia», «he asks», «Sofia whispers:») deciden la voz y NO se leen."""
    t = limpia(t).replace('“', '"').replace('”', '"').replace('’', "'")
    trozos = [x.strip() for x in re.split(r'("[^"]*")', t) if x.strip()]
    citas, salida, narr_total = [], [], []    # citas: dicts; salida: ('n', txt) | ('q', i)
    for tr in trozos:
        if tr.startswith('"') and tr.endswith('"') and len(tr) > 1:
            citas.append({"txt": tr[1:-1].strip(), "pre": None, "post": None, "coma": False, "cand": None,
                          "narr_antes": bool(salida) and salida[-1][0] == 'n', "narr_texto": ' '.join(narr_total)})
            salida.append(('q', len(citas) - 1)); continue
        narr_total.append(tr); resto = tr
        m2 = POST.match(resto)
        if m2 and citas:
            citas[-1]["post"] = m2.group(2) or m2.group(3); citas[-1]["coma"] = m2.group(5) == ','
            resto = resto[m2.end():].strip()
        m = PRE.search(resto)
        pre = m.group(1) if m else None
        if m: resto = resto[:m.start()].strip()
        if resto: salida.append(('n', resto))
        # lo que sigue a esta narracion hereda pre/candidato
        nxt = {"pre": pre, "cand": _candidato(resto) if resto else None, "vacio": not resto}
        salida.append(('meta', nxt))
    # pasar los meta a la cita siguiente
    meta = None; limpio = []
    for it in salida:
        if it[0] == 'meta': meta = it[1]; continue
        if it[0] == 'q' and meta:
            c = citas[it[1]]; c["pre"] = meta["pre"]; c["cand"] = meta["cand"]
            if meta["vacio"] and not meta["pre"]: c["narr_antes"] = False
        meta = None; limpio.append(it)
    salida = limpio
    # resolver hablantes
    quien = []
    def genero_de(pron, narr):
        g = 'm' if pron == 'he' else 'f'
        for n in reversed(_nombres(narr)):
            if GENERO[n] == g: return n
        for w in reversed(quien):
            if w in GENERO and GENERO[w] == g: return w
        return 'Liam' if g == 'm' else 'Sofia'
    def otro(S, prev_txt, i):
        v = VOCATIVO.search(prev_txt)
        if v and v.group(1) != S: return v.group(1)
        for w in reversed(quien[:i]):
            if w != S and w in GENERO: return w
        for n in reversed(_nombres(citas[i]["narr_texto"])):
            if n != S: return n
        for c in citas[:i + 1]:
            for n in _nombres(c["txt"]):
                if n != S: return n
        return 'Sofia' if S != 'Sofia' else 'Liam'
    ov = OVERRIDES.get(clave, {})
    for i, c in enumerate(citas):
        p = citas[i - 1] if i else None
        S = quien[i - 1] if i else None
        if i in ov: w = ov[i]; fuente = 'ov'
        elif c["post"]:
            s = c["post"]; fuente = 'post'
            if s in ('he', 'she'): w = genero_de(s, c["narr_texto"])
            elif s in GENERO: w = s
            else:
                g = 'f' if re.search(r'aunt|mum|mother|sister|girl|woman|lady|grand', s) else 'm'
                w = s[0].upper() + s[1:]; ELENCO.setdefault(w, EXTRA[g])
        elif c["pre"]: w = c["pre"]; fuente = 'pre'
        elif p and p["coma"]: w = S; fuente = 'coma'
        elif c["cand"]: w = c["cand"]; fuente = 'cand'
        elif p is None: w = 'Sofia'; fuente = 'def'
        elif c["narr_antes"]: w = S; fuente = 'sigue'
        elif p["txt"].rstrip().endswith('?'): w = otro(S, p["txt"], i); fuente = 'resp'
        elif p["fuente"] in ('post', 'pre', 'cand', 'ov', 'coma'): w = S; fuente = 'cont'
        else: w = otro(S, p["txt"], i); fuente = 'alt'
        c["fuente"] = fuente; quien.append(w)
    lineas = []
    for it in salida:
        if it[0] == 'n': lineas.append((None, it[1], False))
        else: lineas.append((quien[it[1]], citas[it[1]]["txt"], citas[it[1]]["coma"]))
    return lineas

def bocadillos(lineas):
    """Los trozos seguidos del mismo hablante son UN bocadillo (la pantalla y el
    audio por bocadillo): «"No," says Mateo, "I haven't…"» -> «No, I haven't…».
    Si la atribucion acabo en punto, la coma que dejo la cita pasa a punto.
    Misma regla en engine/teen.js (bocadillosHook): si cambias una, cambia las dos."""
    out = []
    for who, txt, coma in lineas:
        if out and out[-1][0] == who:
            w, prev, pcoma = out[-1]
            if not pcoma and prev.endswith(','): prev = prev[:-1] + '.'
            out[-1] = (w, prev + ' ' + txt, coma)
        else: out.append((who, txt, coma))
    return [(w, (t[:-1] + '.') if t.endswith(',') else t) for w, t, _ in out]

def recoge(nivel=None):
    frases = {}
    for lv in ([nivel] if nivel else ["a1", "ket", "pet", "b2f", "c1a"]):
        for p in sorted(glob.glob(os.path.join(ROOT, "content", lv, "grammar", "*.json"))):
            if p.endswith("index.json"): continue
            d = json.load(open(p, encoding="utf-8"))
            for es_gancho, t in [(True, (d.get("hook") or {}).get("text")), (False, (d.get("remember") or {}).get("trick"))]:
                if t: frases.setdefault(slug(limpia(t)), (limpia(t), es_gancho, lv, os.path.basename(p)))
    return frases

async def main():
    args = sys.argv[1:]
    force = "--force" in args
    solo_conv = "--solo-conversaciones" in args
    nivel = args[args.index("--level") + 1] if "--level" in args else None
    out = os.path.join(ROOT, "audio", "grammar"); os.makedirs(out, exist_ok=True)
    hechos = saltados = 0; vistos = {}
    for s, (t, es_gancho, lv, fn) in recoge(nivel).items():
        conv = es_gancho and es_conversacion(t)
        if solo_conv and not conv: continue
        dest = os.path.join(out, s + ".mp3")
        if conv:
            for who, txt in bocadillos(guion(t, lv + "/" + fn)):
                sb = slug(txt); db = os.path.join(out, sb + ".mp3")
                if sb in vistos and vistos[sb] != (who, txt): print(f"  ! choque de slug {sb}: {vistos[sb][0]} / {who}")
                vistos[sb] = (who, txt)
                if os.path.exists(db) and not force: continue
                await edge_tts.Communicate(para_voz(txt), ELENCO.get(who or NARRADOR, EXTRA['m']), rate=RATE).save(db); hechos += 1
        if os.path.exists(dest) and not force: saltados += 1; continue
        if conv:
            g = guion(t, lv + "/" + fn)
            # por bocadillos fundidos, no por trozos: «"Twice a week," says
            # Nadia, "on Tuesdays…"» es UNA frase y se graba de una vez
            bocs = bocadillos(g)
            script = "\n".join(f"{who or NARRADOR}: {para_voz(txt)}" for who, txt in bocs)
            await gsa.genera(dest, script, ELENCO); hechos += 1
            print(f"  conv    {s}.mp3  ({len(bocs)} bocadillos, {len(set(w for w, _ in bocs if w))} voces)")
        else:
            v = voz_de(s, es_gancho)
            await edge_tts.Communicate(para_voz(t), v, rate=RATE).save(dest); hechos += 1
            print(f"  {v[6:-6]:7} {s}.mp3")
    print(f"{hechos} grabadas, {saltados} ya estaban")

if __name__ == "__main__":
    if "--ver" in sys.argv:
        for s, (t, es_gancho, lv, fn) in recoge().items():
            if not (es_gancho and es_conversacion(t)): continue
            print("---", lv, fn)
            for who, q in bocadillos(guion(t, lv + "/" + fn)): print(f"   {who or '(narra)':10} | {q[:76]}")
    else:
        asyncio.run(main())
