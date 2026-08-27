# -*- coding: utf-8 -*-
"""Pasa el Scope & Sequence 2026 de Excel a JSON para el portal.

El documento maestro (NIS_English_Master_SS_2026.xlsx, 24 hojas) lo mantiene
la coordinacion en OneDrive. Los profesores no deberian tener que abrir un
Excel de 24 pestanas para saber que toca en su grado, asi que aqui se pasa a
un JSON que el portal sirve ya ordenado por grado y por destreza.

Se toma lo que un profesor necesita en clase:
  pathway     nivel CEFR, examen Cambridge y ciclo MINEDU de cada grado
  benchmarks  que debe saber hacer el alumno al acabar el grado, por destreza
  unidades    los seis temas del grado con su detalle por seccion
  calendario  fechas de simulacros y examen oficial

El resto de hojas (rubricas, guia de padres, CLIL) se deja fuera a
proposito: son documentos de coordinacion, no material de aula, y meterlos
convierte el panel en otro Excel.

    python scope/extrae_scope.py [ruta al xlsx]
"""
import io, json, os, re, sys

import openpyxl

AQUI = os.path.dirname(os.path.abspath(__file__))
POR_DEFECTO = os.path.join(
    os.path.expanduser("~"), "OneDrive", "09_Instituciones", "NNORDIC",
    "NIS_English_Master_SS_2026.xlsx")
SALIDA = os.path.join(AQUI, "scope-2026.json")


def limpia(v):
    if v is None:
        return ""
    return re.sub(r"[ \t]+", " ", str(v)).strip()


def filas(ws):
    for r in ws.iter_rows(values_only=True):
        yield [limpia(c) for c in r]


def cabecera(fs, pista):
    """Devuelve (indice de la cabecera, la cabecera). Muchas hojas traen dos
    lineas de titulo antes de la tabla de verdad."""
    for i, f in enumerate(fs):
        if any(pista.lower() == c.lower() for c in f):
            return i, f
    return 0, fs[0] if fs else []


def tabla(ws, pista):
    fs = [f for f in filas(ws) if any(f)]
    i, cab = cabecera(fs, pista)
    campos = [c for c in cab if c]
    out = []
    for f in fs[i + 1:]:
        if not any(f):
            continue
        fila = {}
        for k, c in enumerate(cab):
            if c and k < len(f):
                fila[c] = f[k]
        if any(fila.values()):
            out.append(fila)
    return campos, out


def pathway(wb):
    _, t = tabla(wb["01_Pathway"], "Grade")
    out = []
    for f in t:
        g = f.get("Grade", "")
        if not re.match(r"^G\d+$", g):
            continue
        out.append({
            "grado": g,
            "edad": f.get("Age", ""),
            "cefr": f.get("CEFR", ""),
            "examen": f.get("Cambridge Exam (target)", ""),
            "minedu": f.get("MINEDU Ciclo", ""),
            "gramatica": f.get("Grammar Anchor (summary)", ""),
            "escritura": f.get("Writing output (words)", ""),
            "lectura": f.get("Reading length (words)", ""),
        })
    return out


def benchmarks(wb):
    _, t = tabla(wb["02_Benchmarks"], "Grade / Exam")
    out = []
    for f in t:
        etiqueta = f.get("Grade / Exam", "")
        m = re.match(r"^(G\d+)", etiqueta)
        if not m:
            continue
        out.append({
            "grado": m.group(1),
            "etiqueta": etiqueta,
            "listening": f.get("Listening", ""),
            "speaking": f.get("Speaking", ""),
            "reading": f.get("Reading", ""),
            "writing": f.get("Writing", ""),
            "lengua": f.get("Grammar & Vocabulary", ""),
        })
    return out


def calendario(wb):
    _, t = tabla(wb["13_Cambridge_Calendar"], "Month")
    return [{
        "mes": f.get("Month", ""), "hito": f.get("Milestone", ""),
        "grados": f.get("Grades involved", ""), "actividad": f.get("Activity", ""),
        "horas": f.get("Prep hours", ""), "responsable": f.get("Responsible", ""),
        "kpi": f.get("KPI", ""),
    } for f in t if f.get("Month")]


def unidades(wb, hoja):
    """Las hojas de detalle traen una fila por (grado, seccion, sub-bloque) y
    una columna por unidad. Se le da la vuelta: una entrada por unidad con
    todos sus sub-bloques dentro, que es como lo lee un profesor."""
    fs = [f for f in filas(wb[hoja]) if any(f)]
    i, cab = cabecera(fs, "Grade")
    cols_u = [(k, c) for k, c in enumerate(cab) if re.match(r"^U\d+$", c)]
    idx = {c: k for k, c in enumerate(cab)}

    por_grado = {}
    for f in fs[i + 1:]:
        g = f[idx["Grade"]] if idx.get("Grade", -1) < len(f) else ""
        if not re.match(r"^G\d+$", g):
            continue
        seccion = f[idx["Section"]] if idx.get("Section", 0) < len(f) else ""
        bloque = f[idx["Sub-block"]] if idx.get("Sub-block", 0) < len(f) else ""
        cefr = f[idx["CEFR"]] if idx.get("CEFR", 0) < len(f) else ""
        d = por_grado.setdefault(g, {"grado": g, "cefr": cefr, "unidades": {}})
        for k, nombre in cols_u:
            if k >= len(f) or not f[k]:
                continue
            u = d["unidades"].setdefault(nombre, {"n": int(nombre[1:]), "tema": "", "bloques": []})
            if bloque == "Unit Themes":
                u["tema"] = f[k]
            else:
                u["bloques"].append({
                    "seccion": seccion, "bloque": bloque,
                    # en el Excel los puntos van separados por saltos de linea
                    "puntos": [p.strip() for p in f[k].split("\n") if p.strip()],
                })

    salida = []
    for g in sorted(por_grado, key=lambda x: int(x[1:])):
        d = por_grado[g]
        d["unidades"] = sorted(d["unidades"].values(), key=lambda u: u["n"])
        salida.append(d)
    return salida


if __name__ == "__main__":
    origen = sys.argv[1] if len(sys.argv) > 1 else POR_DEFECTO
    if not os.path.exists(origen):
        raise SystemExit("no encuentro el Excel: " + origen)

    wb = openpyxl.load_workbook(origen, read_only=True, data_only=True)
    datos = {
        "origen": os.path.basename(origen),
        "pathway": pathway(wb),
        "benchmarks": benchmarks(wb),
        "calendario": calendario(wb),
        "grados": unidades(wb, "18_Detail_G1_G5") + unidades(wb, "19_Detail_G6_G11"),
    }
    wb.close()

    io.open(SALIDA, "w", encoding="utf-8", newline="\n").write(
        json.dumps(datos, ensure_ascii=False, indent=1) + "\n")

    print("  %s" % os.path.basename(SALIDA))
    print("  pathway     %2d grados" % len(datos["pathway"]))
    print("  benchmarks  %2d grados" % len(datos["benchmarks"]))
    print("  calendario  %2d hitos" % len(datos["calendario"]))
    for g in datos["grados"]:
        print("  %-4s %s · %d unidades · %d bloques"
              % (g["grado"], g["cefr"], len(g["unidades"]),
                 sum(len(u["bloques"]) for u in g["unidades"])))
    print("  %.0f KB" % (os.path.getsize(SALIDA) / 1024))
