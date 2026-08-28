# -*- coding: utf-8 -*-
"""Genera class-files.js a partir de lo que HAY EN EL DISCO.

Los materiales de clase (ficha del alumno por nivel A2-C1 y diapositivas del
profesor) se exportan desde OneDrive a classes/<grado>/<unidad>/w<N>/ con el
script exporta_u4.ps1. Este generador recorre esa carpeta y escribe el indice
que lee unit.html, para que la lista nunca se escriba a mano: si una ficha no
esta en el disco, no se ofrece.

Uso:  python tools/genera_class_files.py
"""
import io, json, os, re, sys

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = os.path.join(RAIZ, 'classes')
NIVELES = ['A2', 'B1', 'B2', 'C1']
RE_WS = re.compile(r'^u(\d+)w(\d+)s(\d+)-worksheet-([a-z0-9]+)\.pdf$', re.I)
RE_SL = re.compile(r'^u(\d+)w(\d+)s(\d+)-slides\.pptx$', re.I)


def titulos(carpeta):
    """Los titulos de sesion vienen del indice.json que deja el exportador."""
    ruta = os.path.join(carpeta, 'indice.json')
    if not os.path.exists(ruta):
        return {}
    try:
        datos = json.load(io.open(ruta, encoding='utf-8-sig'))
    except Exception:
        return {}
    if isinstance(datos, dict):
        datos = [datos]
    return {(int(d['week']), int(d['session'])): d.get('title', '') for d in datos}


def recorre():
    salida = {}
    if not os.path.isdir(BASE):
        return salida
    for grado in sorted(os.listdir(BASE)):
        gdir = os.path.join(BASE, grado)
        if not os.path.isdir(gdir):
            continue
        for unidad in sorted(os.listdir(gdir)):
            udir = os.path.join(gdir, unidad)
            if not os.path.isdir(udir):
                continue
            tit = titulos(udir)
            semanas = {}
            for wdir in sorted(os.listdir(udir)):
                wpath = os.path.join(udir, wdir)
                if not os.path.isdir(wpath) or not re.match(r'^w\d+$', wdir):
                    continue
                n = int(wdir[1:])
                sesiones = {}
                # Diapositivas exportadas a imagenes: w<N>/slides/<sesion>/NN.png
                sdir = os.path.join(wpath, 'slides')
                if os.path.isdir(sdir):
                    for mazo in sorted(os.listdir(sdir)):
                        m = re.match(r'^u(\d+)w(\d+)s(\d+)$', mazo, re.I)
                        if not m:
                            continue
                        pngs = sorted(x for x in os.listdir(os.path.join(sdir, mazo))
                                      if x.lower().endswith('.png'))
                        if pngs:
                            sn = int(m.group(3))
                            d = sesiones.setdefault(sn, {'s': sn, 'ws': {}, 'slides': None})
                            d['deck'] = wdir + '/slides/' + mazo + '/'
                            d['pages'] = len(pngs)
                for f in sorted(os.listdir(wpath)):
                    m = RE_WS.match(f)
                    if m:
                        sn = int(m.group(3))
                        lvl = m.group(4).upper()
                        if lvl in NIVELES:
                            sesiones.setdefault(sn, {'s': sn, 'ws': {}, 'slides': None})['ws'][lvl] = wdir + '/' + f
                        continue
                    m = RE_SL.match(f)
                    if m:
                        sn = int(m.group(3))
                        sesiones.setdefault(sn, {'s': sn, 'ws': {}, 'slides': None})['slides'] = wdir + '/' + f
                if sesiones:
                    for sn, d in sesiones.items():
                        d['title'] = tit.get((n, sn), 'Session %d' % sn)
                    semanas[str(n)] = [sesiones[k] for k in sorted(sesiones)]
            if semanas:
                salida.setdefault(grado, {})[unidad] = {
                    'base': '%s/%s/' % (grado, unidad),   # ruta dentro del bucket class-files
                    'weeks': semanas,
                }
    return salida


def main():
    datos = recorre()
    cuerpo = json.dumps(datos, ensure_ascii=False, indent=1, sort_keys=True)
    js = (u"/* GENERADO por tools/genera_class_files.py — no editar a mano.\n"
          u"   Indice de los materiales de clase que hay en classes/: la ficha del\n"
          u"   alumno por nivel (A2-C1) y las diapositivas del profesor, por semana y\n"
          u"   sesion. unit.html las cuelga de la semana que les toca; las\n"
          u"   diapositivas solo se ensenan a quien es profesor. */\n"
          u"window.CLASS_FILES = %s;\n" % cuerpo)
    ruta = os.path.join(RAIZ, 'class-files.js')
    io.open(ruta, 'w', encoding='utf-8').write(js)
    total_f = sum(len(x['ws']) for g in datos.values() for u in g.values()
                  for w in u['weeks'].values() for x in w)
    total_s = sum(1 for g in datos.values() for u in g.values()
                  for w in u['weeks'].values() for x in w if x['slides'])
    total_p = sum(x.get('pages', 0) for g in datos.values() for u in g.values()
                  for w in u['weeks'].values() for x in w)
    print('class-files.js: %d fichas, %d presentaciones, %d diapositivas en imagen'
          % (total_f, total_s, total_p))
    for g, us in sorted(datos.items()):
        for u, d in sorted(us.items()):
            print('  %s/%s: %d semanas' % (g, u, len(d['weeks'])))


if __name__ == '__main__':
    main()
