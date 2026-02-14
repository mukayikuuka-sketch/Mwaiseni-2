# ============================================
# ZAMSTAY DEPLOYMENT SCRIPT
# Run this whenever you update the React app
# ============================================

Write-Host "Deploying ZamStay React to Django..." -ForegroundColor Cyan

# Build React
cd "frontend"
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "React build failed!" -ForegroundColor Red
    exit 1
}

# Clean Django static
cd "..\backend"
Remove-Item -Path "static\*" -Recurse -Force -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Path "static\js" -Force | Out-Null
New-Item -ItemType Directory -Path "static\css" -Force | Out-Null

# Copy files
cd "..\frontend\build"

# Copy JS
if (Test-Path "static\js\main.*.js") {
    $jsFile = Get-ChildItem "static\js\main.*.js" | Where-Object { $_.Name -notlike "*.map" } | Select-Object -First 1
    Copy-Item -Path $jsFile.FullName -Destination "..\..\backend\static\js\" -Force
}

# Copy CSS
if (Test-Path "static\css") {
    Copy-Item -Path "static\css\*" -Destination "..\..\backend\static\css\" -Recurse -Force
}

# Copy index.html
Copy-Item -Path "index.html" -Destination "..\..\backend\templates\" -Force

# Copy assets
if (Test-Path "icons") { Copy-Item -Path "icons\*" -Destination "..\..\backend\static\icons\" -Recurse -Force }
if (Test-Path "images") { Copy-Item -Path "images\*" -Destination "..\..\backend\static\images\" -Recurse -Force }
if (Test-Path "vendor") { Copy-Item -Path "vendor\*" -Destination "..\..\backend\static\vendor\" -Recurse -Force }

Write-Host "Deployment complete! Start Django with: cd backend && python manage.py runserver" -ForegroundColor Green
