# -*- coding: utf-8 -*-
"""Comprueba que cada reader publicado esta COMPLETO, y escribe que niveles
puede ofrecer de verdad.

Regla del proyecto: lo que esta en vivo tiene que estar entero. No puede
haber un nivel que el alumno elige y se encuentra vacio o mudo — que es lo
que pasaba con el read-along de Treasure Island (solo sonaba en A2) y con
el C2 de los libros que no traen el texto original.

Un nivel se considera listo cuando tiene:
  a2/b1/b2/c1   su <libro>-data-<nivel>.js  Y todo el audio del read-along
  c2            su <libro>-original.js (ese nivel es leer el original)

Con --escribe deja el resultado en readers-levels.js, que es lo que el
lector usa para pintar el selector: asi no se ofrece nunca un nivel que no
existe, sin tener que acordarse de mantener una lista a mano.

    python _check_readers_audio.py            solo informa
    python _check_readers_audio.py --escribe  ademas actualiza readers-levels.js
"""
import ast, io, os, re, sys

AQUI = os.path.dirname(os.path.abspath(__file__))
LIBROS = ["attwn", "earnest", "tomsawyer", "princepauper", "treasureisland"]
NIVELES = ["a2", "b1", "b2", "c1"]


def lecturas(libro, nivel):
    """Los parrafos que el texto pide para el read-along, por capitulo."""
    f = os.path.join(AQUI, "%s-data-%s.js" % (libro, nivel))
    if not os.path.exists(f):
        return None
    s = io.open(f, encoding="utf-8").read()
    m = re.search(r"const READINGS = (\{.*?\n\})\s*;?\s*\n", s, re.S)
    if not m:
        return None
    try:
        R = ast.literal_eval(m.group(1))
    except Exception:
        return None
    out = {}
    for cap, v in R.items():
        # el formato varia entre libros: a veces es la lista de parrafos y
        # a veces un dict con la lista dentro
        if isinstance(v, dict):
            v = v.get("paras") or v.get("text") or v.get("parts") or []
        out[int(cap)] = len(v) if isinstance(v, (list, tuple)) else 0
    return out


def carpeta(libro, nivel):
    """Donde vive el audio de ese libro y nivel.

    ATTWN fue el primero y su B1 quedo en la raiz de attwn-audio/, no en una
    subcarpeta; los demas niveles y los demas libros usan
    <libro>-audio/<nivel>/. Esta escrito asi en gen_attwn_audio.py."""
    if libro == "attwn" and nivel == "b1":
        return os.path.join(AQUI, "attwn-audio")
    return os.path.join(AQUI, "%s-audio" % libro, nivel)


def mp3s(libro, nivel):
    d = carpeta(libro, nivel)
    if not os.path.isdir(d):
        return None
    por_cap = {}
    for n in os.listdir(d):
        m = re.match(r"ch(\d+)-p(\d+)\.mp3$", n)
        if m:
            por_cap[int(m.group(1))] = por_cap.get(int(m.group(1)), 0) + 1
    return por_cap


def completo(libro, nivel):
    """Un nivel esta listo si tiene texto Y todo su audio."""
    pide = lecturas(libro, nivel)
    if pide is None:
        return False
    hay = mp3s(libro, nivel)
    if hay is None:
        return False
    return all(hay.get(c, 0) >= n for c, n in pide.items() if n)


def niveles_reales():
    """Que puede ofrecer cada libro hoy."""
    out = {}
    for libro in LIBROS:
        ls = [n for n in NIVELES if completo(libro, n)]
        if os.path.exists(os.path.join(AQUI, "%s-original.js" % libro)):
            ls.append("c2")
        out[libro] = ls
    return out


CABECERA = """/* Que niveles ofrece cada reader — generado por _check_readers_audio.py.
 *
 * No se escribe a mano: un nivel solo entra aqui si tiene su texto Y todo
 * el audio del read-along. Asi el alumno no puede elegir un nivel que
 * luego esta vacio o mudo, que es lo que pasaba con el B2 de Treasure
 * Island y con el C2 de los libros que no traen el texto original.
 */
window.READER_LEVELS = {
"""


def escribe_niveles():
    d = niveles_reales()
    filas = ",\n".join("  %s: [%s]" % (k, ", ".join("'%s'" % x for x in v))
                       for k, v in sorted(d.items()))
    io.open(os.path.join(AQUI, "readers-levels.js"), "w",
            encoding="utf-8", newline="\n").write(CABECERA + filas + "\n};\n")
    return d


if __name__ == "__main__":
    problemas = 0
    for libro in LIBROS:
        print("=== %s ===" % libro)
        for nivel in NIVELES:
            pide = lecturas(libro, nivel)
            hay = mp3s(libro, nivel)
            if pide is None:
                print("   %-3s  sin texto en este nivel" % nivel)
                continue
            if hay is None:
                print("   %-3s  SIN AUDIO — %d capitulos sin sonido" % (nivel, len(pide)))
                problemas += 1
                continue
            faltan = []
            for cap in sorted(pide):
                if pide[cap] and hay.get(cap, 0) < pide[cap]:
                    faltan.append("ch%d (%d/%d)" % (cap, hay.get(cap, 0), pide[cap]))
            total_p = sum(pide.values())
            total_h = sum(hay.get(c, 0) for c in pide)
            if faltan:
                problemas += 1
                print("   %-3s  %3d/%3d parrafos — faltan: %s"
                      % (nivel, total_h, total_p, ", ".join(faltan[:6])))
            else:
                print("   %-3s  %3d/%3d parrafos  completo" % (nivel, total_h, total_p))

    print("")
    print("%d combinaciones libro/nivel con audio incompleto" % problemas)

    d = escribe_niveles() if "--escribe" in sys.argv else niveles_reales()
    print("")
    print("  lo que cada reader puede ofrecer hoy:")
    for k, v in sorted(d.items()):
        print("   %-16s %s" % (k, ", ".join(v) or "— nada completo —"))
    if "--escribe" in sys.argv:
        print("")
        print("  escrito readers-levels.js")
    sys.exit(1 if problemas else 0)
