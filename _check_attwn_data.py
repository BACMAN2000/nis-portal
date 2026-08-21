# -*- coding: utf-8 -*-
"""Valida attwn-data-<nivel>.js: extrae READINGS y comprueba estructura."""
import ast, re, sys
from pathlib import Path

level = sys.argv[1]
src = (Path(__file__).parent / f"attwn-data-{level}.js").read_text(encoding="utf-8")
m = re.search(r"const READINGS = (\{.*?\n\})\s*;?\s*\n", src, re.S)
r = ast.literal_eval(m.group(1))
paras = [len(v) for k, v in sorted(r.items())]
words = sum(len(p.split()) for v in r.values() for p in v)
print("caps:", sorted(r.keys()))
print("paras por cap:", paras)
print("palabras totales:", words)
print("titulos:", "Soldier Island" in src and "A message in a bottle" in src)
print("level tag:", f"level:'{level.upper()}'" in src)
print("iife:", src.rstrip().endswith("})();"))
