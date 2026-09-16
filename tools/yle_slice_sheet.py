"""Recorta una LAMINA-rejilla de Gemini en imagenes individuales por palabra.

En vez de generar 191 imagenes sueltas, se genera una lamina con N objetos en
rejilla (p. ej. 4x3 = 12), se baja a mano, y este script la parte en celdas,
recorta el margen blanco de cada una, la cuadra sobre blanco (420) y la guarda
como yle-img/words/<slug>.jpg en el ORDEN que se le pasa. Luego regenera
index.json.

Uso:
  python tools/yle_slice_sheet.py --img "C:\\...\\Downloads\\animales1.png" \\
      --cols 4 --rows 3 \\
      --words "dog,cat,bird,cow,duck,elephant,fish,frog,horse,monkey,rabbit,sheep"

  # ver el recorte sin guardar en la libreria (deja un _preview.jpg):
  python tools/yle_slice_sheet.py --img ... --cols 4 --rows 3 --words "..." --preview

El orden de --words es fila por fila, de izquierda a derecha, de arriba abajo,
el MISMO que se le pidio a Gemini en el prompt.
"""
import argparse, glob, json, os, re
from PIL import Image, ImageChops

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WORDS = os.path.join(ROOT, "yle-img", "words")
SIZE = 420


def wslug(w):
    w = str(w).lower()
    w = re.sub(r"^(a|an|the)\s+", "", w)
    w = re.sub(r"[^a-z0-9]+", "-", w)
    return w.strip("-")


def trim_white(im, thr=245):
    """Recorta el marco blanco alrededor del dibujo."""
    g = im.convert("RGB")
    bg = Image.new("RGB", g.size, (255, 255, 255))
    diff = ImageChops.difference(g, bg).convert("L").point(lambda p: 255 if p > (255 - thr) else 0)
    bbox = diff.getbbox()
    if bbox:
        # un pequeno colchon
        x0, y0, x1, y1 = bbox
        pad = 4
        x0 = max(0, x0 - pad); y0 = max(0, y0 - pad)
        x1 = min(g.width, x1 + pad); y1 = min(g.height, y1 + pad)
        return im.crop((x0, y0, x1, y1))
    return im


def square(im):
    im = im.convert("RGB")
    im.thumbnail((SIZE, SIZE), Image.LANCZOS)
    c = Image.new("RGB", (SIZE, SIZE), "white")
    c.paste(im, ((SIZE - im.width) // 2, (SIZE - im.height) // 2))
    return c


def rebuild_index():
    slugs = sorted(os.path.splitext(os.path.basename(f))[0] for f in glob.glob(os.path.join(WORDS, "*.jpg")))
    json.dump(slugs, open(os.path.join(WORDS, "index.json"), "w"), ensure_ascii=False)
    # yle-words.js (estatico de raiz): lo lee el motor porque en nis.cohasset.pe
    # /yle-img/ lo intercepta el backend y su index.json da 404.
    with open(os.path.join(ROOT, "yle-words.js"), "w", encoding="utf-8") as fh:
        fh.write("/* Generado por tools/yle_slice_sheet.py y tools/yle_word_images.py: slugs\n"
                 "   con ilustracion. Estatico de raiz para llenar WORDS_HAVE en\n"
                 "   nis.cohasset.pe (alli /yle-img/ lo sirve el backend y su index.json da 404). */\n"
                 "window.YLE_WORDS_HAVE=" + json.dumps({s: 1 for s in slugs}, ensure_ascii=False, separators=(",", ":")) + ";\n")
    return len(slugs)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--img", required=True)
    ap.add_argument("--cols", type=int, required=True)
    ap.add_argument("--rows", type=int, required=True)
    ap.add_argument("--words", required=True, help="palabras en orden fila-por-fila, separadas por coma")
    ap.add_argument("--inset", type=int, default=6, help="px que se recortan del borde de cada celda (quita la linea de rejilla)")
    ap.add_argument("--preview", action="store_true")
    a = ap.parse_args()
    words = [w.strip() for w in a.words.split(",") if w.strip()]
    need = a.cols * a.rows
    if len(words) > need:
        print(f"AVISO: {len(words)} palabras para {need} celdas; sobran {len(words)-need}")
    im = Image.open(a.img).convert("RGB")
    W, H = im.size
    cw, ch = W / a.cols, H / a.rows
    os.makedirs(WORDS, exist_ok=True)
    prev = Image.new("RGB", (a.cols * 220, a.rows * 220), "white") if a.preview else None
    saved = 0
    for i, w in enumerate(words[:need]):
        r, c = divmod(i, a.cols)
        box = (int(c * cw) + a.inset, int(r * ch) + a.inset, int((c + 1) * cw) - a.inset, int((r + 1) * ch) - a.inset)
        cell = square(trim_white(im.crop(box)))
        if a.preview:
            t = cell.copy(); t.thumbnail((210, 210)); prev.paste(t, (c * 220 + 5, r * 220 + 5))
        else:
            cell.save(os.path.join(WORDS, wslug(w) + ".jpg"), "JPEG", quality=88)
            saved += 1
    if a.preview:
        pp = os.path.join(os.path.dirname(a.img), "_preview.jpg"); prev.save(pp, "JPEG", quality=85)
        print("preview:", pp)
    else:
        print(f"guardadas {saved} · index.json con {rebuild_index()}")


if __name__ == "__main__":
    main()
