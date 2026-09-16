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
    "c1a": {1: ["inversion", "emphasis-advanced"], 2: ["cleft-sentences", "emphasis-advanced"], 3: ["verb-patterns-advanced", "reporting-advanced"],
            4: ["nominalisation", "hedging-impersonal"], 5: ["discourse-markers", "substitution-ellipsis"], 6: ["concession", "inversion"]},
}

def dump(path, data):
    io.open(path, "w", encoding="utf-8", newline="\n").write(json.dumps(data, ensure_ascii=False, indent=2) + "\n")

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
            areas.append({"area": a["area"], "topics": topics})
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
