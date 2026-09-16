"""Audio de las escuchas de secundaria (KET/PET/B2/C1) con edge-tts.

Recorre content/<nivel>/unit-*.json y genera el mp3 de cada actividad de
escucha (listening, listening_mc, listening_match) que declare `audio` y un
`data.script`. Reanudable: solo genera lo que falta; --force lo rehace todo.

Guiones con varias voces
------------------------
Un examen de C1 tiene entrevistas, dialogos y cinco monologos distintos: una
sola voz no sirve. El guion se escribe por lineas «HABLANTE: texto» y cada
hablante recibe una voz distinta (se reparten por orden de aparicion entre
un elenco britanico de mujeres y hombres; `data.voices` puede fijar la de un
hablante concreto, p. ej. {"Interviewer": "en-GB-RyanNeural"}). Las lineas
sin hablante las lee la narradora. Las acotaciones entre corchetes
«[pause]» no se leen: «[pause]» a solas mete un silencio de 1,5 s (el que
separa extractos en el examen). Los trozos se pegan con ffmpeg.

Uso:  python tools/gen_secondary_audio.py [--force] [--level c1a] [--unit 3]
"""
import os, re, json, glob, asyncio, sys, subprocess, tempfile, shutil
import edge_tts

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AUDIO = os.path.join(ROOT, "audio")
NARRADORA = "en-GB-SoniaNeural"          # la profesora, Miss Vega
ELENCO = ["en-GB-RyanNeural", "en-GB-LibbyNeural", "en-GB-ThomasNeural", "en-IE-EmilyNeural",
          "en-IE-ConnorNeural", "en-AU-NatashaNeural", "en-US-AndrewNeural", "en-GB-MaisieNeural",
          "en-CA-LiamNeural", "en-ZA-LeahNeural"]
RATE = "-6%"
TIPOS = ("listening", "listening_mc", "listening_match")
LINEA = re.compile(r"^([A-Z][A-Za-z0-9 .'’\-]{0,40}):\s*(.*)$")
FFMPEG = shutil.which("ffmpeg")


def segmentos(script, voces_fijas):
    """[(voz|None, texto)] — None es un silencio."""
    asignadas, out = {}, []
    for raw in script.split("\n"):
        l = raw.strip()
        if not l:
            continue
        if l.lower() in ("[pause]", "[silence]"):
            out.append((None, ""))
            continue
        m = LINEA.match(l)
        if m:
            quien, txt = m.group(1).strip(), m.group(2)
            if quien not in asignadas:
                asignadas[quien] = voces_fijas.get(quien) or ELENCO[len(asignadas) % len(ELENCO)]
            voz = asignadas[quien]
        else:
            voz, txt = NARRADORA, l
        txt = re.sub(r"\[[^\]]*\]", "", txt).strip()      # acotaciones
        txt = txt.replace("…", "...")
        if txt:
            out.append((voz, txt))
    return out


def collect(nivel=None, unidad=None):
    jobs = []
    for lv in ["ket", "pet", "b2f", "c1a"]:
        if nivel and lv != nivel:
            continue
        for f in sorted(glob.glob(os.path.join(ROOT, "content", lv, "unit-*.json"))):
            u = json.load(open(f, encoding="utf-8"))
            if unidad and u.get("number") != unidad:
                continue
            for a in u.get("activities", []):
                if a.get("type") in TIPOS and a.get("audio") and (a.get("data") or {}).get("script"):
                    out = os.path.join(AUDIO, a["audio"].replace("/", os.sep))
                    jobs.append((out, a["data"]["script"], (a["data"].get("voices") or {})))
    return jobs


async def una_voz(texto, voz, destino):
    await edge_tts.Communicate(texto, voz, rate=RATE).save(destino)


async def genera(out, script, voces):
    os.makedirs(os.path.dirname(out), exist_ok=True)
    segs = segmentos(script, voces)
    hablados = [s for s in segs if s[0]]
    if len(hablados) == 1 and len(segs) == 1:
        await una_voz(hablados[0][1], hablados[0][0], out)
        return
    if not FFMPEG:
        # sin ffmpeg no se puede pegar: se lee todo con la narradora
        await una_voz(" ".join(t for v, t in hablados), NARRADORA, out)
        return
    tmp = tempfile.mkdtemp(prefix="nisfun-")
    try:
        partes = []
        for i, (voz, txt) in enumerate(segs):
            p = os.path.join(tmp, f"{i:03d}.mp3")
            if voz is None:
                subprocess.run([FFMPEG, "-y", "-loglevel", "error", "-f", "lavfi", "-i", "anullsrc=r=24000:cl=mono",
                                "-t", "1.5", "-q:a", "9", p], check=True)
            else:
                await una_voz(txt, voz, p)
            partes.append(p)
        lista = os.path.join(tmp, "lista.txt")
        with open(lista, "w", encoding="utf-8") as f:
            for p in partes:
                f.write("file '" + p.replace("\\", "/").replace("'", "'\\''") + "'\n")
        # se recodifica: los trozos de edge-tts y el silencio no comparten
        # parametros y el concat en crudo salta en Safari
        subprocess.run([FFMPEG, "-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", lista,
                        "-ar", "24000", "-ac", "1", "-b:a", "48k", out], check=True)
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


async def main():
    args = sys.argv[1:]
    force = "--force" in args
    nivel = args[args.index("--level") + 1] if "--level" in args else None
    unidad = int(args[args.index("--unit") + 1]) if "--unit" in args else None
    jobs = collect(nivel, unidad)
    todo = [j for j in jobs if force or not os.path.exists(j[0])]
    print(f"total listening: {len(jobs)} · to generate: {len(todo)} · ffmpeg: {'yes' if FFMPEG else 'NO'}")
    ok = 0
    for out, script, voces in todo:
        try:
            await genera(out, script, voces)
            ok += 1
            print("OK", os.path.relpath(out, AUDIO), f"{os.path.getsize(out)//1024} KB")
        except Exception as e:
            print("ERR", os.path.relpath(out, AUDIO), str(e)[:120])
    print(f"DONE generated {ok}/{len(todo)}")

asyncio.run(main())
