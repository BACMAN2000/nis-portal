# Repara word-formation-app/data.json: los apóstrofes venían como el texto
# literal «\u0027» (barra + u0027) dentro de los valores JSON, y el arreglo en
# lote del 16-sep (reemplazo de texto sobre el archivo) dejó escapes «\'» que
# no existen en JSON. Se decodifica el original, se cambian en los VALORES y
# se vuelve a serializar. Uso: python tools/fase2/repara_wordform_json.py <original.json>
import json, re, sys
src = sys.argv[1]
s = open(src, encoding='utf-8').read()
d = json.loads(s)
n = [0]
PAT = re.compile('\\\\+u0027')          # una o más barras seguidas de u0027, ya decodificado
def fix(o):
    if isinstance(o, str):
        t = PAT.sub("'", o)
        if t != o: n[0] += 1
        return t
    if isinstance(o, list): return [fix(x) for x in o]
    if isinstance(o, dict): return {k: fix(v) for k, v in o.items()}
    return o
d2 = fix(d)
out = json.dumps(d2, ensure_ascii=False, separators=(', ', ': '))
json.loads(out)
open('C:/Projects/nis-portal/word-formation-app/data.json', 'w', encoding='utf-8', newline='').write(out)
print('valores corregidos:', n[0], '| JSON OK | bytes', len(out), '| u0027 restantes:', out.count('u0027'))
