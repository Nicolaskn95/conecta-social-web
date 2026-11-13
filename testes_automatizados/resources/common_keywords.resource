*** Settings ***
Documentation       Palavras-chave comuns para manipulação de navegadores, autenticação, medições e utilitários
Library             SeleniumLibrary
Library             DateTime
Library             OperatingSystem
Resource            variables.resource

*** Keywords ***
Abrir Navegador No Sistema
    [Documentation]    Inicializa o navegador Google Chrome no modo headless com configurações ideais de viewport
    [Arguments]    ${url}=${BASE_URL}
    ${chrome_options}=    Set Variable    add_argument("--headless=new"); add_argument("--no-sandbox"); add_argument("--disable-dev-shm-usage"); add_argument("--disable-gpu"); add_argument("--window-size=${VIEWPORT_WIDTH},${VIEWPORT_HEIGHT}")
    Open Browser    ${url}    browser=chrome    options=${chrome_options}
    Set Selenium Timeout    ${TIMEOUT}
    Set Selenium Speed      ${SELENIUM_SPEED}

Abrir Navegador Com Interface
    [Documentation]    Inicializa o navegador Google Chrome com interface gráfica visível
    [Arguments]    ${url}=${BASE_URL}
    ${chrome_options}=    Set Variable    add_argument("--start-maximized"); add_argument("--no-sandbox")
    Open Browser    ${url}    browser=chrome    options=${chrome_options}
    Set Selenium Timeout    ${TIMEOUT}
    Set Selenium Speed      ${SELENIUM_SPEED}

Fechar Navegador Do Sistema
    [Documentation]    Captura screenshot em caso de falha e fecha todos os navegadores abertos
    Run Keyword If Test Failed    Capture Page Screenshot
    Close All Browsers

Fechar Navegador Da Suite
    [Documentation]    Fecha todos os navegadores abertos no encerramento da suíte
    Close All Browsers

Efetuar Login Como Administrador
    [Documentation]    Realiza login com a conta de administrador configurada e aguarda carregar o Dashboard
    Go To    ${BASE_URL}/login
    Wait Until Page Contains Element    xpath=//input[@type='email']    timeout=${TIMEOUT}
    Input Text      xpath=//input[@type='email']       ${ADMIN_EMAIL}
    Input Password  xpath=//input[@type='password']    ${ADMIN_PASSWORD}
    Click Button    xpath=//button[@type='submit']
    Wait Until Location Contains    /dashboard    timeout=${TIMEOUT}
    Wait Until Element Is Visible    xpath=//h1[contains(., 'Dashboard')] | //aside | //div[contains(@class, 'sidebar-color')]    timeout=${TIMEOUT}

Efetuar Logout Do Sistema
    [Documentation]    Clica no perfil do usuário no header e realiza logout
    Sleep    1s
    ${user_profile}=    Get WebElement    xpath=//header//div[contains(@class, 'cursor-pointer') and contains(., 'Admin')] | //header//button[contains(@class, 'text-gray-600')]
    Execute Javascript    arguments[0].click();    ARGUMENTS    ${user_profile}
    Wait Until Element Is Visible    xpath=//button[contains(., 'Sair')]    timeout=${TIMEOUT}
    ${btn_sair}=    Get WebElement    xpath=//button[contains(., 'Sair')]
    Execute Javascript    arguments[0].click();    ARGUMENTS    ${btn_sair}
    Wait Until Location Contains     /login    timeout=${TIMEOUT}

Gerar Identificador Unico
    [Documentation]    Gera um identificador baseado no timestamp atual para criação de dados de teste únicos
    [Arguments]    ${prefixo}=TESTE
    ${timestamp}=    Get Current Date    result_format=%Y%m%d%H%M%S
    RETURN    ${prefixo}_${timestamp}

Medir Tempo De Carregamento Em Segundos
    [Documentation]    Mede o tempo de carregamento da página através da Navigation Timing API do navegador
    ${load_time_ms}=    Execute Javascript    return window.performance.timing.loadEventEnd > 0 ? (window.performance.timing.loadEventEnd - window.performance.timing.navigationStart) : (window.performance.now());
    ${load_time_sec}=   Evaluate    round(${load_time_ms} / 1000.0, 2)
    Log    Tempo de carregamento medido: ${load_time_sec} segundos    console=True
    RETURN    ${load_time_sec}
