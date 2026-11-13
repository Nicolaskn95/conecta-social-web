*** Settings ***
Documentation       Suíte de testes de performance e SLA de carregamento de páginas
Resource            ../resources/common_keywords.resource
Resource            ../resources/pages/dashboard_page.resource
Test Setup          Abrir Navegador No Sistema
Test Teardown       Fechar Navegador Do Sistema

*** Test Cases ***
CT21 - Validar Tempo De Carregamento Da Landing Page
    [Documentation]    Mede o tempo total de carregamento da página inicial pública e valida se está abaixo do SLA
    [Tags]    performance    sla    publico
    Go To    ${BASE_URL}
    Wait Until Page Contains Element    xpath=//header//img[@alt='logo'] | //header//a[@href='/']    timeout=${TIMEOUT}
    ${tempo}=    Medir Tempo De Carregamento Em Segundos
    Should Be True    ${tempo} <= ${PERF_SLA_SECONDS}    msg=O tempo de carregamento da Landing Page (${tempo}s) excedeu o SLA de ${PERF_SLA_SECONDS}s

CT22 - Validar Tempo De Carregamento Da Pagina De Login
    [Documentation]    Mede o tempo de carregamento da tela de login
    [Tags]    performance    sla    auth
    Go To    ${BASE_URL}/login
    Wait Until Page Contains Element    xpath=//input[@type='email']    timeout=${TIMEOUT}
    ${tempo}=    Medir Tempo De Carregamento Em Segundos
    Should Be True    ${tempo} <= ${PERF_SLA_SECONDS}    msg=O tempo de carregamento da página de Login (${tempo}s) excedeu o SLA de ${PERF_SLA_SECONDS}s

CT23 - Validar Tempo De Carregamento Da Pagina Sobre
    [Documentation]    Mede o tempo de carregamento da página institucional Sobre
    [Tags]    performance    sla    publico
    Go To    ${BASE_URL}/about
    Wait Until Page Contains Element    xpath=//h1[contains(., 'Sobre')] | //h2[contains(., 'História')]    timeout=${TIMEOUT}
    ${tempo}=    Medir Tempo De Carregamento Em Segundos
    Should Be True    ${tempo} <= ${PERF_SLA_SECONDS}    msg=O tempo de carregamento da página Sobre (${tempo}s) excedeu o SLA de ${PERF_SLA_SECONDS}s

CT24 - Validar Tempo De Carregamento Da Pagina Fale Conosco
    [Documentation]    Mede o tempo de carregamento da página institucional Fale Conosco
    [Tags]    performance    sla    publico
    Go To    ${BASE_URL}/contactUs
    Wait Until Page Contains Element    xpath=//h1[contains(., 'Fale Conosco')]    timeout=${TIMEOUT}
    ${tempo}=    Medir Tempo De Carregamento Em Segundos
    Should Be True    ${tempo} <= ${PERF_SLA_SECONDS}    msg=O tempo de carregamento da página Fale Conosco (${tempo}s) excedeu o SLA de ${PERF_SLA_SECONDS}s

CT25 - Validar Tempo De Carregamento Do Dashboard Autenticado
    [Documentation]    Efetua login e mede a estabilidade e tempo de resposta da rota administrativa /dashboard
    [Tags]    performance    sla    dashboard
    Efetuar Login Como Administrador
    Go To    ${BASE_URL}/dashboard
    Wait Until Page Contains Element    xpath=//aside | //h1[contains(., 'Dashboard')]    timeout=${TIMEOUT}
    ${tempo}=    Medir Tempo De Carregamento Em Segundos
    Should Be True    ${tempo} <= ${PERF_SLA_SECONDS}    msg=O tempo de resposta do Dashboard (${tempo}s) excedeu o SLA de ${PERF_SLA_SECONDS}s
