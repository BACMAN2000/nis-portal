# -*- coding: utf-8 -*-
"""Lleva a la copia de Cohasset los cambios del motor YLE, por ancla.

yle-practice.html vive dos veces (nis-portal y el clon de deploy de cohasset.pe)
y las dos copias NO son iguales: cambian el titulo, el favicon, la hoja de marca,
el logo de la cabecera y el boton de volver al portal — unas 60 lineas. Copiar el
archivo entero borraria eso, asi que aqui se aplican solo los trozos nuevos,
buscando su ancla. Si un ancla no aparece o ya esta aplicado, lo dice y no toca
nada.

    python yle/tools/porta_motor_cohasset.py [ruta del clon]
"""
import io, os, re, sys

AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.dirname(os.path.dirname(AQUI))
DESTINO = sys.argv[1] if len(sys.argv) > 1 else r'C:\Projects\cohasset-community\repo'


def trozo(src, ini, fin):
    """El texto de nis-portal entre dos marcas, ambas incluidas."""
    i = src.index(ini); j = src.index(fin, i)
    return src[i:j]


def main():
    org = io.open(os.path.join(RAIZ, 'yle-practice.html'), encoding='utf-8').read()
    ruta = os.path.join(DESTINO, 'yle-practice.html')
    if not os.path.exists(ruta):
        print('no encuentro %s' % ruta); return 1
    dst = io.open(ruta, encoding='utf-8').read()

    # (ancla en el destino, texto nuevo sacado del original, marca para saber si ya esta)
    parches = [
        ("    } else if(P.type === 'story_one_word'){",
         trozo(org, "    } else if(P.type === 'dialogue_mc8'){", "    } else if(P.type === 'story_one_word'){"),
         "dialogue_mc8"),
        ("    } else if(P.type === 'personal_questions'){",
         trozo(org, "    } else if(P.type === 'find_differences_statements'){", "    } else if(P.type === 'personal_questions'){"),
         "find_differences_statements"),
    ]
    hechos, saltados = [], []
    for ancla, nuevo, marca in parches:
        if marca in dst: saltados.append(marca); continue
        if ancla not in dst: print('  !! no encuentro el ancla de %s' % marca); continue
        dst = dst.replace(ancla, nuevo + ancla, 1); hechos.append(marca)

    # sustituciones de una linea
    linea = [
        ("  if(P.type === 'productive_writing') return P.complete[i].a;",
         "  if(P.type === 'productive_writing') return P.complete[i].a;\n  if(P.type === 'dialogue_mc8') return P.items[i].key;\n  if(P.type === 'open_cloze') return P.key[i];",
         'keyOf'),
        ("if(P.type === 'mc_cloze_copy') return P.key.length;",
         "if(P.type === 'mc_cloze_copy' || P.type === 'open_cloze') return P.key.length;", 'countItems'),
        ("if(P.type === 'productive_writing') return P.complete.length; return (P.items || []).length; }",
         "if(P.type === 'productive_writing') return P.complete.length; if(P.type === 'story_writing') return 0; return (P.items || []).length; }", 'countItems story'),
        ("if(P.type === 'productive_writing') return (P.answer || []).length + ((P.write || {}).n || 2); return 0; }",
         "if(P.type === 'productive_writing') return (P.answer || []).length + ((P.write || {}).n || 2); if(P.type === 'story_writing') return 1; return 0; }", 'teacherItems'),
        ("official scales: vocabulary and grammar, pronunciation, interaction",
         "official scales: ' + (LEVEL === 'starters' ? 'vocabulary' : 'vocabulary and grammar') + ', pronunciation, interaction", 'escala de Starters'),
    ]
    for viejo, nuevo, marca in linea:
        if nuevo in dst: saltados.append(marca); continue
        if viejo not in dst: print('  !! no encuentro %s' % marca); continue
        dst = dst.replace(viejo, nuevo, 1); hechos.append(marca)

    # openTest y la entrada directa por ?paper=&part= (el puente desde el curso)
    if 'irA' not in dst:
        BLANCO = chr(10) * 2
        if 'function openTest(i){' in dst:
            dst = dst.replace(trozo(dst, 'function openTest(i){', BLANCO),
                              trozo(org, 'function openTest(i, irA){', BLANCO), 1)
            hechos.append('openTest con irA')
        v2 = "      var want = +(qs.get('test') || 0); if(want && INDEX.some(function(t){ return t.number === want && !LOCKED[t.number]; })) openTest(INDEX.findIndex(function(t){ return t.number === want; }));"
        if v2 in dst:
            dst = dst.replace(v2, trozo(org, '      /* ?test=N abre ese test', chr(10) + '    });').rstrip(), 1)
            hechos.append('?paper= y &part=')
    else:
        saltados.append('openTest / paper+part')

    # el contador de palabras de la historia
    ancla_bind = "  $$('[data-mode]').forEach(function(b){ b.onclick = function(){ mode = b.dataset.mode; render(); }; });"
    if 'textarea[data-name$="_s0"]' not in dst and ancla_bind in dst:
        dst = dst.replace(ancla_bind, trozo(org, ancla_bind, "  $$('[data-check]')").rstrip() + '\n', 1)
        hechos.append('contador de palabras')
    elif 'textarea[data-name$="_s0"]' in dst:
        saltados.append('contador de palabras')

    io.open(ruta, 'w', encoding='utf-8', newline='').write(dst)
    print('aplicados: %s' % (', '.join(hechos) or 'nada'))
    if saltados: print('ya estaban: %s' % ', '.join(saltados))
    return 0


if __name__ == '__main__':
    sys.exit(main())
