"""Valida los temas del Grammar Lab (content/<level>/grammar/*.json).

Uso:  python tools/grammar-lab/valida.py [a1|ket|pet|b2f|c1a|ruta.json ...]
Sin argumentos valida los dos niveles. Sale con 1 si hay errores.
"""
import json, os, re, sys, glob, collections

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
DIAG = {"timeline", "formula", "contrast", "transform", "map", "scale", "blocks", "steps", "spelling"}
KIDS = {"blocks", "steps", "spelling"}          # los diagramas de los niveles inferiores
ROLES = {"subj", "aux", "verb", "obj", "neg", "time", "place", "kw", "x"}
# practica exigida por nivel: tipo -> minimo de items
PRACTICA = {"a1": (("mc", 6), ("gap", 6), ("order", 5), ("spot", 6)),
            "ket": (("mc", 6), ("gap", 6), ("order", 5), ("spot", 6)),
            "pet": (("mc", 6), ("gap", 6), ("order", 5), ("transform", 5)),
            "b2f": (("mc", 6), ("gap", 6), ("transform", 5)),
            "c1a": (("mc", 6), ("gap", 6), ("transform", 5))}
INFERIOR = ("a1", "ket", "pet")
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


def encaja(piezas, frase):
    """Las piezas, en algun orden, forman la frase (con o sin espacio antes de . ? !)."""
    def paso(resto, libres):
        resto = resto.lstrip(" ")
        if not resto:
            return not libres
        for i, w in enumerate(libres):
            if resto.startswith(w) and paso(resto[len(w):], libres[:i] + libres[i + 1:]):
                return True
        return False
    return paso(frase, list(piezas))


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
    if d["level"] not in ("a1", "ket", "pet", "b2f", "c1a"):
        err.append("level debe ser a1, ket, pet, b2f o c1a")
        return err, warn
    kids = d["level"] in INFERIOR
    if kids:
        for k in ("hook", "remember", "l1", "can_do"):
            if k not in d:
                err.append(f"falta '{k}' (obligatorio en {d['level']})")
        if err:
            return err, warn
        if d.get("cefr") not in {"a1": ("A1",), "ket": ("A2",), "pet": ("B1",)}[d["level"]]:
            err.append(f"cefr '{d.get('cefr')}' no corresponde a {d['level']}")
        hk = d["hook"]
        if not (isinstance(hk, dict) and hk.get("text") and hk.get("ask")):
            err.append("hook: falta text/ask")
        else:
            if len(hk["text"]) > 320:
                warn.append("hook.text > 320 chars")
            if hk["text"].count("<b>") < 2:
                err.append("hook.text: la estructura en <b> menos de 2 veces")
        rm = d["remember"]
        if not (isinstance(rm, dict) and rm.get("trick") and rm.get("tip")):
            err.append("remember: falta trick/tip")
        elif len(rm["trick"]) > 60:
            warn.append("remember.trick > 60 chars")
        l1 = d["l1"]
        if not (3 <= len(l1) <= 5):
            err.append(f"l1: {len(l1)} trampas (3-5)")
        for x in l1:
            for k in ("es", "wrong", "right", "why"):
                if not x.get(k):
                    err.append(f"l1 sin '{k}'")
        if len(d["can_do"]) != 3:
            err.append(f"can_do: {len(d['can_do'])} (exactamente 3)")
    if len(d.get("tagline", "")) > 110:
        warn.append("tagline > 110 chars")
    # diagramas
    dg = d["diagrams"]
    if kids:
        if len(dg) != 3:
            err.append(f"diagrams: {len(dg)} (exactamente 3 en {d['level']})")
        if not any(g.get("type") in KIDS for g in dg):
            err.append("diagrams: ninguno de tipo blocks/steps/spelling")
    elif not (2 <= len(dg) <= 3):
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
        elif t == "blocks":
            ss = g.get("sentences", [])
            if not (2 <= len(ss) <= 4):
                err.append(f"diagram {i} blocks: {len(ss)} sentences (2-4)")
            for sn in ss:
                parts = sn.get("parts", [])
                if len(parts) < 2:
                    err.append(f"diagram {i} blocks: frase con {len(parts)} bloques")
                for pt in parts:
                    if not pt.get("t"):
                        err.append(f"diagram {i} blocks: bloque sin 't'")
                    if pt.get("role") not in ROLES:
                        err.append(f"diagram {i} blocks: role '{pt.get('role')}' desconocido")
        elif t == "steps":
            st = g.get("steps", [])
            if not (2 <= len(st) <= 4):
                err.append(f"diagram {i} steps: {len(st)} pasos (2-4)")
            for x in st:
                if not (x.get("label") and x.get("ex")):
                    err.append(f"diagram {i} steps: paso sin label/ex")
        elif t == "spelling":
            rl = g.get("rules", [])
            if not (2 <= len(rl) <= 4):
                err.append(f"diagram {i} spelling: {len(rl)} reglas (2-4)")
            for r in rl:
                ex = r.get("examples", [])
                if not r.get("rule") or not (2 <= len(ex) <= 4):
                    err.append(f"diagram {i} spelling: regla '{r.get('rule')}' con {len(ex)} ejemplos (2-4)")
                for e in ex:
                    if "→" not in e:
                        warn.append(f"spelling: ejemplo sin flecha: '{e}'")
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
    lo, hi = (10, 14) if kids else (8, 12)
    if not (lo <= nex <= hi):
        err.append(f"use: {nex} ejemplos en total ({lo}-{hi})")
    for u in usos:
        for e in u.get("examples", []):
            if not e.get("text"):
                err.append("use: ejemplo sin text")
            elif "<b>" not in e["text"]:
                warn.append(f"ejemplo sin <b>: {e['text'][:50]}")
            if kids and not e.get("note"):
                err.append(f"use: ejemplo sin note (obligatorio en {d['level']}): {e.get('text', '')[:40]}")
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
    lo = 6 if d["level"] in ("a1", "ket") else 8
    if not (lo <= len(lines) <= 12):
        err.append(f"dialogue: {len(lines)} lineas ({lo}-12)")
    if any(str(l.get("speaker", "")).lower().startswith("nova") for l in lines):
        err.append("dialogue: Nova no habla en los dialogos")
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
    exigidos = PRACTICA[d["level"]]
    for t, minimo in exigidos:
        if t not in tipos:
            err.append(f"practice: falta bloque '{t}'")
    for t in tipos:
        if t not in {x for x, _ in exigidos}:
            err.append(f"practice: bloque '{t}' no va en {d['level']}")
    minimo_de = dict(exigidos)
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
        elif t == "order":
            if len(items) < minimo_de.get("order", 5):
                err.append(f"practice order: {len(items)} items (>={minimo_de.get('order', 5)})")
            for it in items:
                w, a = it.get("words", []), str(it.get("answer", ""))
                if not (2 <= len(w) <= 8) or not a:
                    err.append(f"practice order: item con {len(w)} piezas o sin answer")
                    continue
                if not encaja(w, a):
                    err.append(f"practice order: words y answer no coinciden: {w} / '{a}'")
                if " ".join(w) == a or " ".join(w).replace(" .", ".").replace(" ?", "?") == a:
                    err.append(f"practice order: words ya esta en orden: '{a}'")
        elif t == "spot":
            if len(items) < minimo_de.get("spot", 6):
                err.append(f"practice spot: {len(items)} items (>={minimo_de.get('spot', 6)})")
            oks = 0
            for it in items:
                if not it.get("sentence") or not isinstance(it.get("ok"), bool):
                    err.append(f"practice spot: item sin sentence/ok: '{it.get('sentence', '')[:40]}'")
                    continue
                if it["ok"]:
                    oks += 1
                elif not it.get("fix"):
                    err.append(f"practice spot: frase incorrecta sin fix: '{it['sentence'][:40]}'")
                elif "<b>" not in it["fix"]:
                    warn.append(f"spot: fix sin <b>: '{it['fix'][:40]}'")
            if items and not (0.35 <= oks / len(items) <= 0.65):
                err.append(f"practice spot: {oks}/{len(items)} correctas (35-65 %)")
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
                    if not ((1 if kids else 2) <= n <= 5):
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
    args = sys.argv[1:] or ["a1", "ket", "pet", "b2f", "c1a"]
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
