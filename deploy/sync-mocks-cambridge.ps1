# Sincroniza el motor de examenes (repo mocks-cambridge) DENTRO de este repo.
#
# Por que existe esta copia: los quizzes tienen que servirse en el MISMO ORIGEN
# que el portal. Si no, el navegador no comparte el localStorage y se rompen tres
# cosas a la vez: (1) el alumno tiene que volver a escribir nombre/grado/correo,
# (2) NIS.save() sale con {skipped:true} y EL INTENTO NO SE GUARDA, y (3) el
# alumno acaba en bacman2000.github.io a media sesion.
#
# La forma limpia de conseguirlo es el bloque nginx de /mocks-cambridge/ (paso
# 3-bis de DEPLOY.md), pero eso hay que hacerlo EN EL SERVIDOR. Como el servidor
# ya auto-pullea este repo y nginx sirve cualquier subcarpeta suya, meter aqui
# una copia consigue exactamente lo mismo con un git push.
#
# Cuando el paso 3-bis este hecho, el bloque '^~ /mocks-cambridge/' gana sobre
# esta carpeta (nginx prioriza ese prefijo) y esta copia se puede borrar.
#
# Uso:  powershell -ExecutionPolicy Bypass -File deploy\sync-mocks-cambridge.ps1
# Despues:  git add mocks-cambridge  &&  git commit  &&  git push
#
# OJO: /E copia y sobrescribe, pero NO borra lo que ya no exista en origen. Si
# borras un archivo en mocks-cambridge, borralo tambien aqui a mano.

$src = Join-Path (Split-Path (Split-Path $PSScriptRoot -Parent) -Parent) 'mocks-cambridge'
$dst = Join-Path (Split-Path $PSScriptRoot -Parent) 'mocks-cambridge'

if(-not (Test-Path $src)){ Write-Error "No encuentro el repo origen en $src"; exit 1 }

Write-Host "origen : $src"
Write-Host "destino: $dst"

# Excluidos a proposito:
#   .git          - no anidamos repos
#   tools         - scripts de generacion de audio (no los necesita el navegador)
#   apps-script   - codigo de Google Apps Script, no se sirve
#   A2 Level.txt  - CLAVE de ElevenLabs, nunca debe publicarse
#   *.log         - basura de servidores locales
robocopy $src $dst /E /XD ".git" "tools" "apps-script" /XF "A2 Level.txt" "*.log" ".gitignore" "README.md" /NFL /NDL /NJH /NJS /R:1 /W:1 | Out-Null
if($LASTEXITCODE -ge 8){ Write-Error "robocopy fallo (codigo $LASTEXITCODE)"; exit 1 }

# Red de seguridad: que no se cuele la clave de ElevenLabs pase lo que pase.
foreach($leak in @('A2 Level.txt')){
  $p = Join-Path $dst $leak
  if(Test-Path $p){ Remove-Item $p -Force; Write-Warning "Se colo '$leak' y se ha borrado" }
}

$n  = (Get-ChildItem $dst -Recurse -File | Measure-Object).Count
$mb = (Get-ChildItem $dst -Recurse -File | Measure-Object Length -Sum).Sum / 1MB
Write-Host ("OK - {0} archivos, {1:N1} MB" -f $n, $mb)
Write-Host "Recuerda subir la version en mocks-cambridge\version.json antes de publicar."
