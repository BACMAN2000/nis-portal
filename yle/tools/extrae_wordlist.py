# -*- coding: utf-8 -*-
"""Extrae la lista de palabras YLE 2025 del PDF oficial de Cambridge.

Fuente: 506166-starters-movers-flyers-word-list-2025.pdf, paginas 23-30
("Pre A1 Starters, A1 Movers and A2 Flyers alphabetic vocabulary list"), donde
cada entrada lleva su nivel al final: S = Starters, M = Movers, F = Flyers.
Se lee linea a linea del layout (cuatro columnas por pagina), no del texto
plano, que fusionaba la marca de nivel con la entrada siguiente
("a.m. (for time) F" + "about prep S" -> "a.m. f about"), y se vuelven a unir
las entradas que el PDF parte en dos lineas.

Control: las tres listas A-Z por nivel (paginas 4-16) tienen que dar el mismo
conjunto de palabras.

    python extrae.py [ruta del pdf]   ->  wordlist-2025.json + _az_control.json
"""
import re, json, sys, io
import pymupdf

PDF = sys.argv[1] if len(sys.argv) > 1 else r'C:\Projects\yle-oficial\506166-starters-movers-flyers-word-list-2025.pdf'
COMBINADA = range(22, 30)          # paginas 23-30 (0-based)
AZ = {'starters': range(3, 7), 'movers': range(7, 11), 'flyers': range(11, 16)}
NIVEL = {'S': 'starters', 'M': 'movers', 'F': 'flyers'}
# 'title' no esta en la clave del PDF pero se usa igual: "Mr title S"
ETIQUETAS = {'adj', 'adv', 'conj', 'det', 'dis', 'excl', 'int', 'n', 'poss', 'prep', 'pron', 'v', 'w', 'title'}
FUERA = re.compile(r'^(\d+$|[A-Z]$|Grammatical key|adj\s+adjective|Pre A1|A1 Movers|A2 Flyers|Numbers|Names|Candidates|First appears|adjective|adverb|conjunction|determiner|discourse|exclamation|interrogative|noun|possessive|preposition|pronoun|verb)\b')
FIN = re.compile(r'\s[SMF]$')
GRAM = r'(?:adj|adv|conj|det|dis|excl|int|n|poss|prep|pron|v|w|title)'
SEC = (GRAM + r'(?:(?:\s*\+\s*|\s+)' + GRAM + r')*'
       + r'(?:\s+of\s+(?:place|time)(?:\s*\+\s*(?:place|time))*)?')


def lineas(doc, paginas, unir=False):
    """Las lineas de texto, bloque a bloque. Con unir=True, una entrada que el
    PDF parte en dos ('left (as in direction) adj +' / 'n F') se junta hasta
    que termina en su marca de nivel."""
    for i in paginas:
        buf = ''
        for b in doc[i].get_text('dict')['blocks']:
            if b['type'] != 0:
                continue
            for l in b['lines']:
                t = ''.join(s['text'] for s in l['spans'])
                t = t.replace('\ufeff', '').replace('\u00a0', ' ').strip()
                if not t:
                    continue
                if not unir:
                    yield i + 1, t
                    continue
                if FUERA.match(t) and not buf:
                    yield i + 1, t
                    continue
                buf = (buf + ' ' + t).strip()
                if FIN.search(buf):
                    yield i + 1, buf
                    buf = ''
        if buf:
            yield i + 1, buf


def limpia(palabra):
    """Quita la parte gramatical, que siempre es una secuencia de etiquetas
    unidas por '+' fuera de parentesis: al final ('wash n + v' -> 'wash') o
    justo antes de una aclaracion ('file n (as in ...)' -> 'file (as in ...)').
    Lo que va entre parentesis es parte de la entrada oficial y se conserva:
    'biscuit (US cookie)', 'fish (s + pl)'."""
    w = re.sub(r'\s+' + SEC + r'$', '', palabra.strip())
    w = re.sub(r'\s+' + SEC + r'\s+(?=\()', ' ', w)
    return w.strip(' ,;+')


def parse(doc):
    palabras, raros = {}, []
    for pag, t in lineas(doc, COMBINADA, unir=True):
        if FUERA.match(t):
            continue
        m = re.match(r'^(.*?)\s+([SMF])$', t)
        w = limpia(m.group(1)) if m else ''
        if not m or not w:
            raros.append((pag, t))
            continue
        palabras.setdefault(w.lower(), (w, NIVEL[m.group(2)]))
    return palabras, raros


def parse_az(doc):
    """Las tres listas A-Z por nivel, solo como control."""
    out = {}
    for nivel, paginas in AZ.items():
        s, buf = set(), ''
        for pag, t in lineas(doc, paginas):
            if FUERA.match(t):
                continue
            w = limpia(t)
            if w and not FUERA.match(w):
                s.add(w.lower())
        out[nivel] = s
    return out


def main():
    doc = pymupdf.open(PDF)
    palabras, raros = parse(doc)
    az = parse_az(doc)

    salida = {k: [] for k in ('starters', 'movers', 'flyers')}
    for _, (w, nivel) in palabras.items():
        salida[nivel].append(w)
    for k in salida:
        salida[k] = sorted(set(salida[k]), key=lambda x: x.lower())

    print('COMBINADA (paginas 23-30):', {k: len(v) for k, v in salida.items()},
          'total', sum(len(v) for v in salida.values()))
    print('A-Z por nivel (control) :', {k: len(v) for k, v in az.items()},
          'total', sum(len(v) for v in az.values()))
    if raros:
        print('\nlineas que no pude leer (%d):' % len(raros))
        for pag, t in raros[:30]:
            print('   p%-3d %r' % (pag, t))
    json.dump(salida, io.open('wordlist-2025.json', 'w', encoding='utf-8'),
              ensure_ascii=False, indent=1, sort_keys=True)
    json.dump({k: sorted(v) for k, v in az.items()},
              io.open('_az_control.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)


if __name__ == '__main__':
    main()
