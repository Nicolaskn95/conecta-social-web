@echo off
setlocal enabledelayedexpansion

REM ===================================================================
REM Script de Execucao dos Testes Automatizados - Robot Framework
REM Conecta Social (Ambiente de Producao)
REM ===================================================================

cd /d "%~dp0"

set RESULTS_DIR=results
if not exist "%RESULTS_DIR%" mkdir "%RESULTS_DIR%"

set TAG=%1

if "%TAG%"=="" (
    echo [INFO] Executando TODAS as suites de teste...
    python -m robot --outputdir "%RESULTS_DIR%" tests/
) else (
    echo [INFO] Executando testes filtrados pela tag: %TAG%...
    python -m robot --outputdir "%RESULTS_DIR%" --include %TAG% tests/
)

echo.
echo ===================================================================
echo [FIM] Execucao concluida. Relatorios gerados em:
echo - Relatorio HTML: %RESULTS_DIR%\report.html
echo - Log detalhado:  %RESULTS_DIR%\log.html
echo ===================================================================

endlocal
