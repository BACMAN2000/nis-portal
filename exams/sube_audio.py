# -*- coding: utf-8 -*-
"""Sube el Listening de los examenes al bucket PRIVADO exam-audio.

El mp3 no va al repo. El repo del portal es publico, y un examen oficial cuyo
audio se puede descargar la noche anterior deja de ser un examen. En el bucket
lo entrega una URL firmada que la pagina pide al abrirlo, y la politica del
bucket solo se la da al profesor, al admin o al alumno que lo tiene ABIERTO.

Necesita la clave de servicio del proyecto NIS, que NO se guarda en el repo
(Supabase -> Project Settings -> API -> service_role):

    $env:SUPABASE_SERVICE_KEY="..."     (PowerShell)
    export SUPABASE_SERVICE_KEY=...     (bash)

    python exams/sube_audio.py            # sube lo que falte
    python exams/sube_audio.py --forzar   # vuelve a subir todo

Ruta en el bucket: <grade>/<units>/<kind>/<level>.mp3
"""
import io, json, os, sys, urllib.request, urllib.error

URL = 'https://kjrppibltkbflvxmiyib.supabase.co'
BUCKET = 'exam-audio'
AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.dirname(AQUI)
AUDIO = os.path.join(RAIZ, 'exam-audio')

try:
    sys.stdout.reconfigure(encoding='utf-8')
except Exception:
    pass


def sube(ruta_local, destino, key, forzar):
    with open(ruta_local, 'rb') as f:
        datos = f.read()
    req = urllib.request.Request(
        '%s/storage/v1/object/%s/%s' % (URL, BUCKET, destino),
        data=datos, method='POST',
        headers={'Authorization': 'Bearer ' + key, 'apikey': key,
                 'Content-Type': 'audio/mpeg',
                 'x-upsert': 'true' if forzar else 'false'})
    try:
        urllib.request.urlopen(req, timeout=180)
        return 'subido'
    except urllib.error.HTTPError as e:
        cuerpo = e.read().decode('utf-8', 'replace')
        if e.code == 409 and not forzar:
            return 'ya estaba'
        return 'ERROR %s: %s' % (e.code, cuerpo[:200])


def main():
    key = os.environ.get('SUPABASE_SERVICE_KEY', '').strip()
    if not key:
        sys.exit('Falta SUPABASE_SERVICE_KEY (Supabase -> Project Settings -> API -> service_role).')
    forzar = '--forzar' in sys.argv or '--force' in sys.argv
    n = 0
    for carpeta in sorted(os.listdir(AQUI)):
        d = os.path.join(AQUI, carpeta)
        if not os.path.isdir(d):
            continue
        for f in sorted(os.listdir(d)):
            if not f.endswith('.json'):
                continue
            e = json.load(io.open(os.path.join(d, f), encoding='utf-8'))
            local = os.path.join(AUDIO, e['audio'])
            if not os.path.exists(local):
                print('  falta el mp3 %s (python exams/gen_audio.py)' % e['audio'])
                continue
            destino = '%s/%s/%s/%s.mp3' % (e['grade'], e['units'], e['kind'], e['level'])
            print('  %-28s -> %-24s %s' % (e['audio'], destino, sube(local, destino, key, forzar)))
            n += 1
    print('\n%d archivos procesados.' % n)


if __name__ == '__main__':
    main()
