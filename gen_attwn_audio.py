# -*- coding: utf-8 -*-
"""
Genera el audio del reader And Then There Were None (attwn-audio/).

Lee los retellings (READINGS) directamente de and-then-there-were-none.html,
asi que si cambia el texto basta con re-ejecutar:  python gen_attwn_audio.py

Salida:
  attwn-audio/ch<N>-p<M>.mp3   un mp3 por parrafo (para el read-along sincronizado)
  attwn-audio/ch<N>.mp3        capitulo completo (boton de descarga)

Voz: en-GB-RyanNeural (narrador britanico, gratis via edge-tts), rate -8%
para alumnos B1. No usa ElevenLabs: cero creditos.
"""
import ast, asyncio, re, sys
from pathlib import Path

import edge_tts

ROOT  = Path(__file__).parent
HTML  = ROOT / "and-then-there-were-none.html"
OUT   = ROOT / "attwn-audio"
VOICE = "en-GB-RyanNeural"
RATE  = "-8%"

def load_readings():
    src = HTML.read_text(encoding="utf-8")
    m = re.search(r"const READINGS = (\{.*?\n\})\s*;?\s*\n", src, re.S)
    if not m:
        sys.exit("No encuentro el bloque READINGS en el HTML")
    return ast.literal_eval(m.group(1))

async def tts(text, path):
    if path.exists() and path.stat().st_size > 1000:
        return False
    await edge_tts.Communicate(text, VOICE, rate=RATE).save(str(path))
    return True

async def main():
    OUT.mkdir(exist_ok=True)
    readings = load_readings()
    made = kept = 0
    for n, paras in sorted(readings.items()):
        for i, p in enumerate(paras, 1):
            new = await tts(p, OUT / f"ch{n}-p{i}.mp3")
            made += new; kept += (not new)
            print(("OK  " if new else "skip") + f" ch{n}-p{i}", flush=True)
        new = await tts("\n\n".join(paras), OUT / f"ch{n}.mp3")
        made += new; kept += (not new)
        print(("OK  " if new else "skip") + f" ch{n} (full)", flush=True)
    print(f"Listo: {made} generados, {kept} ya existian -> {OUT}")

if __name__ == "__main__":
    asyncio.run(main())
