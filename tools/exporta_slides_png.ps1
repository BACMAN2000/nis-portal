# Convierte las diapositivas de clase en IMAGENES, una por diapositiva.
#
# El alumno tiene que poder VER la clase pero no llevarse el .pptx: el portal
# le ensena las imagenes en un visor propio y el fichero original se queda
# solo para el profesor. Salida:
#
#   classes/<grado>/<unidad>/w<N>/slides/u4w<N>s<n>/01.png, 02.png, ...
#
# Uso:  powershell -File tools\exporta_slides_png.ps1
$src = "C:\Projects\nis-portal\classes\g9\u4"
$ancho = 1600
$alto  = 900

$ppt = New-Object -ComObject PowerPoint.Application
$indice = @()

foreach ($wdir in Get-ChildItem -Path $src -Directory | Where-Object { $_.Name -match '^w\d+$' } | Sort-Object Name) {
  foreach ($f in Get-ChildItem -Path $wdir.FullName -Filter "*-slides.pptx" | Sort-Object Name) {
    $base = [System.IO.Path]::GetFileNameWithoutExtension($f.Name) -replace '-slides$',''
    $out  = Join-Path (Join-Path $wdir.FullName "slides") $base
    if (Test-Path $out) { Remove-Item $out -Recurse -Force }
    New-Item -ItemType Directory -Force -Path $out | Out-Null
    try {
      $pres = $ppt.Presentations.Open($f.FullName, $true, $false, $false)   # ReadOnly, sin ventana
      $n = $pres.Slides.Count
      for ($i = 1; $i -le $n; $i++) {
        $destino = Join-Path $out ("{0:d2}.png" -f $i)
        $pres.Slides.Item($i).Export($destino, "PNG", $ancho, $alto)
      }
      $pres.Close()
      $indice += [pscustomobject]@{ week = $wdir.Name; deck = $base; slides = $n }
      Write-Output ("{0}/{1}: {2} diapositivas" -f $wdir.Name, $base, $n)
    } catch {
      Write-Output ("FALLO {0}: {1}" -f $f.FullName, $_.Exception.Message)
    }
  }
}

$ppt.Quit()
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($ppt) | Out-Null
$indice | ConvertTo-Json -Depth 4 | Set-Content -Path (Join-Path $src "slides-indice.json") -Encoding UTF8
Write-Output ("LISTO: {0} presentaciones, {1} diapositivas" -f $indice.Count, ($indice | Measure-Object -Property slides -Sum).Sum)
