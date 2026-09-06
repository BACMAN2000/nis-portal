# -*- coding: utf-8 -*-
"""Revisa los examenes de unidad antes de subirlos a la base.

    python exams/validate.py                 # todos
    python exams/validate.py g9-u34          # una carpeta

Comprueba lo que ya nos ha mordido antes:
  - que cada parte tenga el tipo y los campos que el motor sabe pintar
    (si se anade un tipo nuevo hay que anadir su rama al render);
  - que ninguna word formation acepte la palabra que se da en MAYUSCULAS,
    que es el fallo de los tres items de los mocks;
  - que las transformaciones caben en el limite de palabras del nivel
    (2-5 en B2, 3-6 en C1) contando la palabra clave;
  - que en las de opciones la respuesta no caiga siempre en la misma letra
    (en los Listening de los mocks el 57 % era la B);
  - que las de ordenar palabras usen exactamente las palabras dadas;
  - que exista el guion del listening y su mp3.
"""
import io, json, os, re, sys
from collections import Counter

try:
    sys.stdout.reconfigure(encoding='utf-8')
except Exception:
    pass

AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.dirname(AQUI)
AUDIO = os.path.join(RAIZ, 'exam-audio')

LIMITES = {'a2': (2, 4), 'b1': (2, 5), 'b2': (2, 5), 'c1': (3, 6)}
CAMPOS = {
    'mc':        ('items', ('q', 'opts', 'ok')),
    'tf':        ('items', ('q', 'ok')),
    'wf':        ('items', ('sent', 'root', 'accept')),
    'kt':        ('items', ('lead', 'key', 'accept')),
    'order':     ('items', ('words', 'answer')),
    'listening': ('items', ('kind',)),
    'writing':   ('tasks', ('task', 'range')),
}
norm = lambda s: re.sub(r'[^a-z ]', '', str(s).lower()).strip()
# "shouldn't" cuenta como una palabra y contiene la clave SHOULD: sin esto el
# apostrofe hacia saltar la comprobacion de la palabra clave en cada negativa.
CONTRA = {"n't": ' not', "'s": ' is', "'re": ' are', "'ve": ' have', "'ll": ' will', "'d": ' would'}


def palabras(s):
    s = str(s).lower()
    for a, b in CONTRA.items():
        s = s.replace(a, b)
    return norm(s).split()


def revisa(ruta):
    fallos, avisos = [], []
    d = json.load(io.open(ruta, encoding='utf-8'))
    nivel = d.get('level', '')
    lo, hi = LIMITES.get(nivel, (2, 5))
    tipos = [p.get('type') for p in d.get('parts', [])]
    for t in CAMPOS:
        if t not in tipos:
            fallos.append('falta la parte de tipo %s' % t)

    total = 0
    letras = Counter()
    for p in d.get('parts', []):
        t = p.get('type')
        if t not in CAMPOS:
            fallos.append('tipo desconocido: %s (el motor no sabe pintarlo)' % t)
            continue
        clave, obligatorios = CAMPOS[t]
        items = p.get(clave) or []
        if not items:
            fallos.append('parte %s sin %s' % (t, clave))
        for i, it in enumerate(items, 1):
            falta = [c for c in obligatorios if c not in it]
            if falta:
                fallos.append('%s #%d: falta %s' % (t, i, ', '.join(falta)))
                continue
            if t != 'writing':
                total += 1
            if t == 'mc':
                if not 0 <= it['ok'] < len(it['opts']):
                    fallos.append('mc #%d: ok fuera de rango' % i)
                else:
                    letras[it['ok']] += 1
                if len(set(it['opts'])) != len(it['opts']):
                    fallos.append('mc #%d: opciones repetidas' % i)
            if t == 'wf':
                raiz = norm(it['root'])
                for a in it['accept']:
                    if norm(a) == raiz:
                        fallos.append('wf #%d: acepta la palabra dada (%s)' % (i, it['root']))
            if t == 'kt':
                for a in it['accept']:
                    n = len(palabras(a))
                    if not lo <= n <= hi:
                        fallos.append('kt #%d: "%s" tiene %d palabras (limite %d-%d en %s)'
                                      % (i, a, n, lo, hi, nivel.upper()))
                if not any(norm(it['key']) in palabras(a) for a in it['accept']):
                    fallos.append('kt #%d: ninguna respuesta incluye la palabra clave %s' % (i, it['key']))
            if t == 'order':
                dadas = sorted(norm(w) for w in it['words'])
                puestas = sorted(norm(w) for w in it['answer'].split())
                if dadas != puestas:
                    fallos.append('order #%d: la respuesta no usa exactamente las palabras dadas' % i)
            if t == 'listening':
                if it['kind'] == 'mc':
                    if 'opts' not in it or 'ok' not in it:
                        fallos.append('listening #%d: mc sin opts/ok' % i)
                    else:
                        letras[it['ok']] += 1
                elif it['kind'] == 'gap':
                    if 'accept' not in it:
                        fallos.append('listening #%d: gap sin accept' % i)
                else:
                    fallos.append('listening #%d: kind desconocido %s' % (i, it['kind']))

    if not d.get('script', '').strip():
        fallos.append('sin guion de listening')
    mp3 = os.path.join(AUDIO, d.get('audio', ''))
    if not d.get('audio'):
        fallos.append('sin nombre de audio')
    elif not os.path.exists(mp3):
        avisos.append('todavia no existe el mp3 %s' % d.get('audio'))

    if letras:
        n = sum(letras.values())
        peor, cuantas = letras.most_common(1)[0]
        if cuantas / n > 0.45:
            avisos.append('la clave cae en la letra %s el %d %% de las veces (%d de %d)'
                          % ('ABCD'[peor], round(cuantas * 100 / n), cuantas, n))
    return total, fallos, avisos


def main():
    carpetas = sys.argv[1:] or [c for c in sorted(os.listdir(AQUI))
                                if os.path.isdir(os.path.join(AQUI, c))]
    malos = 0
    for c in carpetas:
        d = os.path.join(AQUI, c)
        for f in sorted(os.listdir(d)):
            if not f.endswith('.json'):
                continue
            total, fallos, avisos = revisa(os.path.join(d, f))
            estado = 'OK ' if not fallos else 'MAL'
            print('%s %s/%s  %d preguntas' % (estado, c, f, total))
            for x in fallos:
                print('     x %s' % x)
            for x in avisos:
                print('     ! %s' % x)
            malos += bool(fallos)
    print('\n%s' % ('Todo correcto.' if not malos else '%d archivo(s) con fallos.' % malos))
    sys.exit(1 if malos else 0)


if __name__ == '__main__':
    main()
