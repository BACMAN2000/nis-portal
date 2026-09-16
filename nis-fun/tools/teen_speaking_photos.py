"""Fotos reales para el Speaking Part 2 (long turn) de B2 First y C1 Advanced.

En el examen real, la Part 2 se habla sobre FOTOGRAFIAS de situaciones y
personas reales, no sobre emojis. Este script baja de Unsplash una foto por
cada imagen de la Part 2 (una consulta por leyenda), la recorta a 1200x800
(la que se ve) y 480x320 (miniatura), y la guarda en assets/teen/ con el
mismo esquema de nombres y creditos que teen_photos.py:

    assets/teen/<slug>.jpg   y   <slug>-s.jpg        (slug = b2f-u1-p1, ...)
    assets/teen/credits.json  (fusiona; el motor pinta el credito en la esquina)

Reanudable: si ya existe el jpg no vuelve a buscar. Se para al agotar la
cuota (403) y se relanza mas tarde.

Uso:  python tools/teen_speaking_photos.py [--only b2f] [--dry]
"""
import io, json, os, sys, time, urllib.parse, urllib.request
from PIL import Image

KEY = "TOeiazOrM5fgm18D2HAvAgNe0hDH1MvianBy53X9GcQ"   # misma clave que teen_photos.py
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "assets", "teen")
CREDITS = os.path.join(OUT, "credits.json")

# slug -> consulta de Unsplash. El slug es el que pone la unidad en pic.img.
QUERIES = {
    # ---- B2 First (2 fotos por unidad) ----
    "b2f-u1-p1": "person standing forest path crossroads decision",
    "b2f-u1-p2": "elderly woman looking old photo album memories",
    "b2f-u2-p1": "plumber repairing kitchen sink home",
    "b2f-u2-p2": "picture framer workshop wooden frame",
    "b2f-u3-p1": "baker decorating cake early morning bakery",
    "b2f-u3-p2": "carpenter apprentice measuring wood workshop",
    "b2f-u4-p1": "person sorting recycling bins waste",
    "b2f-u4-p2": "teenager cycling to school bicycle",
    "b2f-u5-p1": "teenager presentation classroom audience",
    "b2f-u5-p2": "people holding signs peaceful march",
    "b2f-u6-p1": "student speaking school assembly microphone",
    "b2f-u6-p2": "teenagers peaceful demonstration march",
    # ---- C1 Advanced (3 fotos por unidad) ----
    "c1a-u1-p1": "runner training alone sunrise road",
    "c1a-u1-p2": "scientist working laboratory late night",
    "c1a-u1-p3": "young chess player tournament concentration",
    "c1a-u2-p1": "speaker addressing large audience stage conference",
    "c1a-u2-p2": "teacher helping student desk classroom",
    "c1a-u2-p3": "activist megaphone street speaking",
    "c1a-u3-p1": "journalist interviewing person microphone",
    "c1a-u3-p2": "person translating text laptop books desk",
    "c1a-u3-p3": "two young people texting phones night",
    "c1a-u4-p1": "student writing essay surrounded by books",
    "c1a-u4-p2": "lawyer presenting case courtroom",
    "c1a-u4-p3": "researcher presenting data conference screen",
    "c1a-u5-p1": "teacher explaining diagram whiteboard confused class",
    "c1a-u5-p2": "student thinking hard oral exam",
    "c1a-u5-p3": "two friends serious conversation talking",
    "c1a-u6-p1": "student speech school hall podium",
    "c1a-u6-p2": "two politicians televised debate podium",
    "c1a-u6-p3": "family disagreement argument living room",
}

HERO = (1200, 800)
CARD = (480, 320)


def buscar(query):
    url = "https://api.unsplash.com/search/photos?" + urllib.parse.urlencode(
        {"query": query, "orientation": "landscape", "per_page": 1, "content_filter": "high"})
    req = urllib.request.Request(url, headers={"Authorization": "Client-ID " + KEY})
    with urllib.request.urlopen(req, timeout=30) as r:
        data = json.load(r)
    res = data.get("results") or []
    if not res:
        return None
    p = res[0]
    return {"raw": p["urls"]["raw"], "name": p["user"]["name"],
            "link": p["user"]["links"]["html"], "alt": p.get("alt_description") or ""}


def recorta(raw_url, size):
    u = raw_url + ("&" if "?" in raw_url else "?") + urllib.parse.urlencode(
        {"w": size[0] * 2, "q": "80", "fm": "jpg"})
    with urllib.request.urlopen(u, timeout=60) as r:
        im = Image.open(io.BytesIO(r.read())).convert("RGB")
    tw, th = size
    sc = max(tw / im.width, th / im.height)
    im = im.resize((round(im.width * sc), round(im.height * sc)), Image.LANCZOS)
    x = (im.width - tw) // 2
    y = (im.height - th) // 2
    return im.crop((x, y, x + tw, y + th))


def main():
    os.makedirs(OUT, exist_ok=True)
    only = sys.argv[sys.argv.index("--only") + 1] if "--only" in sys.argv else None
    dry = "--dry" in sys.argv
    cred = {}
    if os.path.exists(CREDITS):
        cred = json.load(open(CREDITS, encoding="utf-8"))
    hecho = fallo = salta = 0
    for slug, query in QUERIES.items():
        if only and not slug.startswith(only):
            continue
        dest = os.path.join(OUT, slug + ".jpg")
        if os.path.exists(dest):
            salta += 1
            continue
        if dry:
            print("DRY", slug, "<-", query)
            continue
        try:
            info = buscar(query)
            if not info:
                print("SIN RESULTADO", slug, query)
                fallo += 1
                continue
            recorta(info["raw"], HERO).save(dest, "JPEG", quality=82)
            recorta(info["raw"], CARD).save(os.path.join(OUT, slug + "-s.jpg"), "JPEG", quality=80)
            cred[slug] = {"name": info["name"], "link": info["link"]}
            json.dump(cred, open(CREDITS, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
            hecho += 1
            print("OK", slug, "->", info["name"])
            time.sleep(1.0)
        except urllib.error.HTTPError as e:
            if e.code == 403:
                print("CUOTA AGOTADA en", slug, "- relanza mas tarde")
                break
            print("HTTP", e.code, slug)
            fallo += 1
        except Exception as e:
            print("ERR", slug, str(e)[:80])
            fallo += 1
    print(f"DONE bajadas {hecho} · saltadas {salta} · fallos {fallo}")


if __name__ == "__main__":
    main()
