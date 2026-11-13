*** Settings ***
Documentation       Suíte de testes de autenticação, validação de campos e controle de sessão
Resource            ../resources/common_keywords.resource
Resource            ../resources/pages/login_page.resource
Test Setup          Abrir Navegador No Sistema
Test Teardown       Fechar Navegador Do Sistema

*** Test Cases ***
CT06 - Tentativa De Login Com Campos Em Branco
    [Documentation]    Valida que ao submeter o formulário sem preenchimento o sistema não efetua login
    [Tags]    auth    negativo
    Acessar A Pagina De Login
    Submeter Login
    Location Should Contain    /login

CT07 - Tentativa De Login Com Credenciais Invalidas
    [Documentation]    Valida que o sistema recusa credenciais inválidas e impede o acesso ao sistema
    [Tags]    auth    negativo
    Acessar A Pagina De Login
    Preencher Email    ${ADMIN_EMAIL}
    Preencher Senha    SenhaIncorreta@999
    Submeter Login
    Sleep              2s
    Location Should Contain          /login
    Wait Until Element Is Enabled    ${BTN_ENTRAR}    timeout=${TIMEOUT}
    Element Text Should Be           ${BTN_ENTRAR}    Entrar

CT08 - Alternar Visibilidade Da Senha No Campo
    [Documentation]    Valida o funcionamento do botão que alterna entre exibir e ocultar a senha
    [Tags]    auth
    Acessar A Pagina De Login
    Preencher Senha    admin123
    Validar Tipo Do Campo Senha    password
    Alternar Visualizacao Da Senha
    Validar Tipo Do Campo Senha    text
    Alternar Visualizacao Da Senha
    Validar Tipo Do Campo Senha    password

CT09 - Efetuar Login Com Sucesso Como Administrador
    [Documentation]    Valida o fluxo de autenticação com as credenciais válidas do administrador em produção
    [Tags]    auth    smoke    positivo
    Acessar A Pagina De Login
    Preencher Email    ${ADMIN_EMAIL}
    Preencher Senha    ${ADMIN_PASSWORD}
    Submeter Login
    Validar Redirecionamento Para Dashboard
    Wait Until Page Contains Element    xpath=//aside | //h1[contains(., 'Dashboard')]    timeout=${TIMEOUT}

CT10 - Efetuar Logout E Encerramento De Sessao
    [Documentation]    Valida que o usuário autenticado consegue encerrar sua sessão e ser redirecionado
    [Tags]    auth    positivo
    Efetuar Login Como Administrador
    Efetuar Logout Do Sistema
    Location Should Contain    /login
