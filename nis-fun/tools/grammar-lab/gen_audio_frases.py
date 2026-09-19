"""Audio de las FRASES sueltas del Grammar Lab (los botones 🔊): el gancho de
la primera pantalla (hook.text) y el truco para recordar (remember.trick) de
cada tema, con varias voces del elenco britanico. El motor las pide por SAY.frase(t, b,
'grammar') -> audio/grammar/<slug>.mp3, con el slug de SAY.slug (60 chars,
puede acabar en guion): aqui se calcula igual, si no el mp3 nunca se
encuentra y el navegador lee con su voz (en iPad, a veces con ninguna).

19-sep-2026: los 60 temas de a1/ket/pet (120 frases) no tenian mp3.
Uso:  python tools/grammar-lab/gen_audio_frases.py [--force] [--level ket]
Luego subir: tar -C audio -cf - grammar | ssh -i ~/.ssh/cohasset_s3 root@204.168.174.160 "tar -C /opt/nis-media/nis-fun-audio -xf -"
"""
import os, sys, re, json, glob, asyncio, unicodedata
import edge_tts

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
RATE = "-6%"
# Varias voces, no una para toda la pagina (Paolo, 19-sep-2026: «se torna
# aburrido»). El mismo elenco britanico de los dialogos; a cada frase le toca
# una voz fija (por su slug), asi al repetirla suena igual. El gancho de la
# primera pantalla lo dice Miss Vega, que es quien habla ahi.
VOCES = ["en-GB-SoniaNeural", "en-GB-RyanNeural", "en-GB-LibbyNeural", "en-GB-ThomasNeural", "en-GB-MaisieNeural"]
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

async def main():
    args = sys.argv[1:]
    force = "--force" in args
    nivel = args[args.index("--level") + 1] if "--level" in args else None
    out = os.path.join(ROOT, "audio", "grammar"); os.makedirs(out, exist_ok=True)
    frases = {}
    for lv in ([nivel] if nivel else ["a1", "ket", "pet", "b2f", "c1a"]):
        for p in sorted(glob.glob(os.path.join(ROOT, "content", lv, "grammar", "*.json"))):
            if p.endswith("index.json"): continue
            d = json.load(open(p, encoding="utf-8"))
            for es_gancho, t in [(True, (d.get("hook") or {}).get("text")), (False, (d.get("remember") or {}).get("trick"))]:
                if t: frases.setdefault(slug(limpia(t)), (limpia(t), es_gancho))
    hechos = saltados = 0
    for s, (t, es_gancho) in frases.items():
        dest = os.path.join(out, s + ".mp3")
        if os.path.exists(dest) and not force: saltados += 1; continue
        v = voz_de(s, es_gancho)
        await edge_tts.Communicate(t, v, rate=RATE).save(dest); hechos += 1
        print(f"  {v[6:-6]:7} {s}.mp3")
    print(f"{hechos} grabadas, {saltados} ya estaban, {len(frases)} frases")

asyncio.run(main())
