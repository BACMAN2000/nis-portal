# -*- coding: utf-8 -*-
"""
Audio de los readers GENÉRICOS (earnest, tomsawyer, princepauper) + tiempos por palabra.

Uso:  python gen_reader_audio.py <libro> <nivel>
      python gen_reader_audio.py earnest b1
(ATTWN usa su propio gen_attwn_audio.py por las rutas históricas de su B1.)

Lee READINGS de <libro>-data-<nivel>.js y produce en <libro>-audio/<nivel>/:
  ch<N>-p<M>.mp3 + ch<N>-p<M>.json (WordBoundary) + ch<N>.mp3 (descarga).

Voces: earnest = en-GB-ThomasNeural (teatral británico, Wilde);
       tomsawyer = en-US-ChristopherNeural (narrador americano, Twain).
Rates por nivel: a2 -15%, b1 -8%, b2 -6%, c1 -4%. Gratis (Edge).
"""
import ast, asyncio, json, re, sys
from pathlib import Path

import edge_tts

ROOT   = Path(__file__).parent
VOICES = {"earnest": "en-GB-ThomasNeural", "tomsawyer": "en-US-ChristopherNeural",
          "princepauper": "en-GB-RyanNeural"}
RATES  = {"a2": "-15%", "b1": "-8%", "b2": "-6%", "c1": "-4%"}

def load_readings(book, level):
    src = (ROOT / f"{book}-data-{level}.js").read_text(encoding="utf-8")
    m = re.search(r"const READINGS = (\{.*?\n\})\s*;?\s*\n", src, re.S)
    if not m:
        sys.exit(f"No encuentro READINGS en {book}-data-{level}.js")
    return ast.literal_eval(m.group(1))

async def tts_words(text, mp3, jsn, voice, rate):
    if mp3.exists() and mp3.stat().st_size > 1000 and jsn.exists():
        return False
    words = []
    comm = edge_tts.Communicate(text, voice, rate=rate, boundary="WordBoundary")
    with open(mp3, "wb") as f:
        async for chunk in comm.stream():
            if chunk["type"] == "audio":
                f.write(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                words.append([round(chunk["offset"]/1e7, 3),
                              round((chunk["offset"]+chunk["duration"])/1e7, 3),
                              chunk["text"]])
    jsn.write_text(json.dumps(words, ensure_ascii=False), encoding="utf-8")
    return True

async def tts_plain(text, path, voice, rate):
    if path.exists() and path.stat().st_size > 1000:
        return False
    await edge_tts.Communicate(text, voice, rate=rate).save(str(path))
    return True

async def main():
    if len(sys.argv) < 3 or sys.argv[1] not in VOICES or sys.argv[2].lower() not in RATES:
        sys.exit("Uso: python gen_reader_audio.py <earnest|tomsawyer> <a2|b1|b2|c1>")
    book, level = sys.argv[1], sys.argv[2].lower()
    voice, rate = VOICES[book], RATES[level]
    out = ROOT / f"{book}-audio" / level
    out.mkdir(parents=True, exist_ok=True)
    readings = load_readings(book, level)
    made = kept = 0
    for n, paras in sorted(readings.items()):
        for i, p in enumerate(paras, 1):
            new = await tts_words(p, out / f"ch{n}-p{i}.mp3", out / f"ch{n}-p{i}.json", voice, rate)
            made += new; kept += (not new)
            print(("OK  " if new else "skip") + f" {book} {level} ch{n}-p{i}", flush=True)
        new = await tts_plain("\n\n".join(paras), out / f"ch{n}.mp3", voice, rate)
        made += new; kept += (not new)
        print(("OK  " if new else "skip") + f" {book} {level} ch{n} (full)", flush=True)
    print(f"Listo {book} {level}: {made} nuevos, {kept} existentes -> {out}")

if __name__ == "__main__":
    asyncio.run(main())
