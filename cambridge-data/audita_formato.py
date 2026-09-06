# -*- coding: utf-8 -*-
"""Comprueba que todos los examenes de la casa trabajan con el MISMO formato,
que es al que estan acostumbrados los alumnos (el de los MOCKS):

  1. los huecos de un texto se pulsan y las alternativas salen ahi mismo
     (nada de desplegables a lo ancho ni listas de opciones debajo del texto);
  2. cada tipo de ejercicio que traen los datos se pinta de verdad;
  3. los ejercicios de Listening tienen su grabacion.

    python cambridge-data/audita_formato.py
"""
import io, json, os, re, subprocess, glob

AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.dirname(AQUI)
BIEN, MAL = [], []


def mira(nombre, condicion, detalle=''):
    (BIEN if condicion else MAL).append('%-52s %s' % (nombre, detalle))


# ---------- 1. el hueco pulsable en los tres motores ----------
MOTORES = {
    'examenes YLE (yle-practice.html)': os.path.join(RAIZ, 'yle-practice.html'),
    'curso Fun for Nordic (engine)': os.path.join(RAIZ, 'nis-fun', 'engine', 'index.html'),
    'Main Suite (cambridge-level.html)': os.path.join(RAIZ, 'cambridge-level.html'),
}
for nombre, ruta in MOTORES.items():
    t = io.open(ruta, encoding='utf-8').read() if os.path.exists(ruta) else ''
    mira(nombre + ' · hueco pulsable', 'gapw' in t and 'gapm' in t)
    mira(nombre + ' · barra en fila con X', '.gapx{' in t)
    # solo cuenta el desplegable dentro de un TEXTO (cloze o dialogo); en las listas
    # de preguntas —unir con lineas, escribir la letra, si/no— el <select> esta bien
    sueltos = []
    for tipo in ('mc_cloze', 'mc_cloze_copy', 'gapped_text_title', 'dialogue_mc8', 'gap_text'):
        i = t.find("'%s'" % tipo)
        if i > 0 and '<select' in t[i:i + 1800]:
            sueltos.append(tipo)
    mira(nombre + ' · sin desplegable dentro del texto', not sueltos, 'todavia lo usan: %s' % sueltos)

# ---------- 2. tipos de ejercicio que el examen de secundaria sabe pintar ----------
cam = io.open(os.path.join(RAIZ, 'cambridge-level.html'), encoding='utf-8').read()
pinta = set(re.findall(r"ex\.type==='([a-z]+)'", cam))
for lv in ('ket', 'pet', 'fce', 'cae', 'cpe'):
    f = os.path.join(AQUI, 'cambridge-%s.js' % lv)
    if not os.path.exists(f):
        continue
    tipos = set(re.findall(r'\{type:"([a-z_]+)"', io.open(f, encoding='utf-8').read()))
    faltan = sorted(t for t in tipos if t not in pinta and t != 'mc')
    mira('%s · todos sus tipos se pintan' % lv.upper(), not faltan, 'sin pintar: %s' % faltan)

# ---------- 3. audio ----------
falta_audio = []
for lv in ('ket', 'pet', 'fce', 'cae', 'cpe'):
    f = os.path.join(AQUI, 'cambridge-%s.js' % lv)
    if not os.path.exists(f):
        continue
    js = subprocess.run(['node', '-e',
                         'const src=require("fs").readFileSync(process.argv[1],"utf8");'
                         'const CAM=new Function("window",src+"\\n;return CAM_%s;")({});'
                         'process.stdout.write(JSON.stringify(CAM.lessons||[]))' % lv.upper(), f],
                        capture_output=True, text=True, encoding='utf-8')
    for ti, t in enumerate(json.loads(js.stdout or '[]')):
        for ei, ex in enumerate(t.get('exercises') or []):
            if ex.get('tl') != 'Listening':
                continue
            mp3 = os.path.join(RAIZ, 'cambridge-audio', lv, 't%02d-e%d.mp3' % (ti + 1, ei + 1))
            if not os.path.exists(mp3):
                falta_audio.append('%s t%02d-e%d' % (lv, ti + 1, ei + 1))
mira('Main Suite · Listening con grabacion', not falta_audio, '%d sin mp3' % len(falta_audio))

curso_falta = []
for f in sorted(glob.glob(os.path.join(RAIZ, 'nis-fun', 'content', '*', 'unit-*.json'))):
    u = json.load(io.open(f, encoding='utf-8'))
    for a in (u.get('activities') or []):
        if a.get('audio') and not os.path.exists(os.path.join(RAIZ, 'nis-fun', 'audio', *a['audio'].split('/'))):
            curso_falta.append(a['audio'])
mira('Curso · Listening con grabacion', not curso_falta, '%d sin mp3' % len(curso_falta))

yle_falta = []
for lv in ('starters', 'movers', 'flyers'):
    idx = os.path.join(RAIZ, 'yle', lv, 'index.json')
    if not os.path.exists(idx):
        continue
    for t in json.load(io.open(idx, encoding='utf-8')):
        for p in range(1, 6):
            mp3 = os.path.join(RAIZ, 'yle-audio', lv, 'test_%02d_part%d.mp3' % (t['number'], p))
            d = json.load(io.open(os.path.join(RAIZ, 'yle', lv, 'test-%02d.json' % t['number']), encoding='utf-8'))
            if ('p%d' % p) in (d.get('listening') or {}) and not os.path.exists(mp3):
                yle_falta.append('%s t%02d p%d' % (lv, t['number'], p))
mira('Examenes YLE · Listening con grabacion', not yle_falta, '%d sin mp3' % len(yle_falta))

print('=' * 74)
print('FORMATO DE LOS EXAMENES — %d comprobaciones' % (len(BIEN) + len(MAL)))
print('\n--- bien: %d' % len(BIEN))
for x in BIEN:
    print('   ✓ ' + x.strip())
print('\n--- a revisar: %d' % len(MAL))
for x in MAL:
    print('   ✗ ' + x)
