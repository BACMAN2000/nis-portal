# -*- coding: utf-8 -*-
"""Graba el audio de las actividades de Listening del curso que aun no lo tienen.

Las unidades de primaria (Starters/Movers/Flyers) ya estan grabadas; los cursos
de secundaria (KET, PET, B2 First) declaraban su mp3 en el JSON y no existia
ninguno, asi que la actividad salia muda.

    python nis-fun/tools/gen_audio_curso.py            # solo lo que falta
    python nis-fun/tools/gen_audio_curso.py ket        # un nivel
    python nis-fun/tools/gen_audio_curso.py --force    # regenerar todo

La voz sale de `data.voice_note` (profesora / maestro …) y el ritmo, del nivel:
cuanto mas bajo el examen, mas despacio habla el examinador. Edge TTS, gratis,
las mismas voces en-GB que el audio de los examenes YLE.
"""
import asyncio, glob, io, json, os, re, subprocess, sys

AQUI = os.path.dirname(os.path.abspath(__file__))
CURSO = os.path.dirname(AQUI)                     # nis-fun

MUJER, HOMBRE = 'en-GB-LibbyNeural', 'en-GB-ThomasNeural'
RITMO = {'starters': '-14%', 'movers': '-10%', 'flyers': '-6%',
         'ket': '-8%', 'pet': '-4%', 'b2f': '+0%'}
# la nota de voz esta en espanol: «Voz: la profesora (Miss Vega), …»
HOMBRES = re.compile(r'\b(maestro|profesor(?!a)|señor|mr\.?|sr\.?|entrenador|padre|chico|niño)\b', re.I)


def voz_de(nota):
    return HOMBRE if nota and HOMBRES.search(nota) else MUJER


async def di(texto, voz, ritmo, destino):
    import edge_tts
    tmp = destino + '.tmp.mp3'
    await edge_tts.Communicate(texto, voz, rate=ritmo).save(tmp)
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', tmp,
                    '-ac', '1', '-b:a', '64k', destino], check=True)
    os.remove(tmp)


def main():
    args = [a for a in sys.argv[1:] if not a.startswith('-')]
    force = '--force' in sys.argv
    niveles = args or ['starters', 'movers', 'flyers', 'ket', 'pet', 'b2f']
    faltan = []
    for lv in niveles:
        for f in sorted(glob.glob(os.path.join(CURSO, 'content', lv, 'unit-*.json'))):
            u = json.load(io.open(f, encoding='utf-8'))
            for a in (u.get('activities') or []):
                ruta = a.get('audio')
                d = a.get('data') or {}
                if not ruta or not (d.get('script') or '').strip():
                    continue
                destino = os.path.join(CURSO, 'audio', *ruta.split('/'))
                if os.path.exists(destino) and not force:
                    continue
                faltan.append((lv, u.get('number'), destino, d['script'], d.get('voice_note')))
    if not faltan:
        print('no falta ningun audio'); return
    print('%d por grabar' % len(faltan))
    for lv, n, destino, script, nota in faltan:
        os.makedirs(os.path.dirname(destino), exist_ok=True)
        voz, ritmo = voz_de(nota), RITMO.get(lv, '+0%')
        asyncio.run(di(script, voz, ritmo, destino))
        seg = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration',
                              '-of', 'csv=p=0', destino], capture_output=True, text=True).stdout.strip()
        print('  %-5s u%-3s %-28s %s %s  %.0f s' % (lv, n, os.path.basename(destino),
              voz.split('-')[-1].replace('Neural', ''), ritmo, float(seg or 0)))


if __name__ == '__main__':
    main()
