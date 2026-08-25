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

$src = Join-Path (Split-Path (Split-Path $PSScriptRoot -Parent) -Parent) 'nis-fun'
$dst = Join-Path (Split-Path $PSScriptRoot -Parent) 'nis-fun'

if(-not (Test-Path $src)){ Write-Error "No encuentro el repo origen en $src"; exit 1 }

Write-Host "origen : $src"
Write-Host "destino: $dst"

# Excluidos a proposito:
#   .git          - no anidamos repos
#   book-builder  - herramienta de autoria (84 MB), el alumno no la usa
#   tools         - scripts de generacion, no se sirven
robocopy $src $dst /E /XD ".git" "book-builder" "tools" /XF ".gitignore" "README.md" "*.log" /NFL /NDL /NJH /NJS /R:1 /W:1 | Out-Null
if($LASTEXITCODE -ge 8){ Write-Error "robocopy fallo (codigo $LASTEXITCODE)"; exit 1 }

$n  = (Get-ChildItem $dst -Recurse -File | Measure-Object).Count
$mb = (Get-ChildItem $dst -Recurse -File | Measure-Object Length -Sum).Sum / 1MB
Write-Host ("OK - {0} archivos, {1:N1} MB" -f $n, $mb)
