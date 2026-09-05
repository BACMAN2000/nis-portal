# -*- coding: utf-8 -*-
"""Audio del entrenador de vocabulario YLE: por cada palabra de yle/vocab/<level>.json
dos mp3 con la misma voz de examinadora de los tests (Edge TTS, en-GB Libby a -6%,
igual que el reparto del audio de examen desde el 5-sep-2026; antes era Sonia con
el ritmo estirado por nivel, que sonaba tensa):
    yle-audio/vocab/<level>/<slug>.mp3      la palabra sola
    yle-audio/vocab/<level>/<slug>_ex.mp3   la frase de ejemplo
Solo genera lo que falta (para relanzar sin coste); con --force rehace todo, que es
lo que hay que usar al cambiar de voz. Sin ffmpeg: un mp3 por llamada.

    python yle/tools/gen_vocab_audio.py starters
    python yle/tools/gen_vocab_audio.py all
    python yle/tools/gen_vocab_audio.py all --force
"""
import os, sys, json, io, asyncio
import edge_tts

AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.dirname(os.path.dirname(AQUI))
VOICE = 'en-GB-LibbyNeural'
RATE = {'starters': '-6%', 'movers': '-6%', 'flyers': '-6%'}
PAR = 6
FORCE = '--force' in sys.argv


async def uno(sem, texto, out, rate):
    if not FORCE and os.path.exists(out) and os.path.getsize(out) > 1000: return False
    async with sem:
        for intento in range(3):
            try:
                await edge_tts.Communicate(texto, VOICE, rate=rate).save(out)
                if os.path.getsize(out) > 1000: return True
            except Exception as e:
                print('  reintento', out, e)
                await asyncio.sleep(2)
    return False


async def nivel(level):
    data = json.load(io.open(os.path.join(RAIZ, 'yle', 'vocab', level + '.json'), encoding='utf-8'))
    d = os.path.join(RAIZ, 'yle-audio', 'vocab', level); os.makedirs(d, exist_ok=True)
    sem = asyncio.Semaphore(PAR); tareas = []
    for w in data['words']:
        # la palabra sola (sin la aclaración entre paréntesis) y la frase
        sola = w['w'].split(' (')[0].split(' / ')[0]
        tareas.append(uno(sem, sola + '.', os.path.join(d, w['s'] + '.mp3'), RATE[level]))
        tareas.append(uno(sem, w['ex'], os.path.join(d, w['s'] + '_ex.mp3'), RATE[level]))
    r = await asyncio.gather(*tareas)
    print('%s: %d archivos nuevos de %d' % (level, sum(1 for x in r if x), len(tareas)))


if __name__ == '__main__':
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    arg = args[0] if args else 'all'
    for lv in (['starters', 'movers', 'flyers'] if arg == 'all' else [arg]):
        asyncio.run(nivel(lv))
