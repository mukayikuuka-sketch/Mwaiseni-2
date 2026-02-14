# zamstay-diagnose.ps1 - Future troubleshooting
Write-Host "=== ZAMSTAY DIAGNOSTICS ===" -ForegroundColor Cyan
Write-Host "1. Checking BASE_DIR..." -ForegroundColor Yellow
python -c "from pathlib import Path; import sys; sys.path.append('.'); from zamstay.settings import base; print(f'BASE_DIR: {base.BASE_DIR}'); print(f'Templates: {(base.BASE_DIR / \"templates\").exists()}'); print(f'Static/dist: {(base.BASE_DIR / \"static\" / \"dist\").exists()}')"
Write-Host "2. Checking Django..." -ForegroundColor Yellow
python manage.py check --settings=zamstay.settings.development
Write-Host "3. Checking ports..." -ForegroundColor Yellow
8000, 3000 | ForEach-Object { try { $s = New-Object Net.Sockets.TcpClient; $s.Connect('127.0.0.1', $_); Write-Host "Port $_: OCCUPIED" -ForegroundColor Yellow; $s.Close() } catch { Write-Host "Port $_: FREE" -ForegroundColor Gray } }
Write-Host "=== DIAGNOSTICS COMPLETE ===" -ForegroundColor Green
