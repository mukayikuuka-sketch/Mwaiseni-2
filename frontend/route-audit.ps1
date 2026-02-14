if (-not (Test-Path "src/pages")) { Write-Host "❌ Run this in the frontend folder" -F Red; return }
$pages = Get-ChildItem -Path "src/pages" -Recurse -Include *.tsx
Write-Host "`n🔍 ZamStay Route Connectivity Audit" -ForegroundColor Cyan
foreach ($p in $pages) {
    $content = Get-Content $p.FullName
    $routeUsed = $false
    $routeFiles = Get-ChildItem -Path "src" -Recurse -Include *.tsx, *.ts
    foreach ($rf in $routeFiles) {
        if ($rf.FullName -eq $p.FullName) { continue }
        if ((Get-Content $rf.FullName -Raw) -match [regex]::Escape($p.BaseName)) { $routeUsed = $true; break }
    }
    $status = if ($routeUsed) { "✅ Connected" } else { "❌ ORPHANED (Not in Routes)" }
    $color = if ($routeUsed) { "Green" } else { "Red" }
    Write-Host "📄 $($p.Name.PadRight(30)) -> " -NoNewline
    Write-Host $status -ForegroundColor $color
}
Write-Host "`n✅ Audit Complete!" -ForegroundColor Green
