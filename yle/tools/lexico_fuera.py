# -*- coding: utf-8 -*-
"""Dice donde esta cada palabra que se sale de la lista del nivel.

El validador avisa de que un examen usa palabras que no estan en la word list
oficial, pero no dice donde, y sin eso no se puede arreglar: hay que ver la frase
entera para saber si basta cambiar la palabra o hay que rehacer la oracion. Esto
saca, por test, cada palabra con su ruta dentro del JSON y su contexto, y marca
las que estan en la clave "audio" —esas obligan a regenerar el mp3.

    python yle/tools/lexico_fuera.py starters          # los diez tests
    python yle/tools/lexico_fuera.py flyers 3          # solo el test 3
    python yle/tools/lexico_fuera.py movers --resumen  # solo el recuento
"""
import io, os, re, sys, json, glob

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(AQUI))
import validate as V

RAIZ = os.path.dirname(os.path.dirname(AQUI))
# claves que no son texto que el nino lea u oiga
SALTAR = {'type', 'image', 'images', 'id', 'file', 'src', 'path', 'color', 'zone', 'zones'}
VOCES = {'R', 'F', 'M', 'Fch', 'Mch'}


def rutas(o, pre=''):
    if isinstance(o, str):
        yield pre, o
    elif isinstance(o, list):
        # un evento de audio es ['R', 'Part One…'] o ['pause', 2]: la etiqueta de
        # voz no se oye, solo el texto que va detras
        if len(o) == 2 and isinstance(o[0], str) and (o[0] in VOCES or o[0] == 'pause'):
            if o[0] != 'pause' and isinstance(o[1], str): yield pre + '[1]', o[1]
            return
        for i, x in enumerate(o):
            yield from rutas(x, '%s[%d]' % (pre, i))
    elif isinstance(o, dict):
        for k, v in o.items():
            if k in SALTAR: continue
            yield from rutas(v, '%s.%s' % (pre, k) if pre else k)


def fuera_de(t, level):
    """[(palabra, ruta, frase)] ordenado por palabra."""
    vocab = V.vocabulario(level)
    out = []
    for raiz in ('listening', 'rw', 'speaking', 'audio'):
        for ruta, txt in rutas(t.get(raiz) or {}, raiz):
            for m in re.finditer(r"[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ'’]*", txt):
                w = m.group(0)
                lw = w.lower().strip("'’").replace('’', "'")
                if len(lw) <= 1 or lw in vocab or w[0].isupper() or lw.isdigit() or lw == 'ex': continue
                if V.bases(lw) & vocab: continue
                ini = max(0, m.start() - 45)
                out.append((lw, ruta, ('…' if ini else '') + txt[ini:m.end() + 40].replace('\n', ' ')))
    return sorted(set(out))


def main():
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    level = args[0] if args else 'starters'
    solo = int(args[1]) if len(args) > 1 else None
    resumen = '--resumen' in sys.argv
    total, con_audio = set(), set()
    for f in sorted(glob.glob(os.path.join(RAIZ, 'yle', level, 'test-*.json'))):
        t = json.load(io.open(f, encoding='utf-8'))
        if solo and t['number'] != solo: continue
        fuera = fuera_de(t, level)
        if not fuera: continue
        pal = {w for w, _, _ in fuera}
        total |= pal
        aud = {w for w, r, _ in fuera if r.startswith('audio')}
        con_audio |= aud
        print('\n=== Test %d · %s — %d palabras%s' % (t['number'], t.get('theme', ''), len(pal),
              ' (%d tocan el audio)' % len(aud) if aud else ''))
        if resumen:
            print('   ', ', '.join(sorted(pal)))
            continue
        for w, r, ctx in fuera:
            print('  %-16s %-34s %s%s' % (w, r[:34], '🔊 ' if r.startswith('audio') else '', ctx[:96]))
    print('\n%s: %d palabras distintas, %d de ellas en el audio' % (level, len(total), len(con_audio)))


if __name__ == '__main__':
    main()
