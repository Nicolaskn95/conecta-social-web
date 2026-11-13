*** Settings ***
Documentation       Page Object para a Landing Page (Página Inicial Pública) e seções públicas
Library             SeleniumLibrary
Resource            ../variables.resource

*** Variables ***
${HEADER_LOGO}                  xpath=//header//img[@alt='logo'] | //header//a[@href='/']
${NAV_LINK_HOME}                xpath=//nav//p[contains(text(), 'Home')] | //nav//a[contains(text(), 'Home')]
${NAV_LINK_SOBRE}               xpath=//nav//p[contains(text(), 'Sobre')] | //nav//a[contains(text(), 'Sobre')]
${NAV_LINK_FALE_CONOSCO}        xpath=//nav//p[contains(text(), 'Fale Conosco')] | //nav//a[contains(text(), 'Fale Conosco')]
${SECTION_NOSSO_TRABALHO}       xpath=//h1[contains(., 'Nosso Trabalho')]
${SECTION_EVENTOS}              xpath=//h2[contains(., 'Eventos')]
${SECTION_COMO_AJUDAR}          xpath=//h2[contains(., 'Como ajudar?')]
${SECTION_CALENDARIO}           xpath=//h1[contains(., 'Calendário')]
${FOOTER_LINK_CREDENCIADOS}     xpath=//footer//a[@href='/login'] | //footer//a[contains(text(), 'Credenciados')]
${EVENT_CARDS_CONTAINER}        xpath=//section[@id='events']//div[contains(@class, 'events-cards')] | //section[@id='events']

*** Keywords ***
Acessar A Landing Page
    Go To    ${BASE_URL}
    Wait Until Element Is Visible    ${HEADER_LOGO}    timeout=${TIMEOUT}

Validar Elementos Principais Da Landing Page
    Wait Until Element Is Visible    ${HEADER_LOGO}                 timeout=${TIMEOUT}
    Wait Until Element Is Visible    ${NAV_LINK_HOME}               timeout=${TIMEOUT}
    Wait Until Element Is Visible    ${NAV_LINK_SOBRE}              timeout=${TIMEOUT}
    Wait Until Element Is Visible    ${NAV_LINK_FALE_CONOSCO}       timeout=${TIMEOUT}
    Wait Until Page Contains Element    ${SECTION_NOSSO_TRABALHO}      timeout=${TIMEOUT}
    Wait Until Page Contains Element    ${SECTION_EVENTOS}             timeout=${TIMEOUT}
    Wait Until Page Contains Element    ${SECTION_COMO_AJUDAR}         timeout=${TIMEOUT}
    Wait Until Page Contains Element    ${SECTION_CALENDARIO}          timeout=${TIMEOUT}
    Wait Until Page Contains Element    ${FOOTER_LINK_CREDENCIADOS}    timeout=${TIMEOUT}

Clicar No Link Sobre Do Cabecalho
    Click Element    ${NAV_LINK_SOBRE}
    Wait Until Location Contains    /about    timeout=${TIMEOUT}
    Wait Until Page Contains        Sobre     timeout=${TIMEOUT}

Clicar No Link Fale Conosco Do Cabecalho
    Click Element    ${NAV_LINK_FALE_CONOSCO}
    Wait Until Location Contains    /contactUs       timeout=${TIMEOUT}
    Wait Until Page Contains        Fale Conosco     timeout=${TIMEOUT}

Clicar No Link Credenciados Do Rodape
    Scroll Element Into View         ${FOOTER_LINK_CREDENCIADOS}
    Wait Until Element Is Visible    ${FOOTER_LINK_CREDENCIADOS}    timeout=${TIMEOUT}
    Click Element                    ${FOOTER_LINK_CREDENCIADOS}
    Wait Until Location Contains     /login                         timeout=${TIMEOUT}

Validar Evento Exibido Na Landing Page
    [Arguments]    ${titulo_evento}
    Scroll Element Into View         ${SECTION_EVENTOS}
    Wait Until Page Contains Element    xpath=//section[@id='events']//*[contains(text(), '${titulo_evento}')]    timeout=${TIMEOUT}
    Log    Evento '${titulo_evento}' localizado com sucesso na Landing Page!    console=True
