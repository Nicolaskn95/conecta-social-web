*** Settings ***
Documentation       Page Object para listagem de Doações
Library             SeleniumLibrary
Resource            ../variables.resource

*** Variables ***
${TABELA_DOACOES}           xpath=//table
${INPUT_SEARCH_DOACAO}      xpath=//input[contains(@class, 'search-input')]

*** Keywords ***
Acessar Listagem De Doacoes
    Go To    ${BASE_URL}/dashboard/donations
    Wait Until Element Is Visible    ${TABELA_DOACOES}    timeout=${TIMEOUT}

Pesquisar Doacao Na Tabela
    [Arguments]    ${termo}
    Wait Until Element Is Visible    ${INPUT_SEARCH_DOACAO}    timeout=${TIMEOUT}
    Clear Element Text               ${INPUT_SEARCH_DOACAO}
    Input Text                       ${INPUT_SEARCH_DOACAO}    ${termo}
    Sleep                            1s

Validar Presenca De Doacoes Na Tabela
    Wait Until Element Is Visible       ${TABELA_DOACOES}    timeout=${TIMEOUT}
    Wait Until Page Contains Element    xpath=//table//thead//tr | //div[contains(., 'itens')]    timeout=${TIMEOUT}
