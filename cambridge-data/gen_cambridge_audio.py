# -*- coding: utf-8 -*-
"""Graba el audio de los Listening de los examenes de secundaria (KET, PET,
B2 First, C1 Advanced, C2 Proficiency).

Los guiones estaban escritos dentro de `cambridge-data/cambridge-<nivel>.js`
—en `item.audio` para las partes de opciones y en `ex.audio` para las de
completar— pero no existia ni un mp3: la pagina daba las preguntas y no habia
nada que escuchar.

    python cambridge-data/gen_cambridge_audio.py           # lo que falte
    python cambridge-data/gen_cambridge_audio.py fce       # un nivel
    python cambridge-data/gen_cambridge_audio.py --force

Cada ejercicio sale en un solo mp3, con los extractos numerados («Extract one»)
y una pausa entre ellos, como en el examen. Las voces se reparten por el
hablante que marca el guion (Woman:, Man:, Speaker One:...). Edge TTS, gratis,
las mismas voces en-GB del resto de la casa. Salida:
cambridge-audio/<nivel>/tNN-eN.mp3
"""
import asyncio, io, json, os, re, subprocess, sys, tempfile

AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.dirname(AQUI)
SALIDA = os.path.join(RAIZ, 'cambridge-audio')

F, M, NARR = 'en-GB-LibbyNeural', 'en-GB-ThomasNeural', 'en-GB-SoniaNeural'
RITMO = {'ket': '-10%', 'pet': '-6%', 'fce': '-2%', 'cae': '+0%', 'cpe': '+0%'}
HABLANTE = re.compile(r'^\s*([A-Z][A-Za-z .]{1,22}?)\s*:\s*')
ES_MUJER = re.compile(r'(woman|female|girl|mrs|miss|ms|she|presenter|interviewer|maria|anna|sarah|emma|laura|julia)', re.I)
ES_HOMBRE = re.compile(r'(man|male|boy|mr|he|david|john|peter|tom|carlos|james)', re.I)
NUM = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']


def voz_de(quien, i):
    if not quien:
        return F if i % 2 == 0 else M
    if ES_MUJER.search(quien): return F
    if ES_HOMBRE.search(quien): return M
    return F if i % 2 == 0 else M


def trocea(texto):
    """parte un guion en (voz, frase) por las etiquetas de hablante"""
    partes, actual, quien, i = [], [], None, 0
    for linea in re.split(r'(?=(?:[A-Z][A-Za-z .]{1,22}:))', texto):
        linea = linea.strip()
        if not linea:
            continue
        m = HABLANTE.match(linea)
        if m:
            quien = m.group(1); linea = linea[m.end():].strip()
        partes.append((voz_de(quien, i), linea)); i += 1
    return partes or [(NARR, texto)]


async def habla(texto, voz, ritmo, destino):
    import edge_tts
    await edge_tts.Communicate(texto, voz, rate=ritmo).save(destino)


def silencio(seg, destino):
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'lavfi', '-i', 'anullsrc=r=24000:cl=mono',
                    '-t', str(seg), '-b:a', '48k', destino], check=True)


def junta(trozos, destino):
    lista = destino + '.txt'
    with io.open(lista, 'w', encoding='utf-8') as f:
        for t in trozos:
            f.write("file '%s'\n" % t.replace('\\', '/'))
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', lista,
                    '-ac', '1', '-b:a', '48k', destino], check=True)
    os.remove(lista)


def guiones(ex):
    """(titulo hablado, texto) de cada trozo del ejercicio"""
    fuera = []
    if ex.get('audio'):
        fuera.append((None, ex['audio']))
    for i, it in enumerate(ex.get('items') or []):
        if it.get('audio'):
            fuera.append(('Extract %s.' % NUM[i] if i < len(NUM) else 'Extract %d.' % (i + 1), it['audio']))
    return fuera


def carga(nivel):
    src = io.open(os.path.join(AQUI, 'cambridge-%s.js' % nivel), encoding='utf-8').read()
    js = subprocess.run(['node', '-e',
                         'const src=require("fs").readFileSync(process.argv[1],"utf8");'
                         'const CAM=new Function("window",src+"\\n;return CAM_%s;")({});'
                         'process.stdout.write(JSON.stringify(CAM.lessons||[]))' % nivel.upper(),
                         os.path.join(AQUI, 'cambridge-%s.js' % nivel)],
                        capture_output=True, text=True, encoding='utf-8')
    return json.loads(js.stdout)


def main():
    args = [a for a in sys.argv[1:] if not a.startswith('-')]
    force = '--force' in sys.argv
    niveles = args or ['ket', 'pet', 'fce', 'cae', 'cpe']
    tmp = tempfile.mkdtemp(prefix='camaudio_')
    sil = os.path.join(tmp, 'sil.mp3'); silencio(1.2, sil)
    silLargo = os.path.join(tmp, 'sil2.mp3'); silencio(2.5, silLargo)
    hechos = 0
    for lv in niveles:
        lecciones = carga(lv)
        os.makedirs(os.path.join(SALIDA, lv), exist_ok=True)
        for ti, t in enumerate(lecciones):
            for ei, ex in enumerate(t.get('exercises') or []):
                if ex.get('tl') != 'Listening':
                    continue
                trozos_guion = guiones(ex)
                if not trozos_guion:
                    continue
                destino = os.path.join(SALIDA, lv, 't%02d-e%d.mp3' % (ti + 1, ei + 1))
                if os.path.exists(destino) and not force:
                    continue
                piezas = []
                for k, (titulo, texto) in enumerate(trozos_guion):
                    if titulo:
                        p = os.path.join(tmp, 'n%d.mp3' % len(piezas))
                        asyncio.run(habla(titulo, NARR, '-6%', p)); piezas.append(p); piezas.append(sil)
                    for j, (voz, frase) in enumerate(trocea(texto)):
                        if not frase.strip():
                            continue
                        p = os.path.join(tmp, 'p%d_%d.mp3' % (len(piezas), j))
                        asyncio.run(habla(frase, voz, RITMO.get(lv, '+0%'), p))
                        piezas.append(p)
                    piezas.append(silLargo)
                junta(piezas, destino)
                dur = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration',
                                      '-of', 'csv=p=0', destino], capture_output=True, text=True).stdout.strip()
                hechos += 1
                print('  %-4s test %2d  ejercicio %d  %-18s %.0f s' % (lv, ti + 1, ei + 1, os.path.basename(destino), float(dur or 0)))
                sys.stdout.flush()
    print('grabados: %d' % hechos)


if __name__ == '__main__':
    main()
