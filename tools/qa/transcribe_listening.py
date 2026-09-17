import sys, json, re, difflib, os, time
from faster_whisper import WhisperModel
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..','mocks-cambridge'))
model = WhisperModel("tiny.en", device="cpu", compute_type="int8", cpu_threads=6)
def norm(s): return re.sub(r'[^a-z0-9 ]+',' ',s.lower().replace("’","'")).split()
pairs=json.load(open(sys.argv[1],encoding='utf-8'))
done=set()
if os.path.exists(sys.argv[2]):
    for l in open(sys.argv[2],encoding='utf-8'):
        try: done.add(json.loads(l)['file'])
        except Exception: pass
pairs=[p for p in pairs if p['file'] not in done]
print('pendientes',len(pairs),flush=True)
out=open(sys.argv[2],'a',encoding='utf-8'); t0=time.time()
for i,p in enumerate(pairs):
    try:
        segs,_=model.transcribe('mp3/'+p['file'], vad_filter=True, beam_size=1)
        txt=' '.join(s.text for s in segs)
        r=difflib.SequenceMatcher(None,norm(p['script']),norm(txt)).ratio()
        out.write(json.dumps({'test':p['test'],'part':p['part'],'file':p['file'],'ratio':round(r,3),'heard':len(norm(txt)),'script':len(norm(p['script'])),'sample':txt[:160] if r<0.6 else ''})+'\n'); out.flush()
    except Exception as e:
        out.write(json.dumps({'test':p['test'],'file':p['file'],'error':str(e)[:200]})+'\n'); out.flush()
    if (i+1)%50==0: print(f'{i+1}/{len(pairs)} {time.time()-t0:.0f}s', flush=True)
print('DONE',len(pairs),f'{time.time()-t0:.0f}s')
