"""Fotos de los cursos de secundaria (portadas, unidades y áreas del Grammar Lab).

Una búsqueda en Unsplash por asunto, la primera foto apaisada se recorta a
1400x760 (hero) y 640x360 (tarjeta) y se guarda en assets/teen/. El crédito
del fotógrafo queda en assets/teen/credits.json y el motor lo pinta en la
esquina de cada foto, como pide la licencia de Unsplash.

Reanudable: si ya existe el jpg no vuelve a buscar. Se para sola al agotar
la cuota (403) y se relanza más tarde.

Uso:  python tools/teen_photos.py [--only b2f] [--dry]
"""
import io, json, os, sys, time, urllib.parse, urllib.request
from PIL import Image

KEY = "TOeiazOrM5fgm18D2HAvAgNe0hDH1MvianBy53X9GcQ"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "assets", "teen")
CREDITS = os.path.join(OUT, "credits.json")

# nombre de archivo -> consulta. Los nombres son los que pide teen.js.
FOTOS = {
    # portadas de curso
    "a1-cover": "colourful wooden building blocks stacked",
    "ket-cover": "teenagers school corridor smiling backpacks",
    "pet-cover": "students group project laptop classroom",
    "b2f-cover": "teenagers studying library modern",
    "c1a-cover": "young adults debate university lecture hall",
    # unidades B2 First
    "b2f-u1": "victorian street lamp fog london night",
    "b2f-u2": "bicycle repair workshop mechanic hands",
    "b2f-u3": "letterpress wooden letters typography",
    "b2f-u4": "city skyline aerial panoramic",
    "b2f-u5": "public speaking stage microphone crowd",
    "b2f-u6": "young people climate march placards",
    # unidades C1 Advanced
    "c1a-u1": "stadium crowd lights night",
    "c1a-u2": "typewriter letter writing desk",
    "c1a-u3": "two people talking cafe conversation",
    "c1a-u4": "architecture blueprint drawing",
    "c1a-u5": "network connections lights abstract",
    "c1a-u6": "panel discussion stage speakers",
    # unidades A2 Key
    "ket-u1": "teenager playing guitar bedroom",
    "ket-u2": "weekly planner desk calendar coffee",
    "ket-u3": "handwritten letter envelope mailbox",
    "ket-u4": "road signs rules traffic",
    "ket-u5": "friends campfire storytelling night",
    "ket-u6": "student presentation classroom whiteboard",
    # unidades B1 Preliminary
    "pet-u1": "crossroads forest path decision",
    "pet-u2": "factory production line manufacturing",
    "pet-u3": "people whispering secret conversation",
    "pet-u4": "dictionary pages closeup words",
    "pet-u5": "future technology office robot",
    "pet-u6": "team presenting project poster",
    "pet-u7": "mirror reflection city alternate",
    "pet-u8": "construction site cranes progress",
    "pet-u9": "renovated building restoration finished",
    "pet-u10": "detective magnifying glass clues",
    "pet-u11": "justice scales courthouse",
    "pet-u12": "teenager public speaking stage",
    # áreas del Grammar Lab (compartidas por B2 y C1)
    "area-tenses": "hourglass sand time clock",
    "area-modals": "signpost directions road signs",
    "area-conditionals": "chess board strategy pieces",
    "area-passive": "craftsman workshop tools hands",
    "area-reporting": "journalist interview microphone",
    "area-sentence": "bridge construction engineering steel",
    "area-comparison": "colour palette paint swatches",
    "area-emphasis": "spotlight theatre stage",
    "area-words": "scrabble letter tiles",
}


def search(query):
    u = "https://api.unsplash.com/search/photos?" + urllib.parse.urlencode(
        {"query": query, "orientation": "landscape", "per_page": 5,
         "content_filter": "high", "client_id": KEY})
    req = urllib.request.Request(u, headers={"Accept-Version": "v1"})
    with urllib.request.urlopen(req, timeout=25) as r:
        return json.load(r), r.headers.get("X-Ratelimit-Remaining")


def baja(url):
    req = urllib.request.Request(url, headers={"User-Agent": "nis-fun-teen/1.0"})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read()


def recorta(img, w, h):
    iw, ih = img.size
    s = max(w / iw, h / ih)
    img = img.resize((max(w, round(iw * s)), max(h, round(ih * s))), Image.LANCZOS)
    iw, ih = img.size
    x, y = (iw - w) // 2, (ih - h) // 2
    return img.crop((x, y, x + w, y + h))


def main():
    args = sys.argv[1:]
    only = args[args.index("--only") + 1] if "--only" in args else None
    dry = "--dry" in args
    os.makedirs(OUT, exist_ok=True)
    creditos = json.load(open(CREDITS, encoding="utf-8")) if os.path.exists(CREDITS) else {}
    pendientes = [(n, q) for n, q in FOTOS.items()
                  if not os.path.exists(os.path.join(OUT, n + ".jpg")) and (not only or n.startswith(only))]
    print(f"pendientes: {len(pendientes)}")
    for n, q in pendientes:
        if dry:
            print("  ", n, "<-", q); continue
        try:
            data, resto = search(q)
        except urllib.error.HTTPError as e:
            print(f"parada en {n}: HTTP {e.code} (cuota agotada, relanzar mas tarde)")
            break
        res = [r for r in data.get("results", []) if r.get("width", 0) >= 1400]
        if not res:
            print("  sin resultado:", n, q); continue
        r = res[0]
        raw = r["urls"]["raw"] + "&w=1600&fit=max&q=85&fm=jpg"
        img = Image.open(io.BytesIO(baja(raw))).convert("RGB")
        recorta(img, 1400, 760).save(os.path.join(OUT, n + ".jpg"), "JPEG", quality=80, optimize=True, progressive=True)
        recorta(img, 640, 360).save(os.path.join(OUT, n + "-s.jpg"), "JPEG", quality=78, optimize=True)
        creditos[n] = {"name": r["user"]["name"], "link": r["user"]["links"]["html"],
                       "photo": r["links"]["html"], "id": r["id"], "query": q}
        json.dump(creditos, open(CREDITS, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
        print(f"  ok {n}  ({r['user']['name']})  cuota restante: {resto}")
        time.sleep(0.6)
    print("hecho:", len([n for n in FOTOS if os.path.exists(os.path.join(OUT, n + '.jpg'))]), "de", len(FOTOS))


if __name__ == "__main__":
    main()
