"""Valida los temas del Grammar Lab (content/<level>/grammar/*.json).

Uso:  python tools/grammar-lab/valida.py [b2f|c1a|ruta.json ...]
Sin argumentos valida los dos niveles. Sale con 1 si hay errores.
"""
import json, os, re, sys, glob, collections

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
DIAG = {"timeline", "formula", "contrast", "transform", "map", "scale"}
TONES = {"kw", "a", "b", "c", "arrow"}
GRADE = re.compile(r"\b(grade|g)\s?\d{1,2}\b|\bgrade\b", re.I)
HTML_OK = re.compile(r"</?(b|i)>")
HTML_ANY = re.compile(r"<[^>]+>")


def textos(o):
    if isinstance(o, str):
        yield o
    elif isinstance(o, dict):
        for v in o.values():
            yield from textos(v)
    elif isinstance(o, list):
        for v in o:
            yield from textos(v)


def valida(path):
    err, warn = [], []
    try:
        d = json.load(open(path, encoding="utf-8"))
    except Exception as e:
        return [f"JSON invalido: {e}"], []
    nombre = os.path.splitext(os.path.basename(path))[0]
    if d.get("id") != nombre:
        err.append(f"id '{d.get('id')}' != archivo '{nombre}'")
    for k in ["id", "level", "area", "title", "tagline", "cefr", "exam", "why", "diagrams", "form", "use", "watch_out", "dialogue", "practice", "summary"]:
        if k not in d:
            err.append(f"falta '{k}'")
    if err:
        return err, warn
    if d["level"] not in ("b2f", "c1a"):
        err.append("level debe ser b2f o c1a")
    if len(d.get("tagline", "")) > 110:
        warn.append("tagline > 110 chars")
    # diagramas
    dg = d["diagrams"]
    if not (2 <= len(dg) <= 3):
        err.append(f"diagrams: {len(dg)} (2-3)")
    for i, g in enumerate(dg):
        t = g.get("type")
        if t not in DIAG:
            err.append(f"diagram {i}: tipo '{t}' desconocido")
            continue
        if t == "timeline":
            marks = g.get("marks", [])
            if not (2 <= len(marks) <= 4):
                err.append(f"diagram {i} timeline: {len(marks)} marks (2-4)")
            for m in marks:
                if m.get("at") not in ("before-past", "past", "now", "future"):
                    err.append(f"diagram {i} timeline: at='{m.get('at')}'")
            for a in g.get("arrows", []):
                if not (isinstance(a, list) and len(a) == 3 and all(isinstance(x, int) for x in a[:2]) and 0 <= a[0] < len(marks) and 0 <= a[1] < len(marks)):
                    err.append(f"diagram {i} timeline: arrow {a} invalida")
        elif t == "formula":
            parts = g.get("parts", [])
            if len(parts) < 2:
                err.append(f"diagram {i} formula: {len(parts)} parts")
            for p in parts:
                if p.get("tone") not in TONES:
                    err.append(f"diagram {i} formula: tone '{p.get('tone')}'")
        elif t == "contrast":
            cols = g.get("columns", [])
            rows = g.get("rows", [])
            if not (2 <= len(cols) <= 3):
                err.append(f"diagram {i} contrast: {len(cols)} columns")
            if not (3 <= len(rows) <= 6):
                err.append(f"diagram {i} contrast: {len(rows)} rows (3-6)")
            for r in rows:
                if len(r.get("cells", [])) != len(cols):
                    err.append(f"diagram {i} contrast: fila '{r.get('label')}' con {len(r.get('cells', []))} celdas")
        elif t == "transform":
            for k in ("before", "after"):
                if not (isinstance(g.get(k), dict) and g[k].get("text")):
                    err.append(f"diagram {i} transform: falta {k}.text")
                else:
                    for h in g[k].get("hl", []):
                        if h.lower() not in g[k]["text"].lower():
                            err.append(f"diagram {i} transform: '{h}' no esta en {k}.text")
            if not g.get("steps"):
                err.append(f"diagram {i} transform: sin steps")
        elif t == "map":
            br = g.get("branches", [])
            if not (3 <= len(br) <= 6):
                err.append(f"diagram {i} map: {len(br)} branches (3-6)")
            for b in br:
                if not b.get("items"):
                    err.append(f"diagram {i} map: rama '{b.get('label')}' sin items")
        elif t == "scale":
            it = g.get("items", [])
            if len(it) < 3:
                err.append(f"diagram {i} scale: {len(it)} items (>=3)")
            for x in it:
                if not (isinstance(x.get("pct"), (int, float)) and 0 <= x["pct"] <= 100):
                    err.append(f"diagram {i} scale: pct de '{x.get('label')}'")
    # forma
    f = d["form"]
    parts = f.get("formula", [])
    if len(parts) < 2:
        err.append("form.formula con menos de 2 bloques")
    for p in parts:
        if p.get("tone") not in TONES:
            err.append(f"form.formula: tone '{p.get('tone')}'")
    tb = f.get("table")
    if tb:
        n = len(tb.get("head", []))
        for r in tb.get("rows", []):
            if len(r) != n:
                err.append("form.table: fila con distinto numero de celdas")
    # usos
    usos = d["use"]
    if not (3 <= len(usos) <= 4):
        err.append(f"use: {len(usos)} puntos (3-4)")
    nex = sum(len(u.get("examples", [])) for u in usos)
    if not (8 <= nex <= 12):
        err.append(f"use: {nex} ejemplos en total (8-12)")
    for u in usos:
        for e in u.get("examples", []):
            if not e.get("text"):
                err.append("use: ejemplo sin text")
            elif "<b>" not in e["text"]:
                warn.append(f"ejemplo sin <b>: {e['text'][:50]}")
    # errores tipicos
    wo = d["watch_out"]
    if not (4 <= len(wo) <= 6):
        err.append(f"watch_out: {len(wo)} (4-6)")
    for w in wo:
        for k in ("wrong", "right", "why"):
            if not w.get(k):
                err.append(f"watch_out sin '{k}'")
    # dialogo
    dl = d["dialogue"]
    lines = dl.get("lines", [])
    if not (8 <= len(lines) <= 12):
        err.append(f"dialogue: {len(lines)} lineas (8-12)")
    if not dl.get("title") or not dl.get("context"):
        err.append("dialogue sin title/context")
    negritas = sum(l.get("text", "").count("<b>") for l in lines)
    if negritas < 5:
        err.append(f"dialogue: la estructura marcada con <b> solo {negritas} veces (>=5)")
    hablantes = {l.get("speaker") for l in lines}
    if len(hablantes) < 2:
        err.append("dialogue: menos de 2 hablantes")
    # practica
    pr = d["practice"]
    tipos = [p.get("type") for p in pr]
    for t, minimo in (("mc", 6), ("gap", 6), ("transform", 5)):
        if t not in tipos:
            err.append(f"practice: falta bloque '{t}'")
    for p in pr:
        t = p.get("type")
        items = p.get("items", [])
        if not p.get("instructions"):
            err.append(f"practice {t}: sin instructions")
        if t == "mc":
            if len(items) < 6:
                err.append(f"practice mc: {len(items)} items (>=6)")
            letras = collections.Counter()
            for it in items:
                ops = it.get("options", [])
                if not (2 <= len(ops) <= 4):
                    err.append("practice mc: item con opciones fuera de 2-4")
                a = it.get("answer")
                if not (isinstance(a, int) and 0 <= a < len(ops)):
                    err.append(f"practice mc: answer invalido en '{it.get('sentence', '')[:40]}'")
                else:
                    letras[a] += 1
                if "___" not in it.get("sentence", ""):
                    err.append(f"practice mc: sin ___ en '{it.get('sentence', '')[:40]}'")
            if items and max(letras.values()) > len(items) / 2:
                err.append(f"practice mc: sesgo de clave {dict(letras)}")
        elif t == "gap":
            if len(items) < 6:
                err.append(f"practice gap: {len(items)} items (>=6)")
            for it in items:
                if "___" not in it.get("sentence", ""):
                    err.append(f"practice gap: sin ___ en '{it.get('sentence', '')[:40]}'")
                if not it.get("answers"):
                    err.append("practice gap: item sin answers")
        elif t == "transform":
            if len(items) < 5:
                err.append(f"practice transform: {len(items)} items (>=5)")
            for it in items:
                for k in ("first", "key", "answers"):
                    if not it.get(k):
                        err.append(f"practice transform: item sin '{k}'")
                if it.get("key") and it["key"] != it["key"].upper():
                    warn.append(f"transform: key '{it['key']}' no va en mayusculas")
                for a in it.get("answers", []):
                    n = len(a.split())
                    if not (2 <= n <= 5):
                        warn.append(f"transform: respuesta de {n} palabras: '{a}'")
                    if it.get("key") and it["key"].lower() not in a.lower():
                        warn.append(f"transform: la respuesta '{a}' no contiene la clave '{it['key']}'")
        else:
            err.append(f"practice: tipo '{t}' desconocido")
    sm = d["summary"]
    if not (3 <= len(sm) <= 5):
        err.append(f"summary: {len(sm)} (3-5)")
    # texto: grados y HTML
    for t in textos(d):
        if GRADE.search(t):
            err.append(f"menciona un grado: '{t[:70]}'")
        for tag in HTML_ANY.findall(t):
            if not HTML_OK.fullmatch(tag):
                err.append(f"HTML no permitido {tag} en '{t[:50]}'")
    return err, warn


def main():
    args = sys.argv[1:] or ["b2f", "c1a"]
    paths = []
    for a in args:
        if a.endswith(".json"):
            paths.append(a)
        else:
            paths += sorted(glob.glob(os.path.join(ROOT, "content", a, "grammar", "*.json")))
    paths = [p for p in paths if os.path.basename(p) != "index.json"]
    total_err = 0
    for p in paths:
        err, warn = valida(p)
        rel = os.path.relpath(p, ROOT)
        if err or warn:
            print(f"== {rel}: {len(err)} errores, {len(warn)} avisos")
            for e in err:
                print("   ERROR", e)
            for w in warn:
                print("   aviso", w)
        else:
            print(f"ok {rel}")
        total_err += len(err)
    print(f"\n{len(paths)} temas · {total_err} errores")
    sys.exit(1 if total_err else 0)


if __name__ == "__main__":
    main()
