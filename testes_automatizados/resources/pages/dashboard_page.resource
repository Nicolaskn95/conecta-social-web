*** Settings ***
Documentation       Page Object para o Dashboard e Menu Lateral
Library             SeleniumLibrary
Resource            ../variables.resource

*** Variables ***
${DASHBOARD_TITLE}          xpath=//h1[contains(., 'Dashboard')] | //div[contains(., 'Dashboard')]
${SIDEBAR}                  xpath=//aside[contains(@class, 'sidebar-color')] | //aside
${MENU_DASHBOARD}           xpath=//aside//a[@href='/dashboard']
${MENU_FAMILIAS}            xpath=//aside//a[@href='/dashboard/families']
${MENU_DOACOES}             xpath=//aside//a[@href='/dashboard/donations']
${MENU_DOACAO_FAMILIA}      xpath=//aside//a[@href='/dashboard/donations-to-family']
${MENU_EVENTOS}             xpath=//aside//a[@href='/dashboard/events']
${MENU_VOLUNTARIOS}         xpath=//aside//a[@href='/dashboard/volunteers']
${USER_PROFILE_DROPDOWN}    xpath=//header//div[contains(@class, 'rounded-full') and contains(@class, 'cursor-pointer')] | //header//button[contains(@class, 'text-gray-600')]

*** Keywords ***
Validar Elementos Do Dashboard
    Wait Until Element Is Visible    ${SIDEBAR}                  timeout=${TIMEOUT}
    Wait Until Page Contains Element    ${MENU_DASHBOARD}           timeout=${TIMEOUT}
    Wait Until Page Contains Element    ${MENU_FAMILIAS}            timeout=${TIMEOUT}
    Wait Until Page Contains Element    ${MENU_DOACOES}             timeout=${TIMEOUT}
    Wait Until Page Contains Element    ${MENU_EVENTOS}             timeout=${TIMEOUT}
    Wait Until Page Contains Element    ${MENU_VOLUNTARIOS}         timeout=${TIMEOUT}

Navegar Para Modulo Familias
    Wait Until Element Is Visible    ${MENU_FAMILIAS}            timeout=${TIMEOUT}
    Click Element                    ${MENU_FAMILIAS}
    Wait Until Location Contains     /dashboard/families         timeout=${TIMEOUT}

Navegar Para Modulo Voluntarios
    Wait Until Element Is Visible    ${MENU_VOLUNTARIOS}         timeout=${TIMEOUT}
    Click Element                    ${MENU_VOLUNTARIOS}
    Wait Until Location Contains     /dashboard/volunteers       timeout=${TIMEOUT}

Navegar Para Modulo Doacoes
    Wait Until Element Is Visible    ${MENU_DOACOES}             timeout=${TIMEOUT}
    Click Element                    ${MENU_DOACOES}
    Wait Until Location Contains     /dashboard/donations        timeout=${TIMEOUT}

Navegar Para Modulo Eventos
    Wait Until Element Is Visible    ${MENU_EVENTOS}             timeout=${TIMEOUT}
    Click Element                    ${MENU_EVENTOS}
    Wait Until Location Contains     /dashboard/events           timeout=${TIMEOUT}
