# -*- coding: utf-8 -*-
"""Sube los materiales de clase al bucket PRIVADO class-files de Supabase.

Los PDFs de las fichas y las diapositivas NO van al repo: el repo es publico y
son materiales del colegio. Viven en el bucket `class-files`, y el portal los
abre con enlace firmado (el alumno solo ve las fichas; las diapositivas, solo
quien es profesor).

Necesita la clave de servicio del proyecto NIS, que NO se guarda en el repo:

    set SUPABASE_SERVICE_KEY=...        (Windows, cmd)
    $env:SUPABASE_SERVICE_KEY="..."     (PowerShell)
    export SUPABASE_SERVICE_KEY=...     (bash)

    python tools/sube_class_files.py            # sube lo que falte
    python tools/sube_class_files.py --forzar   # vuelve a subir todo

La clave esta en Supabase → Project Settings → API → service_role.
"""
import io, os, sys, mimetypes, urllib.request, urllib.error

URL    = 'https://kjrppibltkbflvxmiyib.supabase.co'
BUCKET = 'class-files'
RAIZ   = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE   = os.path.join(RAIZ, 'classes')

TIPOS = {
    '.pdf':  'application/pdf',
    '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.png':  'image/png',
    '.jpg':  'image/jpeg',
}


def sube(ruta_local, destino, key, forzar):
    ext = os.path.splitext(ruta_local)[1].lower()
    tipo = TIPOS.get(ext) or mimetypes.guess_type(ruta_local)[0] or 'application/octet-stream'
    with open(ruta_local, 'rb') as f:
        datos = f.read()
    req = urllib.request.Request(
        '%s/storage/v1/object/%s/%s' % (URL, BUCKET, destino),
        data=datos, method='POST',
        headers={'Authorization': 'Bearer ' + key,
                 'apikey': key,
                 'Content-Type': tipo,
                 'x-upsert': 'true' if forzar else 'false'})
    try:
        urllib.request.urlopen(req, timeout=120).read()
        return 'subido'
    except urllib.error.HTTPError as e:
        cuerpo = e.read().decode('utf-8', 'replace')
        if e.code == 409 and not forzar:
            return 'ya estaba'
        return 'ERROR %s: %s' % (e.code, cuerpo[:160])
    except Exception as e:
        return 'ERROR: %s' % e


def main():
    key = os.environ.get('SUPABASE_SERVICE_KEY', '').strip()
    if not key:
        print('Falta SUPABASE_SERVICE_KEY. Mira la cabecera de este archivo.')
        return 1
    forzar = '--forzar' in sys.argv

    # Comprobar la clave antes de intentar 120 subidas: si no es la de
    # servicio, la politica del bucket la rechaza y solo veriamos 120 errores.
    if key.startswith('sb_publishable_') or key.startswith('sbp_'):
        print('Esa es la clave PUBLICA. Hace falta la de servicio (service_role o sb_secret_).')
        return 1
    try:
        req = urllib.request.Request('%s/storage/v1/bucket/%s' % (URL, BUCKET),
                                     headers={'Authorization': 'Bearer ' + key, 'apikey': key})
        urllib.request.urlopen(req, timeout=30).read()
        print('Clave aceptada. Subiendo a %s...' % BUCKET)
    except urllib.error.HTTPError as e:
        print('La clave no sirve para escribir en Storage (HTTP %s).' % e.code)
        print(e.read().decode('utf-8', 'replace')[:300])
        print('')
        print('Tiene que ser la clave de SERVICIO del proyecto NIS:')
        print('  Supabase -> Project Settings -> API Keys')
        print('  - "service_role" (empieza por eyJ...), en Legacy API keys, o')
        print('  - una Secret key (empieza por sb_secret_).')
        print('NO sirve la anon / publishable, que es la que ya usa el portal.')
        return 1
    except Exception as e:
        print('No pude contactar con Supabase: %s' % e)
        return 1
    if not os.path.isdir(BASE):
        print('No existe %s — corre antes el exportador.' % BASE)
        return 1

    total = ok = 0
    for dirpath, _dirs, files in os.walk(BASE):
        for f in sorted(files):
            if os.path.splitext(f)[1].lower() not in TIPOS:
                continue
            local = os.path.join(dirpath, f)
            destino = os.path.relpath(local, BASE).replace('\\', '/')
            total += 1
            r = sube(local, destino, key, forzar)
            if r.startswith('ERROR'):
                print('  %s -> %s' % (destino, r))
            else:
                ok += 1
                if total % 20 == 0:
                    print('  %d/%d…' % (ok, total))
    print('Listo: %d de %d archivos en el bucket %s.' % (ok, total, BUCKET))
    return 0 if ok == total else 2


if __name__ == '__main__':
    sys.exit(main())
