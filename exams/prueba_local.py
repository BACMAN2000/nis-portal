# -*- coding: utf-8 -*-
"""Copia de pruebas de unit-exam.html con un Supabase de mentira.

Sirve para recorrer el examen entero en local sin tocar la base ni los datos de
ningun alumno: los examenes salen de los JSON del disco y el audio del mp3
local. Genera _test-unit-exam.html, que NO se publica (se borra al terminar).

    python _test-unit-exam.py [teacher|student-open|student-locked]
"""
import io, json, os, re, sys

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODO = (sys.argv[1] if len(sys.argv) > 1 else 'teacher')

examenes = {}
d = os.path.join(RAIZ, 'exams', 'g9-u34')
for f in sorted(os.listdir(d)):
    if f.endswith('.json'):
        e = json.load(io.open(os.path.join(d, f), encoding='utf-8'))
        guion = e.pop('script', '')
        mp3 = e.pop('audio', '')
        e['questions'] = sum(len(p.get('items', [])) for p in e.get('parts', []))
        examenes[e['kind'] + ':' + e['level']] = {'e': e, 'script': guion, 'mp3': mp3}

rol = 'teacher' if MODO == 'teacher' else 'student'
abierto = 'true' if MODO != 'student-locked' else 'false'

STUB = """
<script>
/* ===== SUPABASE DE MENTIRA — solo en _test-unit-exam.html ===== */
const _DATOS = %s;
const _ROL = '%s', _ABIERTO = %s;
function _res(data){ return Promise.resolve({data, error:null}); }
function _tabla(nombre){
  const q = {_f:{}, select(){ return q; },
    eq(k,v){ q._f[k]=v; return q; }, in(){ return q; },
    order(){ return q; }, limit(){ return q; },
    maybeSingle(){ return q._run(true); },
    single(){ return q._run(true); },
    insert(){ return _res(null); }, upsert(){ return _res(null); },
    then(f,g){ return q._run(false).then(f,g); },
    _run(uno){
      if(nombre==='profiles') return _res({role:_ROL, full_name:'QA Tester', first_name:'QA',
        email:'qa@example.test', grade_id:9, section:'A'});
      if(nombre==='reader_exam_access'){
        const filas=Object.keys(_DATOS).map(k=>({key:'g9:u3-4:'+k, scope:'all', unlocked:_ABIERTO,
          extra_min:0, opens_at:null, closes_at:null}));
        return _res(filas);
      }
      if(nombre==='unit_exams_index'){
        return _res(Object.keys(_DATOS).map(k=>{ const e=_DATOS[k].e;
          return {kind:e.kind, level:e.level, title:e.title, minutes:e.minutes,
                  questions:e.questions, can_open:(_ROL!=='student')||_ABIERTO}; }));
      }
      if(nombre==='unit_exams'){
        const k=q._f.kind+':'+q._f.level, x=_DATOS[k];
        return x?_res({title:x.e.title, minutes:x.e.minutes, data:x.e}):_res(null);
      }
      if(nombre==='unit_exam_scripts'){
        const k=q._f.kind+':'+q._f.level, x=_DATOS[k];
        return x?_res({script:x.script}):_res(null);
      }
      return uno?_res(null):_res([]);
    }};
  return q;
}
window.supabase = { createClient(){ return {
  auth:{ getUser(){ return Promise.resolve({data:{user:{id:'00000000-0000-0000-0000-000000000001',
                                                       email:'qa@example.test'}}}); } },
  rpc(){ return Promise.resolve({data:new Date().toISOString()}); },
  from(n){ return _tabla(n); },
  storage:{ from(){ return { createSignedUrl(p){
    const k=p.split('/')[2]+':'+p.split('/')[3].replace('.mp3','');
    const x=_DATOS[k];
    return Promise.resolve({data:{signedUrl: x?('exam-audio/'+x.mp3):null}, error:null});
  } }; } }
}; } };
</script>
""" % (json.dumps(examenes, ensure_ascii=False), rol, abierto)

html = io.open(os.path.join(RAIZ, 'unit-exam.html'), encoding='utf-8').read()
# El stub tiene que reemplazar al CDN de Supabase, no sumarse: si el de verdad
# carga despues, machaca el de mentira y la prueba se va a la base real.
# El reemplazo va como funcion, no como cadena: re.sub interpreta los escapes
# del texto de reemplazo, y convertia cada \n del JSON en un salto de linea de
# verdad dentro del string de JavaScript. La pagina moria con un
# "Invalid or unexpected token" que no señalaba a nada.
html = re.sub(r'<script src="https://cdn\.jsdelivr\.net/npm/@supabase[^>]*></script>',
              lambda m: STUB, html, count=1)
html = html.replace('<title>Unit Exams', '<title>[PRUEBA %s] Unit Exams' % MODO)
io.open(os.path.join(RAIZ, '_test-unit-exam.html'), 'w', encoding='utf-8').write(html)
print('_test-unit-exam.html generado en modo %s (%d examenes)' % (MODO, len(examenes)))
