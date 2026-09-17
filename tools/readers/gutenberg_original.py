# -*- coding: utf-8 -*-
"""Monta el C2 integro y el esqueleto del C1 de un reader de dominio publico
a partir del texto de Project Gutenberg.

    python tools/readers/gutenberg_original.py <plan.json>

plan.json:
{
  "id": "greatexpectations", "title": "Great Expectations", "author": "Charles Dickens",
  "gutenberg": 1400, "txt": "C:/.../pg1400.txt",
  "chapter_re": "^Chapter ([IVXLC]+)\\.?\\s*$",     # grupo 1 = numero (romano o arabigo); grupo 2 opcional = titulo
  "last_occurrence": false,                        # true si el libro trae indice con los mismos encabezados (Moby-Dick)
  "epilogue_re": "^Epilogue$",                     # opcional: capitulo extra al final
  "lead_c1": "Charles Dickens · the original 1861 text, abridged · <b>C1 advanced</b>",
  "units": [ {"n": 1, "title": "…", "chapters": [1, 2, 3], "c1": [1, 3]}, … ]
}

Escribe:
  <id>-original.js   window.READER_ORIGINAL[unidad] = [{n, roman, title, paras}]  (todo el libro, solo C2)
  <id>-data-c1.js    READINGS con los capitulos "c1" integros ("§ Roman. Title" + parrafos) y un
                     «BRIDGE: chapters X–Y» donde se saltan capitulos; CHAPTERS y EVENTS quedan como
                     /*CHAPTERS*/ y /*EVENTS*/ para que el agente los escriba.
Los parrafos de Gutenberg vienen partidos a 72 columnas: se rejuntan por linea en blanco.
"""
import io, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
ROMAN = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"]


def roman(n):
    vals = [(100, "C"), (90, "XC"), (50, "L"), (40, "XL"), (10, "X"), (9, "IX"), (5, "V"), (4, "IV"), (1, "I")]
    out = ""
    for v, r in vals:
        while n >= v:
            out += r; n -= v
    return out


def from_roman(s):
    m = {"I": 1, "V": 5, "X": 10, "L": 50, "C": 100}
    n = 0
    for i, ch in enumerate(s):
        v = m[ch]
        if i + 1 < len(s) and m[s[i + 1]] > v:
            n -= v
        else:
            n += v
    return n


def js_str(s):
    return json.dumps(s, ensure_ascii=False)


def main():
    plan = json.load(io.open(sys.argv[1], encoding="utf-8"))
    bid = plan["id"]
    txt = io.open(plan["txt"], encoding="utf-8-sig").read().replace("\r\n", "\n")
    a = txt.find("*** START OF THE PROJECT GUTENBERG EBOOK")
    b = txt.find("*** END OF THE PROJECT GUTENBERG EBOOK")
    body = txt[txt.find("\n", a) + 1:b]
    lines = body.split("\n")
    rx = re.compile(plan["chapter_re"])
    epi = re.compile(plan["epilogue_re"]) if plan.get("epilogue_re") else None
    heads = []  # (line index, number, title)
    for i, ln in enumerate(lines):
        m = rx.match(ln.strip())
        if m:
            num = m.group(1)
            n = from_roman(num) if not num.isdigit() else int(num)
            title = (m.group(2).strip().rstrip(".") if m.lastindex and m.lastindex >= 2 and m.group(2) else "")
            heads.append((i, n, title))
        elif epi and epi.match(ln.strip()):
            heads.append((i, 0, "Epilogue"))
    if plan.get("last_occurrence"):
        seen = {}
        for h in heads:
            seen[(h[1], h[2])] = h  # la ultima ocurrencia manda (la primera es el indice)
        heads = sorted(seen.values())
    # epilogo numerado como capitulo N+1
    maxn = max(h[1] for h in heads)
    heads = [(i, (maxn + 1 if n == 0 else n), t) for (i, n, t) in heads]
    chapters = {}
    for k, (i, n, t) in enumerate(heads):
        j = heads[k + 1][0] if k + 1 < len(heads) else len(lines)
        block = lines[i + 1:j]
        paras, cur = [], []
        for ln in block:
            if ln.strip():
                cur.append(ln.strip())
            elif cur:
                paras.append(" ".join(cur)); cur = []
        if cur:
            paras.append(" ".join(cur))
        chapters[n] = {"n": n, "roman": roman(n) if n <= maxn else "", "title": t, "paras": paras}
    print("capitulos encontrados:", len(chapters), "| palabras:", sum(len(p.split()) for c in chapters.values() for p in c["paras"]))

    # ---- C2: todo el libro por unidad
    out = ["/* " + plan["title"].upper() + " — TEXTO ORIGINAL COMPLETO",
           "   " + plan["author"] + ". Dominio publico (Project Gutenberg, ebook #%s)." % plan["gutenberg"],
           "   Se carga SOLO en el nivel C2. Estructura: window.READER_ORIGINAL[unidad] = [{n, roman, title, paras}] */",
           "window.READER_ORIGINAL = {"]
    for u in plan["units"]:
        out.append("  %d: [" % u["n"])
        for n in u["chapters"]:
            c = chapters[n]
            out.append("    {n:%d, roman:%s, title:%s, paras:[" % (n, js_str(c["roman"]), js_str(c["title"])))
            out.append(",\n".join("      " + js_str(p) for p in c["paras"]))
            out.append("    ]},")
        out.append("  ],")
    out.append("};")
    io.open(os.path.join(ROOT, bid + "-original.js"), "w", encoding="utf-8", newline="\n").write("\n".join(out) + "\n")

    # ---- C1: capitulos elegidos integros + puentes
    R = {}
    covered = set()
    for u in plan["units"]:
        paras = []
        picks = u["c1"]
        prev_end = None
        for n in picks:
            gap_from = (max(covered) + 1) if covered else 1
            if n > gap_from:
                skipped = [k for k in range(gap_from, n) if k not in covered]
                if skipped:
                    paras.append("«BRIDGE: chapters %s–%s»" % (roman(skipped[0]), roman(skipped[-1])) if len(skipped) > 1
                                 else "«BRIDGE: chapter %s»" % roman(skipped[0]))
                    covered.update(skipped)
            c = chapters[n]
            head = ("§ " + (c["roman"] + ". " if c["roman"] else "") + c["title"]) if c["title"] else ("§ Chapter " + c["roman"])
            paras.append(head)
            paras.extend(c["paras"])
            covered.add(n)
        R[u["n"]] = paras
    # cola: capitulos despues del ultimo elegido
    tail = [k for k in sorted(chapters) if k not in covered]
    if tail:
        R[plan["units"][-1]["n"]].append("«BRIDGE: chapters %s–%s»" % (roman(tail[0]), roman(tail[-1])) if len(tail) > 1
                                          else "«BRIDGE: chapter %s»" % roman(tail[0]))
    words = {u: sum(len(p.split()) for p in ps) for u, ps in R.items()}
    print("C1 palabras por unidad:", words, "| total:", sum(words.values()))
    print("puentes a escribir:", sum(1 for ps in R.values() for p in ps if p.startswith("«BRIDGE")))
    lines_out = ["window.ATTWN_DATA = (function(){", "const CHAPTERS = [", "/*CHAPTERS*/", "];", "const READINGS = {"]
    for u in plan["units"]:
        lines_out.append("%d:[" % u["n"])
        lines_out.append(",\n".join(js_str(p) for p in R[u["n"]]))
        lines_out.append("],")
    lines_out.append("};")
    lines_out.append("const EVENTS = {")
    lines_out.append("/*EVENTS*/")
    lines_out.append("};")
    lines_out.append("return {level:'C1', lead:%s, CHAPTERS:CHAPTERS, READINGS:READINGS, EVENTS:EVENTS};" % js_str(plan["lead_c1"]).replace('"', "'"))
    lines_out.append("})();")
    io.open(os.path.join(ROOT, bid + "-data-c1.js"), "w", encoding="utf-8", newline="\n").write("\n".join(lines_out) + "\n")
    print("escritos", bid + "-original.js", "y", bid + "-data-c1.js (esqueleto)")


if __name__ == "__main__":
    main()
