*** Settings ***
Documentation       Page Object para listagem de Voluntários
Library             SeleniumLibrary
Resource            ../variables.resource

*** Variables ***
${TABELA_VOLUNTARIOS}           xpath=//table
${INPUT_SEARCH_VOLUNTARIO}      xpath=//input[contains(@class, 'search-input')]
${HEADER_VOLUNTARIOS}           xpath=//h1[contains(., 'Voluntários')] | //h1[contains(., 'Colaboradores')] | //table

*** Keywords ***
Acessar Listagem De Voluntarios
    Go To    ${BASE_URL}/dashboard/volunteers
    Wait Until Element Is Visible    ${TABELA_VOLUNTARIOS}    timeout=${TIMEOUT}

Pesquisar Voluntario Na Tabela
    [Arguments]    ${termo}
    Wait Until Element Is Visible    ${INPUT_SEARCH_VOLUNTARIO}    timeout=${TIMEOUT}
    Clear Element Text               ${INPUT_SEARCH_VOLUNTARIO}
    Input Text                       ${INPUT_SEARCH_VOLUNTARIO}    ${termo}
    Sleep                            1s

Validar Presenca De Registros Na Tabela
    Wait Until Element Is Visible       ${TABELA_VOLUNTARIOS}    timeout=${TIMEOUT}
    Wait Until Page Contains Element    xpath=//table//thead//tr | //div[contains(., 'itens')]    timeout=${TIMEOUT}
