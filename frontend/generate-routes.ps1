$pagesPath = "src/pages"
if (-not (Test-Path $pagesPath)) { Write-Host "❌ Error: Run this in the frontend folder." -F Red; return }

$pages = Get-ChildItem -Path $pagesPath -Recurse -Include *.tsx
$routeFile = Get-Item "src/App.tsx" # Or main.tsx if that's where your routes are

Write-Host "🔍 Generating Routes for ZamStay..." -ForegroundColor Cyan
Write-Host "------------------------------------"

$orphans = @()
foreach ($p in $pages) {
    if ((Get-Content $routeFile.FullName -Raw) -notmatch [regex]::Escape($p.BaseName)) {
        $orphans += $p
    }
}

if ($orphans.Count -eq 0) {
    Write-Host "✅ No orphaned pages found! Your App.tsx is fully up to date." -ForegroundColor Green
} else {
    Write-Host "⚠️ Found $($orphans.Count) orphaned pages. Copy the code below:`n" -ForegroundColor Yellow
    
    Write-Host "// 1. Add these Imports to the top of App.tsx:" -ForegroundColor Gray
    foreach ($o in $orphans) {
        Write-Host "import $($o.BaseName) from './pages/$($o.BaseName)';" -ForegroundColor White
    }

    Write-Host "`n// 2. Add these inside your <Routes> block:" -ForegroundColor Gray
    foreach ($o in $orphans) {
        # Generate a clean URL path (e.g., PartnerLandingPage -> partner-landing)
        $urlPath = $o.BaseName.Replace("Page", "").ToLower()
        # Add hyphens before capital letters
        $urlPath = [regex]::Replace($urlPath, "([a-z])([A-Z])", "$1-$2").ToLower()
        
        Write-Host "<Route path='/$urlPath' element={<$($o.BaseName) />} />" -ForegroundColor White
    }
}
