"""Arma content/<level>/grammar/index.json a partir del temario y de los temas
escritos (solo entran los que existen), y enlaza cada caja de gramatica de
las unidades con su tema del Lab (data.lab).  Uso: python tools/grammar-lab/build_index.py
"""
import json, os, io
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
TEM = json.load(open(os.path.join(os.path.dirname(__file__), "temario.json"), encoding="utf-8"))

# caja de gramatica (unidad, orden) -> tema del Lab
LAB_DE = {
    "b2f": {1: ["mixed-conditionals", "wish-if-only"], 2: ["causative", "causative"], 3: ["word-formation", "adjectives-adverbs"],
            4: ["relative-clauses", "articles-quantifiers"], 5: ["reporting-verbs", "purpose-reason-result"], 6: ["linking-contrast", "mixed-conditionals"]},
    "ket": {1: ["present-simple", "present-continuous"], 2: ["present-perfect", "present-perfect-vs-past-simple"], 3: ["future-forms", "imperatives-suggestions"],
            4: ["modals-obligation-advice", "modals-ability-permission"], 5: ["past-continuous", "story-telling-sequencing"], 6: ["comparatives-superlatives", "adjectives-adverbs-a2"]},
    "pet": {1: ["first-second-conditional", "wish-hope"], 2: ["passive-present-past", "passive-other-tenses"], 3: ["reported-speech", "reported-questions-commands"],
            4: ["word-formation-b1", "adjectives-adverbs-b1"], 5: ["future-forms-b1", "present-tenses-b1"], 6: ["linking-contrast-reason", "question-tags-indirect"],
            7: ["third-conditional", "wish-hope"], 8: ["passive-other-tenses", "past-tenses-b1"], 9: ["passive-other-tenses", "present-perfect-b1"],
            10: ["modals-deduction", "modals-ability-possibility"], 11: ["relative-clauses-b1", "comparatives-b1"], 12: ["linking-contrast-reason", "verb-patterns-b1"]},
    "c1a": {1: ["inversion", "emphasis-advanced"], 2: ["cleft-sentences", "emphasis-advanced"], 3: ["verb-patterns-advanced", "reporting-advanced"],
            4: ["nominalisation", "hedging-impersonal"], 5: ["discourse-markers", "substitution-ellipsis"], 6: ["concession", "inversion"]},
}

def sangria(path):
    """El sangrado con que ya esta escrito el archivo (ket/pet van a 1, b2f/c1a a 2):
    reescribirlo con otro convierte un cambio de una clave en un diff del archivo entero."""
    try:
        for ln in io.open(path, encoding="utf-8"):
            n = len(ln) - len(ln.lstrip(" "))
            if n:
                return n
    except OSError:
        pass
    return 2


def dump(path, data):
    ind = sangria(path) if os.path.exists(path) else 2
    io.open(path, "w", encoding="utf-8", newline="\n").write(json.dumps(data, ensure_ascii=False, indent=ind) + "\n")

for lv, t in TEM.items():
    gdir = os.path.join(ROOT, "content", lv, "grammar")
    areas = []
    n = 0
    for a in t["areas"]:
        topics = []
        for tp in a["topics"]:
            p = os.path.join(gdir, tp["id"] + ".json")
            if not os.path.exists(p):
                continue
            d = json.load(open(p, encoding="utf-8"))
            topics.append({"id": tp["id"], "title": d.get("title", tp["title"]), "tagline": d.get("tagline", ""), "cefr": d.get("cefr", t["cefr"])})
        if topics:
            ar = {"area": a["area"], "topics": topics}
            if a.get("stage"):          # ket: A1 Foundations -> A2 Key
                ar["stage"] = a["stage"]
            areas.append(ar)
            n += len(topics)
    dump(os.path.join(gdir, "index.json"), {"level": lv, "cefr": t["cefr"], "exam": t["exam"], "count": n, "areas": areas})
    print(lv, n, "temas en el indice")
    existentes = {tp["id"] for a in areas for tp in a["topics"]}
    # las cajas de gramatica de las unidades apuntan a su tema
    for u, ids in LAB_DE.get(lv, {}).items():
        p = os.path.join(ROOT, "content", lv, f"unit-{u:02d}.json")
        d = json.load(open(p, encoding="utf-8"))
        cajas = [a for a in d["activities"] if a.get("type") == "grammar_box"]
        cambiado = False
        for a, lab in zip(cajas, ids):
            if lab in existentes and a.get("data", {}).get("lab") != lab:
                a.setdefault("data", {})["lab"] = lab; cambiado = True
        if cambiado:
            dump(p, d); print("  ", os.path.basename(p), "->", ids)
