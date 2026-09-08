# -*- coding: utf-8 -*-
"""Laminas de los tests YLE: de los originales de Gemini (2-3 MB, en la copia de
trabajo de Cohasset, que no va por git) a JPG de web (max 1200 px, calidad 85)
en yle-img/<level>/ de los tres repos (portal NIS, deploy de Cohasset, copia
de trabajo).

    python yle/tools/build_img.py            # todos los niveles
    python yle/tools/build_img.py starters

ANTES de dar por buena una lamina, comprueba la ortografia de las palabras que
lleva DIBUJADAS DENTRO (titulares, carteles, lomos de libros). El corrector no
las ve: no son texto, son pixeles, y Gemini se equivoca al dibujarlas.

    python C:\\Projects\\corpus-linguistico\\tools\\laminas_ortografia.py --carpeta C:\\Projects\\nis-portal\\yle-img\\flyers

Termina con codigo 1 si encuentra una palabra que parece falta de ortografia.
Paso el 8-sep-2026 con test_04_S1.jpg de Flyers: el periodico que lee la madre
decia NEWSRAPER en una mitad y NEWSPAPER bien en la otra, en la tarea en que el
alumno tiene que decir justamente "newspaper".

Ojo con dos cosas de este material:
  - yle-img/ esta en .gitignore del portal NIS: un push NO lo publica. En NIS se
    sirve desde /opt/nis-media por endpoint con permiso; hay que subirlo aparte.
    En cohasset-community/repo si viaja por git.
  - las laminas de flyers/ no salen de SRC: su master vive en
    C:\\Projects\\cohasset.pe\\Flyers_Practice\\img_src\\ (ver README_FLYERS.md),
    y la copia publicada esta ademas en Flyers_Practice/img/ de los tres repos.
"""
import io, os, sys, glob
from PIL import Image

SRC = r"C:\Projects\cohasset-final\cohasset-language-center\yle-img-src"
DEST = [r"C:\Projects\nis-portal\yle-img", r"C:\Projects\cohasset-community\repo\yle-img", r"C:\Projects\cohasset-final\cohasset-language-center\yle-img"]

def build(level):
    hechos = 0
    for f in sorted(glob.glob(os.path.join(SRC, level, 'test_*.jpg')) + glob.glob(os.path.join(SRC, level, 'test_*.png'))):
        nombre = os.path.splitext(os.path.basename(f))[0] + '.jpg'
        im = Image.open(f).convert('RGB'); w, h = im.size
        if w > 1200: im = im.resize((1200, round(h * 1200 / w)), Image.LANCZOS)
        buf = io.BytesIO(); im.save(buf, 'JPEG', quality=85, optimize=True, progressive=True)
        for d in DEST:
            out = os.path.join(d, level, nombre); os.makedirs(os.path.dirname(out), exist_ok=True)
            if os.path.exists(out) and os.path.getsize(out) == len(buf.getvalue()): continue
            open(out, 'wb').write(buf.getvalue())
        hechos += 1; print('%-8s %-22s %dx%d -> %d KB' % (level, nombre, w, h, len(buf.getvalue()) // 1024))
    print(level, 'laminas:', hechos)

if __name__ == '__main__':
    niveles = sys.argv[1:] or [d for d in os.listdir(SRC) if os.path.isdir(os.path.join(SRC, d))]
    for lv in niveles: build(lv)
