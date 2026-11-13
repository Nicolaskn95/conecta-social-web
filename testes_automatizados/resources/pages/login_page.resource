*** Settings ***
Documentation       Page Object para a tela de autenticação (/login)
Library             SeleniumLibrary
Resource            ../variables.resource

*** Variables ***
${INPUT_EMAIL}                  xpath=//input[@type='email']
${INPUT_PASSWORD}               xpath=//input[@placeholder='Digite sua senha' or @type='password' or @type='text']
${BTN_TOGGLE_PASSWORD}          xpath=//form//button[@type='button']
${BTN_ENTRAR}                   xpath=//button[@type='submit']
${LINK_ESQUECI_SENHA}           xpath=//*[contains(text(), 'Esqueci minha senha')]
${TOAST_ERROR}                  xpath=//div[contains(@class, 'Toastify__toast--error')] | //*[contains(text(), 'Erro ao fazer login') or contains(text(), 'inválidos')]

*** Keywords ***
Acessar A Pagina De Login
    Go To    ${BASE_URL}/login
    Wait Until Element Is Visible    ${INPUT_EMAIL}    timeout=${TIMEOUT}

Preencher Email
    [Arguments]    ${email}
    Input Text    ${INPUT_EMAIL}    ${email}

Preencher Senha
    [Arguments]    ${senha}
    Input Text    ${INPUT_PASSWORD}    ${senha}

Alternar Visualizacao Da Senha
    Click Element    ${BTN_TOGGLE_PASSWORD}

Validar Tipo Do Campo Senha
    [Arguments]    ${tipo_esperado}
    ${tipo_atual}=    Get Element Attribute    ${INPUT_PASSWORD}    type
    Should Be Equal As Strings    ${tipo_atual}    ${tipo_esperado}

Submeter Login
    Click Button    ${BTN_ENTRAR}

Validar Mensagem De Erro De Login
    Wait Until Page Contains Element    ${TOAST_ERROR}    timeout=${TIMEOUT}
    Log    Mensagem de erro de login exibida conforme esperado    console=True

Validar Redirecionamento Para Dashboard
    Wait Until Location Contains    /dashboard    timeout=${TIMEOUT}
