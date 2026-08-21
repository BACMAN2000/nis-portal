# -*- coding: utf-8 -*-
"""
Genera el audio del reader And Then There Were None + tiempos por palabra.

Uso:  python gen_attwn_audio.py [a2|b1|b2|c1]   (sin argumento: b1)

Lee los retellings (READINGS) del archivo de datos del nivel
(attwn-data-<nivel>.js). Por cada parrafo produce:
  ch<N>-p<M>.mp3    audio
  ch<N>-p<M>.json   [[iniSeg, finSeg, "palabra"], ...]  (WordBoundary de edge-tts)
y ademas ch<N>.mp3 (capitulo completo, para el boton de descarga; sin json).

El json alimenta el resaltado palabra a palabra del reproductor: si falta,
se re-sintetiza el parrafo aunque el mp3 exista (audio y tiempos deben salir
de la MISMA sintesis para ir en sync).

Salida: b1 -> attwn-audio/   a2/b2/c1 -> attwn-audio/<nivel>/
Voz: en-GB-RyanNeural. Rate: a2 -15%, b1 -8%, b2 -6%, c1 -4%. Gratis (Edge).
"""
import ast, asyncio, json, re, sys
from pathlib import Path

import edge_tts

ROOT  = Path(__file__).parent
VOICE = "en-GB-RyanNeural"
RATES = {"a2": "-15%", "b1": "-8%", "b2": "-6%", "c1": "-4%"}

def load_readings(level):
    src = (ROOT / f"attwn-data-{level}.js").read_text(encoding="utf-8")
    m = re.search(r"const READINGS = (\{.*?\n\})\s*;?\s*\n", src, re.S)
    if not m:
        sys.exit(f"No encuentro el bloque READINGS en attwn-data-{level}.js")
    return ast.literal_eval(m.group(1))

async def tts_words(text, mp3, jsn, rate):
    """Sintetiza audio + tiempos de palabra en una sola pasada."""
    if mp3.exists() and mp3.stat().st_size > 1000 and jsn.exists():
        return False
    words = []
    comm = edge_tts.Communicate(text, VOICE, rate=rate, boundary="WordBoundary")
    with open(mp3, "wb") as f:
        async for chunk in comm.stream():
            if chunk["type"] == "audio":
                f.write(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                t0 = chunk["offset"] / 1e7
                t1 = (chunk["offset"] + chunk["duration"]) / 1e7
                words.append([round(t0, 3), round(t1, 3), chunk["text"]])
    jsn.write_text(json.dumps(words, ensure_ascii=False), encoding="utf-8")
    return True

async def tts_plain(text, path, rate):
    if path.exists() and path.stat().st_size > 1000:
        return False
    await edge_tts.Communicate(text, VOICE, rate=rate).save(str(path))
    return True

async def main():
    level = (sys.argv[1] if len(sys.argv) > 1 else "b1").lower()
    if level not in RATES:
        sys.exit("Nivel invalido: usa a2, b1, b2 o c1")
    out = ROOT / "attwn-audio" / ("" if level == "b1" else level)
    out.mkdir(parents=True, exist_ok=True)
    rate = RATES[level]
    readings = load_readings(level)
    made = kept = 0
    for n, paras in sorted(readings.items()):
        for i, p in enumerate(paras, 1):
            new = await tts_words(p, out / f"ch{n}-p{i}.mp3", out / f"ch{n}-p{i}.json", rate)
            made += new; kept += (not new)
            print(("OK  " if new else "skip") + f" {level} ch{n}-p{i}", flush=True)
        new = await tts_plain("\n\n".join(paras), out / f"ch{n}.mp3", rate)
        made += new; kept += (not new)
        print(("OK  " if new else "skip") + f" {level} ch{n} (full)", flush=True)
    print(f"Listo {level}: {made} generados, {kept} ya existian -> {out}")

if __name__ == "__main__":
    asyncio.run(main())
