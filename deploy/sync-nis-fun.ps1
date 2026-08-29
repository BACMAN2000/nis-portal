param([switch]$Force)
# Sincroniza YLE Fun for Nordic (repo nis-fun) DENTRO de este repo.
#
# Por que: los alumnos no deben ver bacman2000.github.io en la barra de
# direcciones (pedido explicito 2026-08-13, reiterado 2026-08-25) — todo debe
# servirse desde nis.cohasset.pe. Como el servidor auto-pullea este repo y
# nginx sirve cualquier subcarpeta suya, una copia en /nis-fun/ publica el
# engine YLE en https://nis.cohasset.pe/nis-fun/engine/ con un git push.
# Las tarjetas YLE del portal (app.js) y del hub de mocks (quizzes.html)
# enlazan a esta copia con rutas relativas.
#
# Uso:  powershell -ExecutionPolicy Bypass -File deploy\sync-nis-fun.ps1
# Despues:  git add nis-fun  &&  git commit  &&  git push
#
# OJO: /E copia y sobrescribe, pero NO borra lo que ya no exista en origen. Si
# borras un archivo en nis-fun, borralo tambien aqui a mano.
#
# OJO 2 (29-ago-2026): esto copia A CIEGAS. Ese dia la copia del portal iba 235
# lineas POR DELANTE del repo origen -- alguien habia editado aqui directamente
# los ajustes de movil, el estado de carga y la accesibilidad, sin pasarlos a
# nis-fun. Correr el script tal cual se los habria llevado por delante. Por eso
# ahora se compara antes y hace falta -Force para pisar algo que difiera.

$src = Join-Path (Split-Path (Split-Path $PSScriptRoot -Parent) -Parent) 'nis-fun'
$dst = Join-Path (Split-Path $PSScriptRoot -Parent) 'nis-fun'

if(-not (Test-Path $src)){ Write-Error "No encuentro el repo origen en $src"; exit 1 }

# Los archivos que alguien podria haber editado SOLO aqui. Si el destino difiere
# del origen, se para: puede que la copia buena sea esta.
$vigilados = @('engine\index.html','engineanner.js','engine\screens.js','index.html')
$distintos = @()
foreach($f in $vigilados){
  $a = Join-Path $src $f; $b = Join-Path $dst $f
  if((Test-Path $a) -and (Test-Path $b)){
    $ha = (Get-FileHash $a -Algorithm SHA256).Hash
    $hb = (Get-FileHash $b -Algorithm SHA256).Hash
    if($ha -ne $hb){ $distintos += $f }
  }
}
if($distintos.Count -and -not $Force){
  Write-Host ""
  Write-Warning "Estos archivos DIFIEREN entre el origen y la copia del portal:"
  $distintos | ForEach-Object { Write-Host "    $_" }
  Write-Host ""
  Write-Host "No copio nada. Mira el diff antes: puede que la version buena sea la"
  Write-Host "del portal y copiar encima la borre."
  Write-Host ""
  Write-Host "  diff (Get-Content \"$src\engine\index.html\") (Get-Content \"$dst\engine\index.html\")"
  Write-Host ""
  Write-Host "Cuando estes seguro de que el origen es el bueno:  -Force"
  exit 1
}

Write-Host "origen : $src"
Write-Host "destino: $dst"

# Excluidos a proposito:
#   .git          - no anidamos repos
#   book-builder  - herramienta de autoria (84 MB), el alumno no la usa
#   tools         - scripts de generacion, no se sirven
robocopy $src $dst /E /XD ".git" "book-builder" "tools" /XF ".gitignore" "README.md" "*.log" /NFL /NDL /NJH /NJS /R:1 /W:1 | Out-Null
if($LASTEXITCODE -ge 8){ Write-Error "robocopy fallo (codigo $LASTEXITCODE)"; exit 1 }

# De book-builder si viajan los PDF: son el libro que el profesor imprime y
# se descargan desde nis.cohasset.pe. Lo que se queda fuera es la
# herramienta (book.html y el script), que no se sirve a nadie. Sin esta
# segunda pasada los PDF se congelaban: la carpeta entraba en la exclusion
# y la copia del portal se quedo cinco horas por detras del origen.
robocopy (Join-Path $src "book-builder") (Join-Path $dst "book-builder") "*.pdf" /NFL /NDL /NJH /NJS /R:1 /W:1 | Out-Null
if($LASTEXITCODE -ge 8){ Write-Error "robocopy de los PDF fallo (codigo $LASTEXITCODE)"; exit 1 }

$n  = (Get-ChildItem $dst -Recurse -File | Measure-Object).Count
$mb = (Get-ChildItem $dst -Recurse -File | Measure-Object Length -Sum).Sum / 1MB
Write-Host ("OK - {0} archivos, {1:N1} MB" -f $n, $mb)
