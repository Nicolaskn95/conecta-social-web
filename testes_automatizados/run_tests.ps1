# ===================================================================
# Script de Execução dos Testes Automatizados - Robot Framework (PowerShell)
# Conecta Social (Ambiente de Produção)
# ===================================================================

param (
    [string]$Tag = "",
    [string]$Browser = "headlesschrome",
    [string]$Email = "",
    [string]$Password = ""
)

$ResultsDir = Join-Path $PSScriptRoot "results"
if (-not (Test-Path $ResultsDir)) {
    New-Item -ItemType Directory -Path $ResultsDir | Out-Null
}

$RobotArgs = @("--outputdir", $ResultsDir)

if ($Tag -ne "") {
    $RobotArgs += @("--include", $Tag)
}

if ($Email -ne "") {
    $RobotArgs += @("-v", "ADMIN_EMAIL:$Email")
}

if ($Password -ne "") {
    $RobotArgs += @("-v", "ADMIN_PASSWORD:$Password")
}

$RobotArgs += (Join-Path $PSScriptRoot "tests")

Write-Host "===================================================================" -ForegroundColor Cyan
Write-Host "Iniciando execucao do Robot Framework..." -ForegroundColor Green
if ($Tag -ne "") {
    Write-Host "Filtro de Tag: $Tag" -ForegroundColor Yellow
}
Write-Host "===================================================================" -ForegroundColor Cyan

python -m robot @RobotArgs

Write-Host ""
Write-Host "===================================================================" -ForegroundColor Cyan
Write-Host "Execucao concluida!" -ForegroundColor Green
Write-Host "Relatorio: $ResultsDir\report.html" -ForegroundColor Yellow
Write-Host "Log:       $ResultsDir\log.html" -ForegroundColor Yellow
Write-Host "===================================================================" -ForegroundColor Cyan
