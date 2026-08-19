# -*- coding: utf-8 -*-
"""Genera word-wheel-u4-by-level.html a partir de word-wheel-u4.html.

Misma rueda, mismo motor, mismas 36 palabras clave — reagrupadas por nivel
MCER (A2/B1/B2/C1) en vez de por semana. Es la pieza que faltaba: hoy hay
la rueda de la unidad por semana (word-wheel-u4.html) y la rueda por nivel
con vocabulario general (word-wheel.html), pero no la de la unidad por nivel.

Clona el motor en vez de copiarlo a mano para que las mejoras que se hagan
en word-wheel-u4.html (rueda, botones, móvil, sonido) lleguen aquí con sólo
volver a ejecutar este script.

Uso:  python gen_u4_wheel_by_level.py
"""
import os, re, sys, io
try: sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception: pass

REPO = os.path.dirname(os.path.abspath(__file__))
SRC  = os.path.join(REPO, "word-wheel-u4.html")
DST  = os.path.join(REPO, "word-wheel-u4-by-level.html")

# Reparto de las 36 palabras de la unidad por nivel. Criterio: frecuencia,
# concreción y carga gramatical — FORGET e IMAGINE son léxico A2, pero aquí
# entran como tricky verb y verb + -ing, así que suben a B2.
LEVELS = [
    ("A2", "Elementary",         "Everyday words for feelings, advice and routines",
     ["NERVOUS", "EMOTION", "ADVICE", "SHOULD", "REASON", "POLITE", "ALERT", "ROUTINE", "PLENTY"]),
    ("B1", "Intermediate",       "Naming stress precisely, and hedging what you claim",
     ["PRESSURE", "RESTLESS", "BALANCE", "PERHAPS", "CERTAIN", "IMPROVE", "EXPLAIN", "ARTICLE", "SCREENS"]),
    ("B2", "Upper-Intermediate", "Verb patterns and the vocabulary of changing a habit",
     ["AGITATED", "CONSIDER", "IMAGINE", "FORGET", "PRACTISE", "PATTERN", "ADVISE", "RECOVER", "PODCAST"]),
    ("C1", "Advanced",           "Academic register, and the words a magazine editor uses",
     ["RESEARCH", "HEADLINE", "REGISTER", "CONCISE", "CLARITY", "CAPTION", "LONGING", "SEVERAL", "DESIRE"]),
]


def entries(src):
    """Devuelve {KEY: texto literal de su objeto}, con llaves/corchetes balanceados."""
    i = src.index("const DATA =")
    end = src.index("\n];", i)
    body, out = src[i:end], {}
    for m in re.finditer(r'\{key:"([A-Z]+)"', body):
        key, start = m.group(1), m.start()
        depth, k = 0, start
        while k < len(body):
            c = body[k]
            if c in "{[": depth += 1
            elif c in "}]":
                depth -= 1
                if depth == 0: break
            k += 1
        out[key] = body[start:k + 1]
    return out


def main():
    src = open(SRC, encoding="utf-8").read()
    ent = entries(src)
    print(f"palabras clave encontradas en el original: {len(ent)}")

    wanted = [k for _, _, _, ks in LEVELS for k in ks]
    missing = [k for k in wanted if k not in ent]
    extra   = [k for k in ent if k not in wanted]
    if missing: sys.exit(f"faltan en el original: {missing}")
    if extra:   sys.exit(f"quedaron sin repartir: {extra}")

    blocks = []
    for lv, sub, focus, keys in LEVELS:
        items = ",\n  ".join(ent[k] for k in keys)
        blocks.append(f'{{n:"{lv}",name:"{sub}",focus:"{focus}",levels:[\n  {items}\n]}}')
    data = "const DATA = [\n" + ",\n".join(blocks) + "\n];"

    # 1) sustituir el bloque DATA completo
    i = src.index("const DATA =")
    end = src.index("\n];", i) + len("\n];")
    out = src[:i] + data + src[end:]

    # 2) la UI ya no habla de semanas: el bloque ES el nivel
    swaps = [
        ('$("lvTitle").textContent="Week "+wk.n+" — "+wk.name;',
         '$("lvTitle").textContent="Level "+wk.n+" — "+wk.name;'),
        ('$("gTitle").textContent="Week "+DATA[wi].n+" · Level "+(li+1);',
         '$("gTitle").textContent="Level "+DATA[wi].n+" · Word "+(li+1);'),
        ("'<h3>Week '+wk.n+' — '+wk.name+'</h3>'",
         "'<h3>Level '+wk.n+' — '+wk.name+'</h3>'"),
        ("<title>Unit 4 · Mind Over Matter — Word Wheel</title>",
         "<title>Unit 4 · Mind Over Matter — Word Wheel by level (A2–C1)</title>"),
        # tarjeta de la portada: el número grande deja de ser la semana
        ("'<div class=\"num\">WEEK<b>'+wk.n+'</b></div>'+",
         "'<div class=\"num\">LEVEL<b>'+wk.n+'</b></div>'+"),
        # dentro de un nivel ya no hay "levels", hay palabras
        ("+wk.levels.length+' levels</span>'+",
         "+wk.levels.length+' words</span>'+"),
        ("<span>Mind Over Matter · 6 weeks · 36 levels</span>",
         "<span>Mind Over Matter · 4 CEFR levels · 36 words</span>"),
    ]
    for old, new in swaps:
        n = out.count(old)
        if n == 0: print(f"  AVISO: no se encontró → {old[:60]}")
        out = out.replace(old, new)
        print(f"  sustituido ×{n}: {old[:52]}")

    # 3) el progreso se guarda aparte del de la rueda por semanas
    out = out.replace('const SAVE="u4wheel_v1";', 'const SAVE="u4wheel_bylevel_v1";', 1)

    open(DST, "w", encoding="utf-8").write(out)

    print()
    for lv, sub, _, keys in LEVELS:
        print(f"  {lv} ({sub}): {len(keys)} palabras — {', '.join(keys)}")
    print(f"\nescrito: {os.path.basename(DST)}  ({os.path.getsize(DST)/1024:.0f} KB)")
    rest = re.findall(r"Week", out)
    print(f"referencias a 'Week' que quedan en el archivo: {len(rest)} (nombres de función internos)")


if __name__ == "__main__":
    main()
