# ============================================
# ZAMSTAY CLEANUP SCRIPT
# ============================================
Write-Host "Starting cleanup..." -ForegroundColor Cyan

# 1. Remove Python cache
Write-Host "`n1. Removing Python cache..." -ForegroundColor Yellow
Get-ChildItem -Path "backend" -Recurse -Directory -Filter "__pycache__" -ErrorAction SilentlyContinue | 
    Remove-Item -Recurse -Force -ErrorAction SilentlyContinue
Get-ChildItem -Path "backend" -Recurse -File -Filter "*.pyc" -ErrorAction SilentlyContinue | 
    Remove-Item -Force -ErrorAction SilentlyContinue
Write-Host "   ✓ Python cache cleared" -ForegroundColor Green

# 2. Remove backup files (but NOT settings.py.bak since you want it)
Write-Host "`n2. Removing backup files..." -ForegroundColor Yellow
$backupFiles = Get-ChildItem -Path . -Recurse -File -ErrorAction SilentlyContinue | 
    Where-Object { 
        $_.Name -match "\.backup$|\.old$|~$|\.orig$" -and
        $_.Name -notmatch "settings\.py\.bak"  # Keep your settings backup
    }
foreach ($file in $backupFiles) {
    Write-Host "   Deleting: $($file.Name)" -ForegroundColor Gray
    Remove-Item -Path $file.FullName -Force -ErrorAction SilentlyContinue
}
Write-Host "   ✓ Backup files removed" -ForegroundColor Green

# 3. Clean frontend build artifacts
Write-Host "`n3. Cleaning frontend build..." -ForegroundColor Yellow
if (Test-Path "frontend/dist") {
    Remove-Item -Path "frontend/dist" -Recurse -Force -ErrorAction SilentlyContinue
}
if (Test-Path "backend/static/dist") {
    Remove-Item -Path "backend/static/dist" -Recurse -Force -ErrorAction SilentlyContinue
}
Write-Host "   ✓ Build artifacts cleared" -ForegroundColor Green

# 4. Remove logs
Write-Host "`n4. Cleaning log files..." -ForegroundColor Yellow
Get-ChildItem -Path . -Recurse -File -Filter "*.log" -ErrorAction SilentlyContinue | 
    Where-Object { $_.LastWriteTime -lt (Get-Date).AddDays(-7) } |
    Remove-Item -Force -ErrorAction SilentlyContinue
Write-Host "   ✓ Old logs cleared" -ForegroundColor Green

# 5. Final summary
Write-Host "`n✅ Cleanup completed!" -ForegroundColor Green
Write-Host "`n📁 Project is now cleaner." -ForegroundColor Cyan
Write-Host "Run these to rebuild if needed:" -ForegroundColor White
Write-Host "  cd frontend && npm install" -ForegroundColor White
Write-Host "  cd backend && python manage.py migrate" -ForegroundColor White
