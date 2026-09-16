"""Ilustraciones por palabra para los practice tests YLE (Starters/Movers/Flyers).

Las tareas SIN lamina de yle-practice.html dibujan cada palabra (fruta, animal,
cosa) con un emoji 3D. Para cambiarlas por ILUSTRACIONES tipo lamina (estilo
Gemini, como las de Flyers), genera las imagenes en Gemini y este script las
importa: recorta cada una a un cuadrado sobre blanco (420x420) y la guarda en
    nis-portal/yle-img/words/<slug>.jpg
y regenera nis-portal/yle-img/words/index.json (la lista que lee el motor).
Mientras una palabra no tenga imagen, el motor sigue mostrando su emoji 3D
(sin peticiones 404), asi que se puede ir completando por tandas.

--------------------------------------------------------------------------
PROMPT DE GEMINI (una imagen por palabra, mismo estilo que las laminas):
  "Flat 3D cartoon illustration of A <WORD>, centered on a plain white
   background, soft shadows, bright friendly colours, children's English
   course style, no text, no letters, single object."
Guarda cada imagen con el nombre de la palabra en ingles: apple.jpg,
monkey.png, "ice cream.jpg"... (el script pasa el nombre a slug igual que
el motor: minusculas, sin 'a/an/the', espacios -> guion).
--------------------------------------------------------------------------

Uso:
  python tools/yle_word_images.py --list            # que palabras faltan
  python tools/yle_word_images.py --from <carpeta>  # importa de esa carpeta
  (por defecto --from apunta a Downloads/yle-words)
"""
import glob, json, os, re, sys
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WORDS = os.path.join(ROOT, "yle-img", "words")
PEND = os.path.join(WORDS, "_PENDIENTES.tsv")
SIZE = 420


def wslug(w):
    w = str(w).lower()
    w = re.sub(r"^(a|an|the)\s+", "", w)
    w = re.sub(r"[^a-z0-9]+", "-", w)
    return w.strip("-")


def pendientes():
    if not os.path.exists(PEND):
        return {}
    out = {}
    for ln in open(PEND, encoding="utf-8").read().splitlines()[1:]:
        p = ln.split("\t")
        if len(p) >= 2:
            out[p[0]] = p[1]
    return out


def cuadra(src, dest):
    im = Image.open(src).convert("RGB")
    im.thumbnail((SIZE, SIZE), Image.LANCZOS)
    lienzo = Image.new("RGB", (SIZE, SIZE), "white")
    lienzo.paste(im, ((SIZE - im.width) // 2, (SIZE - im.height) // 2))
    lienzo.save(dest, "JPEG", quality=86)


def rebuild_index():
    slugs = sorted(os.path.splitext(os.path.basename(f))[0]
                   for f in glob.glob(os.path.join(WORDS, "*.jpg")))
    json.dump(slugs, open(os.path.join(WORDS, "index.json"), "w"), ensure_ascii=False)
    # yle-words.js (estatico de raiz): lo lee el motor porque en nis.cohasset.pe
    # /yle-img/ lo intercepta el backend y su index.json da 404.
    with open(os.path.join(ROOT, "yle-words.js"), "w", encoding="utf-8") as fh:
        fh.write("/* Generado por tools/yle_slice_sheet.py y tools/yle_word_images.py: slugs\n"
                 "   con ilustracion. Estatico de raiz para llenar WORDS_HAVE en\n"
                 "   nis.cohasset.pe (alli /yle-img/ lo sirve el backend y su index.json da 404). */\n"
                 "window.YLE_WORDS_HAVE=" + json.dumps({s: 1 for s in slugs}, ensure_ascii=False, separators=(",", ":")) + ";\n")
    return slugs


def main():
    os.makedirs(WORDS, exist_ok=True)
    need = pendientes()
    if "--list" in sys.argv:
        have = set(os.path.splitext(os.path.basename(f))[0] for f in glob.glob(os.path.join(WORDS, "*.jpg")))
        falta = [(s, w) for s, w in need.items() if s not in have]
        print(f"faltan {len(falta)} de {len(need)}:")
        for s, w in falta:
            print(" ", w)
        return
    src = None
    if "--from" in sys.argv:
        src = sys.argv[sys.argv.index("--from") + 1]
    else:
        src = os.path.join(os.path.expanduser("~"), "Downloads", "yle-words")
    if not os.path.isdir(src):
        print("carpeta no encontrada:", src, "\nUsa --from <carpeta con las ilustraciones>")
        return
    imgs = [f for f in glob.glob(os.path.join(src, "*")) if f.lower().endswith((".jpg", ".jpeg", ".png", ".webp"))]
    hecho = desconocidas = 0
    for f in imgs:
        sl = wslug(os.path.splitext(os.path.basename(f))[0])
        if not sl:
            continue
        try:
            cuadra(f, os.path.join(WORDS, sl + ".jpg"))
            hecho += 1
            if sl not in need:
                desconocidas += 1
                print("  (?) no estaba en la lista:", sl)
        except Exception as e:
            print("ERR", f, str(e)[:70])
    slugs = rebuild_index()
    falta = len([s for s in need if s not in set(slugs)])
    print(f"DONE importadas {hecho} · index.json con {len(slugs)} · faltan {falta} de la lista")


if __name__ == "__main__":
    main()
