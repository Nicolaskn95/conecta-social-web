*** Settings ***
Documentation       Page Object para listagem, cadastro e exclusão de Eventos
Library             SeleniumLibrary
Resource            ../variables.resource

*** Variables ***
# Listagem
${BTN_NOVO_EVENTO}              xpath=//button[contains(., 'Novo Evento')]
${INPUT_SEARCH_EVENTO}          xpath=//input[contains(@class, 'search-input')]
${TABELA_EVENTOS}               xpath=//table
${MODAL_EXCLUIR_CONFIRMAR}      xpath=//button[contains(@class, 'btn-danger') and (contains(text(), 'Excluir') or contains(text(), 'Excluindo'))]

# Formulário de Cadastro
${INPUT_EVENTO_TITULO}          xpath=//input[@id='titulo']
${INPUT_EVENTO_DATA}            xpath=//input[@id='data']
${INPUT_EVENTO_CAPACIDADE}      xpath=//input[@id='capacidade']
${SELECT_EVENTO_STATUS}         xpath=//select[@id='status']
${TEXTAREA_EVENTO_DESCRICAO}    xpath=//textarea[@id='descricao']
${INPUT_EVENTO_CEP}             xpath=//input[@id='cep']
${INPUT_EVENTO_ESTADO}          xpath=//input[@id='estado']
${INPUT_EVENTO_CIDADE}          xpath=//input[@id='cidade']
${INPUT_EVENTO_BAIRRO}          xpath=//input[@id='bairro']
${INPUT_EVENTO_RUA}             xpath=//input[@id='rua']
${INPUT_EVENTO_NUMERO}          xpath=//input[@id='numero']
${INPUT_EVENTO_COMPLEMENTO}     xpath=//input[@id='complemento']
${INPUT_EVENTO_INSTAGRAM}       xpath=//input[@id='instagram']
${BTN_EVENTO_SALVAR}            xpath=//button[@type='submit'] | //button[contains(., 'Cadastrar') or contains(., 'Salvar')]

*** Keywords ***
Acessar Listagem De Eventos
    Go To    ${BASE_URL}/dashboard/events
    Wait Until Element Is Visible    ${TABELA_EVENTOS}    timeout=${TIMEOUT}

Clicar Em Novo Evento
    Wait Until Element Is Visible    ${BTN_NOVO_EVENTO}    timeout=${TIMEOUT}
    Click Button                     ${BTN_NOVO_EVENTO}
    Wait Until Location Contains     /dashboard/events/register    timeout=${TIMEOUT}
    Wait Until Element Is Visible    ${INPUT_EVENTO_TITULO}        timeout=${TIMEOUT}

Preencher Formulario De Evento
    [Arguments]    ${titulo}    ${data_hora}    ${descricao}    ${cep}    ${numero}    ${instagram_url}=${TEST_INSTAGRAM_URL}
    Input Text      ${INPUT_EVENTO_TITULO}          ${titulo}
    ${el_data}=     Get WebElement                  ${INPUT_EVENTO_DATA}
    Execute Javascript
    ...    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    ...    setter.call(arguments[0], arguments[1]);
    ...    arguments[0].dispatchEvent(new Event('input', { bubbles: true }));
    ...    arguments[0].dispatchEvent(new Event('change', { bubbles: true }));
    ...    ARGUMENTS    ${el_data}    ${data_hora}
    Input Text      ${TEXTAREA_EVENTO_DESCRICAO}    ${descricao}
    Input Text      ${INPUT_EVENTO_CEP}             ${cep}
    Press Keys      ${INPUT_EVENTO_CEP}             TAB
    # Aguarda preenchimento automático do endereço pelo CEP
    Sleep           2s
    Input Text      ${INPUT_EVENTO_NUMERO}          ${numero}
    IF    '${instagram_url}' != ''
        Input Text  ${INPUT_EVENTO_INSTAGRAM}       ${instagram_url}
    END

Submeter Cadastro De Evento
    ${btn_salvar}=    Set Variable    xpath=//button[@type='submit']
    Scroll Element Into View         ${btn_salvar}
    Wait Until Element Is Enabled    ${btn_salvar}    timeout=${TIMEOUT}
    Click Button                     ${btn_salvar}
    Wait Until Location Does Not Contain    /register          timeout=${TIMEOUT}
    Wait Until Location Contains            /dashboard/events  timeout=${TIMEOUT}
    Wait Until Element Is Visible           ${TABELA_EVENTOS}  timeout=${TIMEOUT}

Pesquisar Evento Na Tabela
    [Arguments]    ${termo}
    Wait Until Element Is Visible    ${INPUT_SEARCH_EVENTO}    timeout=${TIMEOUT}
    Clear Element Text               ${INPUT_SEARCH_EVENTO}
    Input Text                       ${INPUT_SEARCH_EVENTO}    ${termo}
    Sleep                            1s

Validar Evento Na Tabela
    [Arguments]    ${titulo_evento}
    Wait Until Page Contains Element    xpath=//table//tbody//tr[contains(., '${titulo_evento}')]    timeout=${TIMEOUT}
    Log    Evento '${titulo_evento}' localizado na tabela administrativa com sucesso!    console=True

Excluir Evento Da Tabela
    [Arguments]    ${titulo_evento}
    ${btn_del}=    Get WebElement    xpath=//table//tbody//tr[contains(., '${titulo_evento}')]//button[contains(@class, 'danger') or .//*[contains(@class, 'danger')]] | //table//tbody//tr[contains(., '${titulo_evento}')]//*[contains(@class, 'danger')]
    Execute Javascript    arguments[0].click();    ARGUMENTS    ${btn_del}
    Wait Until Element Is Visible    ${MODAL_EXCLUIR_CONFIRMAR}    timeout=${TIMEOUT}
    Click Button                     ${MODAL_EXCLUIR_CONFIRMAR}
    Sleep                            2s
    Wait Until Page Does Not Contain Element    xpath=//table//tbody//tr[contains(., '${titulo_evento}')]    timeout=${TIMEOUT}
    Log    Evento '${titulo_evento}' excluído com sucesso (cleanup realizado)!    console=True
