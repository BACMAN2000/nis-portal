# -*- coding: utf-8 -*-
"""Audio de Listening de los tests YLE (Starters / Movers / Flyers) con el
formato del examen: examinadora (R) que da las consignas, adultos (F/M) y
ninos (Fch/Mch), pausas oficiales y cada parte repetida. Mismas voces y mismo
montaje que el audio v2 de Flyers (Edge TTS + ffmpeg), pero el guion viene
ya repartido por voces dentro del JSON del test (clave "audio").

    python yle/tools/gen_yle_audio.py starters 1          # test 1 de Starters
    python yle/tools/gen_yle_audio.py starters all
    python yle/tools/gen_yle_audio.py starters 1 --report # duracion por parte, sin generar

Formato de "audio" en el test: {"p1": [["R","Part One. …"], ["pause", 2], ["Mch","…"], …], "p2": …}
La repeticion ("Now listen again.") se anade sola: el cuerpo de la parte (todo lo
que va despues de la consigna "Now you listen…") se pone dos veces.
Salida: <repo>/yle-audio/<level>/test_NN_partP.mp3 (64 kbps mono).
"""
import os, sys, re, json, hashlib, asyncio, subprocess

AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.dirname(os.path.dirname(AQUI))          # nis-portal
CACHE = os.path.join(AQUI, '_tts_cache')

# En Starters se habla mas despacio que en Flyers (Handbook: "speakers speak moderately slowly").
VOICES = {
  'starters': {
    'R':   ('en-GB-SoniaNeural', '-14%', '+0Hz'),
    'F':   ('en-GB-LibbyNeural', '-10%', '+0Hz'),
    'M':   ('en-GB-ThomasNeural','-10%', '+0Hz'),
    'Fch': ('en-GB-MaisieNeural','-6%',  '+0Hz'),
    'Mch': ('en-GB-RyanNeural',  '-4%',  '+20Hz'),
  },
  'movers': {
    'R':   ('en-GB-SoniaNeural', '-12%', '+0Hz'),
    'F':   ('en-GB-LibbyNeural', '-6%',  '+0Hz'),
    'M':   ('en-GB-ThomasNeural','-6%',  '+0Hz'),
    'Fch': ('en-GB-MaisieNeural','-3%',  '+0Hz'),
    'Mch': ('en-GB-RyanNeural',  '+0%',  '+20Hz'),
  },
  'flyers': {
    'R':   ('en-GB-SoniaNeural', '-10%', '+0Hz'),
    'F':   ('en-GB-LibbyNeural', '-4%',  '+0Hz'),
    'M':   ('en-GB-ThomasNeural','-4%',  '+0Hz'),
    'Fch': ('en-GB-MaisieNeural','+0%',  '+0Hz'),
    'Mch': ('en-GB-RyanNeural',  '+2%',  '+20Hz'),
  },
}
P_LINEA = 0.5      # entre replicas
P_REPETIR = 1.5    # antes de "Now listen again"


def eventos(parte, voces):
    """[[sp, txt] | ['pause', s]] -> lista de eventos con la repeticion metida."""
    evs = []
    for x in parte:
        if x[0] == 'pause': evs.append(('pause', float(x[1])))
        else:
            assert x[0] in voces, 'voz desconocida %r' % x[0]
            evs.append(('say', x[0], re.sub(r'\s+', ' ', x[1]).strip())); evs.append(('pause', P_LINEA))
    # cuerpo = desde la consigna "Now you listen…" (excluida) hasta el "Now listen again" (excluido)
    ini = next((i for i, e in enumerate(evs) if e[0] == 'say' and re.search(r'\bNow (you )?listen\b', e[2])), None)
    fin = next((i for i, e in enumerate(evs) if e[0] == 'say' and re.search(r'Now listen again', e[2], re.I)), len(evs))
    if ini is None: return evs
    cuerpo = evs[ini + 1:fin]
    return evs[:fin] + [('pause', P_REPETIR), ('say', 'R', 'Now listen again.'), ('pause', 1.0)] + cuerpo + [('pause', 1.0), ('say', 'R', 'That is the end of the part.'), ('pause', 1.0)]


def seg_path(sp, txt, voces):
    v, r, pt = voces[sp]
    h = hashlib.md5((v + r + pt + txt).encode('utf-8')).hexdigest()[:16]
    return os.path.join(CACHE, '%s_%s.mp3' % (sp, h))


async def tts_one(sp, txt, path, sem, voces):
    import edge_tts
    v, r, pt = voces[sp]
    async with sem:
        for intento in range(4):
            try:
                await edge_tts.Communicate(txt, v, rate=r, pitch=pt).save(path)
                if os.path.getsize(path) > 1000: return
            except Exception:
                if intento == 3: raise
                await asyncio.sleep(2 * (intento + 1))


async def genera_segmentos(evs, voces):
    os.makedirs(CACHE, exist_ok=True)
    sem = asyncio.Semaphore(4); tareas, vistos = [], set()
    for e in evs:
        if e[0] != 'say': continue
        p = seg_path(e[1], e[2], voces)
        if p in vistos or (os.path.exists(p) and os.path.getsize(p) > 1000): continue
        vistos.add(p); tareas.append(tts_one(e[1], e[2], p, sem, voces))
    if tareas: await asyncio.gather(*tareas)


def silencio(seg):
    os.makedirs(CACHE, exist_ok=True)
    p = os.path.join(CACHE, 'sil_%.1f.mp3' % seg)
    if not os.path.exists(p):
        subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-f', 'lavfi', '-i', 'anullsrc=r=24000:cl=mono',
                        '-t', str(seg), '-c:a', 'libmp3lame', '-b:a', '48k', p], check=True)
    return p


def monta(evs, out, voces):
    lista = os.path.join(CACHE, '_lista.txt')
    with open(lista, 'w', encoding='utf-8') as f:
        for e in evs:
            p = seg_path(e[1], e[2], voces) if e[0] == 'say' else silencio(e[1])
            f.write("file '%s'\n" % p.replace('\\', '/'))
    os.makedirs(os.path.dirname(out), exist_ok=True)
    subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', lista,
                    '-c:a', 'libmp3lame', '-b:a', '64k', '-ar', '44100', '-ac', '1', out], check=True)


def dur(path):
    r = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', path], capture_output=True, text=True)
    return float(r.stdout.strip() or 0)


def genera_test(level, n, report=False, out_dir=None):
    voces = VOICES[level]
    t = json.load(open(os.path.join(RAIZ, 'yle', level, 'test-%02d.json' % n), encoding='utf-8'))
    out_dir = out_dir or os.path.join(RAIZ, 'yle-audio', level)
    for p, parte in sorted(t.get('audio', {}).items()):
        evs = eventos(parte, voces)
        n_say = sum(1 for e in evs if e[0] == 'say'); n_pause = sum(e[1] for e in evs if e[0] == 'pause')
        if report:
            print('  %s: %d frases, %.0f s de pausas' % (p, n_say, n_pause)); continue
        asyncio.run(genera_segmentos(evs, voces))
        out = os.path.join(out_dir, 'test_%02d_part%s.mp3' % (n, p[1:]))
        monta(evs, out, voces)
        print('  %s -> %s (%.0f s)' % (p, os.path.relpath(out, RAIZ), dur(out)))


if __name__ == '__main__':
    level = sys.argv[1]; que = sys.argv[2]; report = '--report' in sys.argv
    nums = sorted(int(re.search(r'(\d+)', f).group(1)) for f in os.listdir(os.path.join(RAIZ, 'yle', level)) if re.match(r'test-\d+\.json$', f)) if que == 'all' else [int(que)]
    for n in nums:
        print('== %s test %d' % (level, n)); genera_test(level, n, report)
