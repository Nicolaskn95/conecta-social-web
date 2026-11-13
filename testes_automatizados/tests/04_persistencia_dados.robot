*** Settings ***
Documentation       Suíte crítica de persistência de dados e validação de exibição na Landing Page
Resource            ../resources/common_keywords.resource
Resource            ../resources/pages/landing_page.resource
Resource            ../resources/pages/dashboard_page.resource
Resource            ../resources/pages/events_page.resource
Resource            ../resources/pages/families_page.resource
Suite Setup         Abrir Navegador No Sistema
Suite Teardown      Fechar Navegador Da Suite

*** Variables ***
${EVENTO_TITULO_TESTE}      ${EMPTY}
${FAMILIA_NOME_TESTE}       ${EMPTY}

*** Test Cases ***
CT17 - Cadastrar Novo Evento Com Post Do Instagram E Validar Persistencia No Dashboard
    [Documentation]    Cadastra um novo evento com o link do Instagram fornecido e valida sua persistência na tabela administrativa
    [Tags]    persistencia    eventos    critico
    ${id_unico}=    Gerar Identificador Unico    prefixo=EventoRobot
    Set Suite Variable    ${EVENTO_TITULO_TESTE}    ${id_unico}

    Efetuar Login Como Administrador
    Acessar Listagem De Eventos
    Clicar Em Novo Evento

    # Preenche formulário completo com data futura, CEP e o link de Instagram solicitado
    Preencher Formulario De Evento
    ...    titulo=${EVENTO_TITULO_TESTE}
    ...    data_hora=2027-12-31T15:00
    ...    descricao=Evento de automação para validação de exibição na LP
    ...    cep=18114468
    ...    numero=150
    ...    instagram_url=${TEST_INSTAGRAM_URL}

    Submeter Cadastro De Evento

    # Validação de persistência na tabela do painel administrativo
    Acessar Listagem De Eventos
    Pesquisar Evento Na Tabela    ${EVENTO_TITULO_TESTE}
    Validar Evento Na Tabela      ${EVENTO_TITULO_TESTE}

CT18 - Validar Exibicao Do Evento Cadastrado Na Landing Page Nao Logada
    [Documentation]    Acessa a Landing Page pública sem login e verifica se o evento recém-cadastrado aparece na seção de Eventos
    [Tags]    persistencia    eventos    landing_page    critico
    # Acessa diretamente a URL pública da Home
    Go To    ${BASE_URL}
    Wait Until Page Contains Element    ${SECTION_EVENTOS}    timeout=${TIMEOUT}

    # Valida que o evento cadastrado está presente na seção pública de Eventos
    Validar Evento Exibido Na Landing Page    ${EVENTO_TITULO_TESTE}

CT19 - Efetuar Cleanup Do Evento De Teste No Painel Administrativo
    [Documentation]    Remove o evento criado durante o teste para preservar a base de produção limpa
    [Tags]    persistencia    eventos    cleanup
    Acessar Listagem De Eventos
    Pesquisar Evento Na Tabela    ${EVENTO_TITULO_TESTE}
    Excluir Evento Da Tabela      ${EVENTO_TITULO_TESTE}

CT20 - Cadastrar Nova Familia E Validar Persistencia Na Listagem
    [Documentation]    Cadastra uma nova família com identificador dinâmico e valida persistência e busca na listagem
    [Tags]    persistencia    familias
    ${id_familia}=    Gerar Identificador Unico    prefixo=FamRobot
    Set Suite Variable    ${FAMILIA_NOME_TESTE}    ${id_familia}

    Acessar Listagem De Familias
    Clicar Em Nova Familia
    Preencher Formulario De Familia
    ...    nome=${FAMILIA_NOME_TESTE}
    ...    cep=18114468
    ...    numero=250

    Submeter Cadastro De Familia

    # Validação de persistência e pesquisa na tabela
    Acessar Listagem De Familias
    Pesquisar Familia Na Tabela    ${FAMILIA_NOME_TESTE}
    Validar Familia Na Tabela      ${FAMILIA_NOME_TESTE}
