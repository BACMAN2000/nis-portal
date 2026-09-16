"""Audio de los dialogos del Grammar Lab (edge-tts, una voz por personaje).

Lee content/<nivel>/grammar/<id>.json, arma el guion «Hablante: texto» del
dialogo y lo graba en audio/grammar/<nivel>/<id>.mp3 con el mismo pegado
multivoz de tools/gen_secondary_audio.py. El elenco tiene voz fija para que
Sofia suene igual en todos los temas.

Uso:  python tools/grammar-lab/gen_audio.py [--force] [--level b2f] [--only inversion]
"""
import os, sys, re, json, glob, asyncio, importlib.util

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
spec = importlib.util.spec_from_file_location("gsa", os.path.join(ROOT, "tools", "gen_secondary_audio.py"))
gsa = importlib.util.module_from_spec(spec); spec.loader.exec_module(gsa)

VOCES = {
    "Miss Vega": "en-GB-SoniaNeural",
    "Sofia": "en-GB-LibbyNeural",
    "Nadia": "en-GB-MaisieNeural",
    "Mateo": "en-GB-RyanNeural",
    "Liam": "en-GB-ThomasNeural",
}
limpia = lambda t: re.sub(r"<[^>]+>", "", t).replace("&amp;", "&")


async def main():
    args = sys.argv[1:]
    force = "--force" in args
    nivel = args[args.index("--level") + 1] if "--level" in args else None
    only = args[args.index("--only") + 1] if "--only" in args else None
    jobs = []
    for lv in ([nivel] if nivel else ["a1", "ket", "pet", "b2f", "c1a"]):
        for p in sorted(glob.glob(os.path.join(ROOT, "content", lv, "grammar", "*.json"))):
            tid = os.path.splitext(os.path.basename(p))[0]
            if tid == "index" or (only and tid != only):
                continue
            d = json.load(open(p, encoding="utf-8"))
            lines = (d.get("dialogue") or {}).get("lines") or []
            if not lines:
                continue
            script = "\n".join(f"{l['speaker']}: {limpia(l['text'])}" for l in lines)
            out = os.path.join(ROOT, "audio", "grammar", lv, tid + ".mp3")
            jobs.append((out, script))
    todo = [jb for jb in jobs if force or not os.path.exists(jb[0])]
    print(f"dialogos: {len(jobs)} · a generar: {len(todo)}")
    for i, (out, script) in enumerate(todo, 1):
        try:
            await gsa.genera(out, script, VOCES)
            print(f"  [{i}/{len(todo)}] {os.path.relpath(out, ROOT)}  {os.path.getsize(out)//1024} KB")
        except Exception as e:
            print(f"  ERROR {out}: {e}")
    print("hecho")


if __name__ == "__main__":
    asyncio.run(main())
