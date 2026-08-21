# -*- coding: utf-8 -*-
"""
Genera el audio del reader And Then There Were None.

Uso:  python gen_attwn_audio.py [a2|b1|c1]   (sin argumento: b1)

Lee los retellings (READINGS) del archivo de datos del nivel
(attwn-data-<nivel>.js), asi que si cambia el texto basta con re-ejecutar.

Salida:
  b1 -> attwn-audio/ch<N>-p<M>.mp3 y ch<N>.mp3          (rutas historicas)
  a2 -> attwn-audio/a2/...   c1 -> attwn-audio/c1/...

Voz: en-GB-RyanNeural (narrador britanico, gratis via edge-tts).
Rate por nivel: a2 -15%, b1 -8%, c1 -4%. No usa ElevenLabs: cero creditos.
"""
import ast, asyncio, re, sys
from pathlib import Path

import edge_tts

ROOT  = Path(__file__).parent
VOICE = "en-GB-RyanNeural"
RATES = {"a2": "-15%", "b1": "-8%", "c1": "-4%"}

def load_readings(level):
    src = (ROOT / f"attwn-data-{level}.js").read_text(encoding="utf-8")
    m = re.search(r"const READINGS = (\{.*?\n\})\s*;?\s*\n", src, re.S)
    if not m:
        sys.exit(f"No encuentro el bloque READINGS en attwn-data-{level}.js")
    return ast.literal_eval(m.group(1))

async def tts(text, path, rate):
    if path.exists() and path.stat().st_size > 1000:
        return False
    await edge_tts.Communicate(text, VOICE, rate=rate).save(str(path))
    return True

async def main():
    level = (sys.argv[1] if len(sys.argv) > 1 else "b1").lower()
    if level not in RATES:
        sys.exit("Nivel invalido: usa a2, b1 o c1")
    out = ROOT / "attwn-audio" / ("" if level == "b1" else level)
    out.mkdir(parents=True, exist_ok=True)
    rate = RATES[level]
    readings = load_readings(level)
    made = kept = 0
    for n, paras in sorted(readings.items()):
        for i, p in enumerate(paras, 1):
            new = await tts(p, out / f"ch{n}-p{i}.mp3", rate)
            made += new; kept += (not new)
            print(("OK  " if new else "skip") + f" {level} ch{n}-p{i}", flush=True)
        new = await tts("\n\n".join(paras), out / f"ch{n}.mp3", rate)
        made += new; kept += (not new)
        print(("OK  " if new else "skip") + f" {level} ch{n} (full)", flush=True)
    print(f"Listo {level}: {made} generados, {kept} ya existian -> {out}")

if __name__ == "__main__":
    asyncio.run(main())
