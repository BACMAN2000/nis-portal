# -*- coding: utf-8 -*-
"""Graba el Listening de los examenes de unidad con ElevenLabs.

    python exams/gen_audio.py                 # lo que falte
    python exams/gen_audio.py g9-u34          # una carpeta
    python exams/gen_audio.py g9-u34 --force  # rehacer aunque exista
    python exams/gen_audio.py g9-u34 --edge   # con Edge TTS, sin gastar cuota

La cuota de ElevenLabs se agota (paso el 6-sep-2026 con dos examenes por
grabar), y un examen sin audio es un examen que no se puede rendir. Con --edge
se graba con las mismas voces en-GB gratuitas que ya usan los readers y los
mocks; cuando la cuota vuelva, `--force` los rehace con ElevenLabs.

El guion vive en el campo `script` de cada examen, con etiquetas de hablante
(`Presenter:`, `Clara:`, `Doctor Hart:`). Cada turno se sintetiza con la voz que
le toca y se pegan con ffmpeg, con un silencio entre turnos que se acorta segun
sube el nivel. Sale un mp3 por examen en exam-audio/.

La clave se busca en ELEVENLABS_API_KEY y, si no esta, en el archivo que ya la
guarda en mocks-cambridge. Nunca se imprime.
"""
import io, json, os, re, subprocess, sys, tempfile
import urllib.request as urlreq

try:
    sys.stdout.reconfigure(encoding='utf-8')
except Exception:
    pass

AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.dirname(AQUI)
SALIDA = os.path.join(RAIZ, 'exam-audio')
MODEL = 'eleven_multilingual_v2'

# Las mismas dos voces britanicas del Listening de la unidad 4 (audio/listening).
VOZ_F = ('Charlotte', 'XB0fDUnXU5powFXDhCwa')
VOZ_M = ('Daniel',    'onwK4e9ZLuTAKqWW03F9')
# Quien es quien en los guiones de estos examenes.
QUIEN = {
    'presenter': None,          # lo decide el nombre que se presenta en el guion
    'nadia': VOZ_F, 'clara': VOZ_F,
    'daniel': VOZ_M, 'doctor hart': VOZ_M, 'dr hart': VOZ_M,
}
ES_MUJER = re.compile(r'\b(nadia|clara|maria|anna|sarah|emma|laura|julia|mrs|miss|ms)\b', re.I)
# Ritmo y pausa entre turnos: abajo mas lento y mas aire, arriba natural.
VELOCIDAD = {'a2': 0.80, 'b1': 0.88, 'b2': 0.96, 'c1': 1.0}
PAUSA = {'a2': 1.0, 'b1': 0.85, 'b2': 0.7, 'c1': 0.6}
HABLANTE = re.compile(r'^\s*([A-Z][A-Za-z .]{1,22}?)\s*:\s*')


def clave():
    k = os.environ.get('ELEVENLABS_API_KEY')
    if k:
        return k.strip()
    alt = os.path.join(os.path.dirname(RAIZ), 'mocks-cambridge', 'A2 Level.txt')
    if os.path.exists(alt):
        m = re.search(r'sk_[A-Za-z0-9]+', io.open(alt, encoding='utf-8', errors='ignore').read())
        if m:
            return m.group(0)
    sys.exit('No hay clave de ElevenLabs.\n'
             '  PowerShell:  $env:ELEVENLABS_API_KEY = "sk_..."')


def voz_de(quien, presentador):
    q = (quien or '').strip().lower().rstrip('.')
    if q == 'presenter':
        return presentador
    if q in QUIEN and QUIEN[q]:
        return QUIEN[q]
    return VOZ_F if ES_MUJER.search(q) else VOZ_M


def turnos(script):
    """Parte el guion en (quien, texto) por las etiquetas de hablante."""
    out, quien = [], None
    for linea in script.split('\n'):
        linea = linea.strip()
        if not linea:
            continue
        m = HABLANTE.match(linea)
        if m:
            quien = m.group(1)
            linea = linea[m.end():].strip()
        if linea:
            out.append((quien, linea))
    return out


def presentador_de(script):
    """El presentador se presenta en el guion ('I'm Nadia' / 'I'm Daniel'):
    de ahi sale su voz, en vez de asignarla a mano examen por examen."""
    m = re.search(r"I'm ([A-Z][a-z]+)", script)
    if m and ES_MUJER.search(m.group(1)):
        return VOZ_F
    return VOZ_M if m else VOZ_F


def habla(k, texto, voz_id, velocidad, destino):
    cuerpo = json.dumps({
        'text': texto, 'model_id': MODEL,
        'voice_settings': {'stability': 0.45, 'similarity_boost': 0.75,
                           'style': 0.0, 'use_speaker_boost': True, 'speed': velocidad},
    }).encode('utf-8')
    req = urlreq.Request('https://api.elevenlabs.io/v1/text-to-speech/' + voz_id,
                         data=cuerpo, method='POST',
                         headers={'xi-api-key': k, 'Content-Type': 'application/json'})
    # Un corte de red o un 429 tumbaba la tanda entera y habia que empezar de
    # cero: se reintenta, y si el fallo persiste se dice QUE dijo la API.
    import time
    import urllib.error as urlerr
    for intento in range(4):
        try:
            with urlreq.urlopen(req, timeout=180) as r:
                open(destino, 'wb').write(r.read())
            return
        except urlerr.HTTPError as e:
            detalle = e.read().decode('utf-8', 'replace')[:300]
            if e.code in (429, 500, 502, 503) and intento < 3:
                espera = 5 * (intento + 1)
                print('    (%s; reintento en %ds)' % (e.code, espera))
                time.sleep(espera)
                continue
            sys.exit('ElevenLabs respondio %s: %s' % (e.code, detalle))
        except Exception as e:
            if intento < 3:
                time.sleep(5)
                continue
            raise


# Respaldo gratuito: las voces en-GB de la casa (las de los readers y los mocks).
EDGE_F, EDGE_M = 'en-GB-LibbyNeural', 'en-GB-ThomasNeural'
EDGE_RITMO = {'a2': '-15%', 'b1': '-8%', 'b2': '-4%', 'c1': '+0%'}


def habla_edge(texto, voz_nombre, nivel, destino):
    import asyncio
    import edge_tts
    voz = EDGE_F if voz_nombre == VOZ_F[0] else EDGE_M
    asyncio.run(edge_tts.Communicate(texto, voz, rate=EDGE_RITMO.get(nivel, '+0%')).save(destino))


def silencio(seg, destino):
    subprocess.run(['ffmpeg', '-y', '-f', 'lavfi', '-i',
                    'anullsrc=r=44100:cl=mono', '-t', str(seg), '-q:a', '9', destino],
                   check=True, capture_output=True)


def pega(partes, destino):
    lista = destino + '.txt'
    with io.open(lista, 'w', encoding='utf-8') as f:
        for p in partes:
            f.write("file '%s'\n" % p.replace('\\', '/'))
    subprocess.run(['ffmpeg', '-y', '-f', 'concat', '-safe', '0', '-i', lista,
                    '-c:a', 'libmp3lame', '-q:a', '4', destino],
                   check=True, capture_output=True)
    os.remove(lista)


def graba(k, ruta, force, edge=False):
    d = json.load(io.open(ruta, encoding='utf-8'))
    destino = os.path.join(SALIDA, d['audio'])
    if os.path.exists(destino) and not force:
        print('  ya existe: %s' % d['audio'])
        return 0
    nivel = d['level']
    vel, pausa = VELOCIDAD.get(nivel, 1.0), PAUSA.get(nivel, 0.7)
    pres = presentador_de(d['script'])
    tmp = tempfile.mkdtemp(prefix='examaudio-')
    partes, chars = [], 0
    sil = os.path.join(tmp, 'sil.mp3')
    silencio(pausa, sil)
    for i, (quien, texto) in enumerate(turnos(d['script'])):
        voz = voz_de(quien, pres)
        p = os.path.join(tmp, '%03d.mp3' % i)
        if edge:
            habla_edge(texto, voz[0], nivel, p)
        else:
            habla(k, texto, voz[1], vel, p)
        chars += len(texto)
        if partes:
            partes.append(sil)
        partes.append(p)
        print('    %02d %-12s %s...' % (i + 1, voz[0], texto[:46]))
    pega(partes, destino)
    kb = os.path.getsize(destino) // 1024
    print('  %s  %d KB  (%d caracteres%s)' % (d['audio'], kb, chars, ', Edge TTS' if edge else ''))
    return chars


def main():
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    force = '--force' in sys.argv
    edge = '--edge' in sys.argv
    if not os.path.isdir(SALIDA):
        os.makedirs(SALIDA)
    carpetas = args or [c for c in sorted(os.listdir(AQUI))
                        if os.path.isdir(os.path.join(AQUI, c))]
    k = None if edge else clave()
    total = 0
    for c in carpetas:
        d = os.path.join(AQUI, c)
        for f in sorted(os.listdir(d)):
            if f.endswith('.json'):
                print('%s/%s' % (c, f))
                total += graba(k, os.path.join(d, f), force, edge)
    print('\nTotal sintetizado: %d caracteres.' % total)


if __name__ == '__main__':
    main()
