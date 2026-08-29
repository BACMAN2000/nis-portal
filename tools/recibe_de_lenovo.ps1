# Recibe por Taildrop lo que la Lenovo mande y lo deja listo para revisar.
#
# El agente de la Lenovo trabaja sin commit ni push, asi que lo que llega es
# el working tree: los archivos tal cual quedaron. Este script NO los mezcla
# solo con el proyecto -- los deja aparte para poder mirar el diff antes de
# aceptar nada. Sobrescribir a ciegas el trabajo de otra maquina es la forma
# mas rapida de perder algo.
#
# Uso:  powershell -File tools\recibe_de_lenovo.ps1
$ts      = "C:\Program Files\Tailscale\tailscale.exe"
$bandeja = "C:\Projects\_de_lenovo"
$destino = Join-Path $bandeja ("recibido_" + (Get-Date -Format "yyyyMMdd-HHmmss"))

New-Item -ItemType Directory -Force -Path $destino | Out-Null
Write-Output "Esperando archivos de la Lenovo en $destino ..."

# file get baja lo que haya pendiente; -wait se queda escuchando.
& $ts file get -conflict=rename $destino
$n = (Get-ChildItem $destino -Recurse -File -ErrorAction SilentlyContinue).Count
if ($n -eq 0) {
  Write-Output "No llego nada. En la Lenovo hay que ejecutar el 'tailscale file cp'."
  Remove-Item $destino -Recurse -Force
  exit 1
}

Write-Output "Recibidos $n archivo(s):"
Get-ChildItem $destino -Recurse -File | ForEach-Object {
  "  {0}  ({1:N0} KB)" -f $_.Name, ($_.Length / 1KB)
}

# Si viene un zip, se descomprime al lado para poder inspeccionarlo.
Get-ChildItem $destino -Filter *.zip | ForEach-Object {
  $out = Join-Path $destino ($_.BaseName + "_extraido")
  Expand-Archive -Path $_.FullName -DestinationPath $out -Force
  $c = (Get-ChildItem $out -Recurse -File).Count
  Write-Output "Descomprimido $($_.Name): $c archivo(s) en $out"
}

Write-Output ""
Write-Output "Todo en: $destino"
Write-Output "NADA se ha mezclado con C:\Projects\nis-fun todavia: primero se compara."
