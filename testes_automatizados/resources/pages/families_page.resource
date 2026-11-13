*** Settings ***
Documentation       Page Object para listagem e cadastro de Famílias
Library             SeleniumLibrary
Resource            ../variables.resource

*** Variables ***
# Listagem
${TABELA_FAMILIAS}              xpath=//table
${INPUT_SEARCH_FAMILIA}         xpath=//input[contains(@class, 'search-input')]
${BTN_NOVA_FAMILIA}             xpath=//button[contains(., 'Nova Família') or contains(., 'Cadastrar')]

# Formulário de Cadastro
${INPUT_FAMILIA_NOME}           xpath=//input[@id='family_name']
${INPUT_FAMILIA_CEP}            xpath=//input[@id='cep']
${INPUT_FAMILIA_ESTADO}         xpath=//input[@id='estado']
${INPUT_FAMILIA_CIDADE}         xpath=//input[@id='cidade']
${INPUT_FAMILIA_BAIRRO}         xpath=//input[@id='bairro']
${INPUT_FAMILIA_RUA}            xpath=//input[@id='rua']
${INPUT_FAMILIA_NUMERO}         xpath=//input[@id='numero']
${BTN_FAMILIA_SALVAR}           xpath=//form//button[@type='submit']

*** Keywords ***
Acessar Listagem De Familias
    Go To    ${BASE_URL}/dashboard/families
    Wait Until Element Is Visible    ${TABELA_FAMILIAS}    timeout=${TIMEOUT}

Clicar Em Nova Familia
    Wait Until Element Is Visible    ${BTN_NOVA_FAMILIA}    timeout=${TIMEOUT}
    Click Button                     ${BTN_NOVA_FAMILIA}
    Wait Until Location Contains     /dashboard/families/register    timeout=${TIMEOUT}
    Wait Until Element Is Visible    ${INPUT_FAMILIA_NOME}           timeout=${TIMEOUT}

Preencher Formulario De Familia
    [Arguments]    ${nome}    ${cep}    ${numero}
    Input Text      ${INPUT_FAMILIA_NOME}    ${nome}
    Input Text      ${INPUT_FAMILIA_CEP}     ${cep}
    Press Keys      ${INPUT_FAMILIA_CEP}     TAB
    Sleep           2s
    Input Text      ${INPUT_FAMILIA_NUMERO}  ${numero}

Submeter Cadastro De Familia
    Scroll Element Into View         ${BTN_FAMILIA_SALVAR}
    Wait Until Element Is Enabled    ${BTN_FAMILIA_SALVAR}    timeout=${TIMEOUT}
    Click Button                     ${BTN_FAMILIA_SALVAR}
    Wait Until Location Contains     /dashboard/families      timeout=${TIMEOUT}
    Wait Until Element Is Visible    ${TABELA_FAMILIAS}       timeout=${TIMEOUT}

Pesquisar Familia Na Tabela
    [Arguments]    ${termo}
    Wait Until Element Is Visible    ${INPUT_SEARCH_FAMILIA}    timeout=${TIMEOUT}
    Clear Element Text               ${INPUT_SEARCH_FAMILIA}
    Input Text                       ${INPUT_SEARCH_FAMILIA}    ${termo}
    Sleep                            1s

Validar Familia Na Tabela
    [Arguments]    ${nome_familia}
    Wait Until Page Contains Element    xpath=//table//tbody//tr[contains(., '${nome_familia}')]    timeout=${TIMEOUT}
    Log    Família '${nome_familia}' localizada na listagem com sucesso!    console=True
