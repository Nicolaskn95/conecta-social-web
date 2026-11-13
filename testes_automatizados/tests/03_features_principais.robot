*** Settings ***
Documentation       Suíte de testes para as principais funcionalidades e listagens da área logada
Resource            ../resources/common_keywords.resource
Resource            ../resources/pages/dashboard_page.resource
Resource            ../resources/pages/families_page.resource
Resource            ../resources/pages/volunteers_page.resource
Resource            ../resources/pages/donations_page.resource
Resource            ../resources/pages/events_page.resource
Suite Setup         Abrir Navegador No Sistema
Suite Teardown      Fechar Navegador Da Suite

*** Test Cases ***
CT11 - Validar Componentes E Metricas Do Dashboard
    [Documentation]    Realiza login como Admin e valida a exibição do menu lateral e estrutura do Dashboard
    [Tags]    features    dashboard    smoke
    Efetuar Login Como Administrador
    Validar Elementos Do Dashboard

CT12 - Navegacao Pelo Menu Lateral
    [Documentation]    Navega sucessivamente pelos módulos do menu lateral validando URLs e títulos
    [Tags]    features    navegacao
    Navegar Para Modulo Familias
    Location Should Contain    /dashboard/families

    Navegar Para Modulo Voluntarios
    Location Should Contain    /dashboard/volunteers

    Navegar Para Modulo Doacoes
    Location Should Contain    /dashboard/donations

    Navegar Para Modulo Eventos
    Location Should Contain    /dashboard/events

CT13 - Validar Listagem E Tabela De Familias
    [Documentation]    Verifica a renderização da tabela de famílias e a presença do campo de pesquisa
    [Tags]    features    familias
    Acessar Listagem De Familias
    Wait Until Page Contains Element    ${TABELA_FAMILIAS}        timeout=${TIMEOUT}
    Wait Until Page Contains Element    ${INPUT_SEARCH_FAMILIA}   timeout=${TIMEOUT}

CT14 - Validar Listagem E Tabela De Voluntarios
    [Documentation]    Verifica a renderização da tabela de voluntários e colaboradores
    [Tags]    features    voluntarios
    Acessar Listagem De Voluntarios
    Validar Presenca De Registros Na Tabela

CT15 - Validar Listagem E Tabela De Doacoes
    [Documentation]    Verifica a renderização da tabela de doações e estoque
    [Tags]    features    doacoes
    Acessar Listagem De Doacoes
    Validar Presenca De Doacoes Na Tabela

CT16 - Validar Listagem E Tabela De Eventos
    [Documentation]    Verifica a renderização da tabela de eventos cadastrados no sistema
    [Tags]    features    eventos
    Acessar Listagem De Eventos
    Wait Until Page Contains Element    ${TABELA_EVENTOS}         timeout=${TIMEOUT}
    Wait Until Page Contains Element    ${BTN_NOVO_EVENTO}        timeout=${TIMEOUT}
