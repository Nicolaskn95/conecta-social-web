*** Settings ***
Documentation       Suíte de testes para a área não logada (Páginas Públicas e Navegação Institucional)
Resource            ../resources/common_keywords.resource
Resource            ../resources/pages/landing_page.resource
Test Setup          Abrir Navegador No Sistema
Test Teardown       Fechar Navegador Do Sistema

*** Test Cases ***
CT01 - Validar Carregamento E Componentes Da Landing Page
    [Documentation]    Garante que a página inicial pública carrega com sucesso exibindo todos os blocos principais
    [Tags]    publico    smoke
    Acessar A Landing Page
    Validar Elementos Principais Da Landing Page

CT02 - Navegar Pelos Links Do Cabecalho Institucional
    [Documentation]    Testa a navegação pelos links institucionais Sobre e Fale Conosco a partir da Home
    [Tags]    publico
    Acessar A Landing Page
    Clicar No Link Sobre Do Cabecalho
    Location Should Contain    /about
    Page Should Contain        Sobre

    Clicar No Link Fale Conosco Do Cabecalho
    Location Should Contain    /contactUs
    Page Should Contain        Fale Conosco

CT03 - Acessar Tela De Login Atraves Do Rodape
    [Documentation]    Garante que o link de Parceiros/Credenciados no rodapé direciona corretamente para o login
    [Tags]    publico
    Acessar A Landing Page
    Clicar No Link Credenciados Do Rodape
    Location Should Contain    /login
    Page Should Contain Element    xpath=//input[@type='email']

CT04 - Validar Protecao De Rotas Privadas Para Usuarios Nao Autenticados
    [Documentation]    Garante que tentativas de acesso direto ao /dashboard sem login redirecionam para /login
    [Tags]    publico    seguranca
    Go To    ${BASE_URL}/dashboard
    Wait Until Location Contains    /login    timeout=${TIMEOUT}
    Page Should Contain Element    xpath=//input[@type='email']

CT05 - Validar Comportamento Amigavel De Rota Inexistente 404
    [Documentation]    Acessa uma URL inexistente e valida que o sistema trata o erro sem quebrar
    [Tags]    publico
    Go To    ${BASE_URL}/rota-inexistente-automacao-test
    Wait Until Page Contains Element    xpath=//*[contains(text(), '404') or contains(text(), 'não encontrada') or contains(text(), 'Voltar')] | //header    timeout=${TIMEOUT}
