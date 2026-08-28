# Exporta los materiales de la Unidad 4 de 9.o al portal.
#   - Student Worksheet A2/B1/B2/C1  -> PDF (para que el alumno lo abra en el navegador)
#   - Class Slides                   -> pptx copiado tal cual
# Se saltan las variantes (TR), (original) y BACKUP, y las Teacher's Guide.
$src = "C:\Users\User\OneDrive\09_Instituciones\NORDIC\CLASSES\UNIT 4\Unit 4"
$dst = "C:\Projects\nis-portal\classes\g9\u4"
New-Item -ItemType Directory -Force -Path $dst | Out-Null

$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = 0
$indice = @()

foreach ($wk in Get-ChildItem -Path $src -Directory | Where-Object { $_.Name -match '^Week (\d+)$' } | Sort-Object Name) {
  $n = [int]($wk.Name -replace 'Week\s*','')
  foreach ($ses in Get-ChildItem -Path $wk.FullName -Directory | Sort-Object Name) {
    if ($ses.Name -notmatch '^S(\d+)\s*-\s*(.+)$') { continue }
    $sn    = [int]$Matches[1]
    $stitle = $Matches[2].Trim()
    $wdir = Join-Path $dst ("w" + $n)
    New-Item -ItemType Directory -Force -Path $wdir | Out-Null

    $fichas = @{}
    foreach ($lvl in @('A2','B1','B2','C1')) {
      $doc = Join-Path $ses.FullName ("U4W{0}S{1} - Student Worksheet {2}.docx" -f $n,$sn,$lvl)
      $pdfSrc = Join-Path $ses.FullName ("U4W{0}S{1} - Student Worksheet {2}.pdf" -f $n,$sn,$lvl)
      $out = Join-Path $wdir ("u4w{0}s{1}-worksheet-{2}.pdf" -f $n,$sn,$lvl.ToLower())
      if (Test-Path $pdfSrc) {
        Copy-Item $pdfSrc $out -Force
        $fichas[$lvl] = Split-Path $out -Leaf
      } elseif (Test-Path $doc) {
        try {
          $d = $word.Documents.Open($doc, $false, $true)
          $d.SaveAs2($out, 17)
          $d.Close($false)
          $fichas[$lvl] = Split-Path $out -Leaf
        } catch {
          Write-Output ("FALLO {0}: {1}" -f $doc, $_.Exception.Message)
        }
      }
    }

    $slidesName = $null
    $slides = Join-Path $ses.FullName ("U4W{0}S{1} - Class Slides.pptx" -f $n,$sn)
    if (Test-Path $slides) {
      $outp = Join-Path $wdir ("u4w{0}s{1}-slides.pptx" -f $n,$sn)
      Copy-Item $slides $outp -Force
      $slidesName = Split-Path $outp -Leaf
    }

    $indice += [pscustomobject]@{
      week = $n; session = $sn; title = $stitle
      worksheets = $fichas; slides = $slidesName
    }
    Write-Output ("W{0} S{1} - {2}  [fichas: {3}]  [slides: {4}]" -f $n,$sn,$stitle,$fichas.Count,($slidesName -ne $null))
  }
}

$word.Quit()
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($word) | Out-Null
$indice | ConvertTo-Json -Depth 5 | Set-Content -Path (Join-Path $dst "indice.json") -Encoding UTF8
Write-Output ("LISTO: {0} sesiones" -f $indice.Count)
