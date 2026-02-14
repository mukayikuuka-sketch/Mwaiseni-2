if (-not (Test-Path 'src/pages')) { Write-Host 'Run this in frontend folder' -ForegroundColor Red; return }
$pages = Get-ChildItem -Path "src/pages" -Recurse -Include *.tsx
foreach ($p in $pages) {
  Write-Host "📄 Page: $($p.Name)" -F Cyan
  $c = Get-Content $p.FullName
  $i = $c | Select-String "from" | ForEach-Object { $_.ToString().Split("'")[1] }
  if ($i) { Write-Host "  📦 Imports: $($i -join ", ")" -F Gray }
  Write-Host "-------------------" -F DarkGray
}
