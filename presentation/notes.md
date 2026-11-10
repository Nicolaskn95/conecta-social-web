# Notas do apresentador

O roteiro de fala soma **cerca de 10 min 40 s** antes de uma demonstração de **5 minutos**. As notas não aparecem na interface projetada. Adapte o ritmo à banca e evite ler os textos da tela.

## 1. Conecta Social — 0:30

**Objetivo:** Identificar o produto e o contexto acadêmico.

**Pontos essenciais:** Projeto Integrador da Fatec Votorantim, curso de Desenvolvimento de Software Multiplataforma. Integrantes: Guilherme Pazetti de Oliveira, Caio Cesar Martins de Lima, Maicon Rodrigues dos Santos e Nicolas Katsuji Nagano.

**Fala sugerida:** “Este é o Conecta Social, nosso projeto para apoiar a gestão de iniciativas sociais. Vou mostrar o propósito, o trabalho de segurança, a infraestrutura e como a experiência foi levada para o mobile. No fim, abrimos o aplicativo real.”

**Transição:** Começar pelo problema que a plataforma procura resolver.

## 2. Gestão para iniciativas sociais — 1:00

**Objetivo:** Fazer o pitch sem enumerar telas.

**Pontos essenciais:** Organizações pequenas; doações, eventos e famílias; gestão web e operação mobile.

**Fala sugerida:** “Projetos sociais de pequeno porte precisam organizar recursos e atividades com equipes enxutas. O Conecta Social reúne esses dados e oferece uma área web de gestão. O aplicativo mobile leva consulta e operações para uma interface própria de uso em campo. O ganho esperado é clareza na rotina; não estamos apresentando um indicador de impacto medido.”

**Transição:** Apresentar a evolução da plataforma até o aplicativo mobile.

## 3. Evolução do projeto — 0:30

**Objetivo:** Situar a entrega mobile na trajetória do projeto.

**Pontos essenciais:** API e gestão web formavam a base anterior; o aplicativo mobile foi construído neste semestre.

**Fala sugerida:** “O Conecta Social já contava com uma API para as regras e os dados e com uma aplicação web para gestão. Neste semestre, construímos o aplicativo mobile, ampliando o acesso à plataforma e trazendo operações para o uso em campo.”

**Transição:** Apresentar os riscos identificados na plataforma.

## 4. Mapa de riscos — 1:00

**Objetivo:** Apresentar a matriz e destacar dois riscos mitigados.

**Pontos essenciais:** R01: impacto 8, probabilidade 7, pontuação 56, alto. R07: impacto 6, probabilidade 3, pontuação 18, médio.

**Fala sugerida:** “Mapeamos nove riscos e vamos destacar dois que já tiveram tratamento. O R01 trata da possível exposição de dados sensíveis nos logs. O R07 trata da validação de links externos do Instagram usados nas publicações.”

**Ação no slide:** Selecionar R01 e depois R07.

**Transição:** Mostrar as medidas aplicadas aos dois riscos.

## 5. Riscos mitigados: R01 e R07 — 1:00

**Objetivo:** Explicar dois tratamentos registrados e observados no código.

**Pontos essenciais:** No R01, o interceptor oculta chaves sensíveis no primeiro nível do payload e o envio dos logs é assíncrono. No R07, a API valida o link do Instagram e gera o embed localmente.

**Fala sugerida:** “No R01, o interceptor oculta campos sensíveis, como senha e token, no primeiro nível dos dados registrados. O envio dos logs também é assíncrono. No R07, a API valida o endereço do Instagram e gera localmente o conteúdo incorporado. Os dois tratamentos estão registrados como mitigados na matriz.”

**Transição:** Explicar onde os componentes da aplicação se encontram.

## 6. Arquitetura do Conecta Social — 1:10

**Objetivo:** Acompanhar uma chamada do usuário até o banco, no deploy atual.

**Pontos essenciais:** Web e mobile chegam por HTTPS a uma VM na Azure, que só libera 80/443 (NSG) e encaminha o tráfego por DNAT ao Apache CloudStack instalado nela. O roteador virtual do CloudStack aplica NAT estático e firewall e entrega à `vm-conecta-social`. Nela, o Caddy faz o HTTPS e repassa à API NestJS (JWT), que usa o MongoDB Atlas do time. Na entrega contínua, o GitHub Actions publica a imagem no Docker Hub e um atualizador na VM baixa a versão nova a cada 5 minutos. S3 e Better Stack existem no código, mas não estão configurados neste deploy.

**Fala sugerida:** “O fluxograma acompanha uma chamada do usuário. A web e o aplicativo acessam a API por HTTPS. A requisição chega a uma máquina virtual na Azure, que só aceita as portas 80 e 443 e repassa o tráfego para o Apache CloudStack, instalado dentro dessa máquina. O CloudStack tem seu próprio roteador virtual, com NAT e firewall, que entrega a requisição à máquina da aplicação. Lá, o Caddy cuida do HTTPS e encaminha para a API NestJS, que autentica por JWT e consulta o MongoDB Atlas. Embaixo está a entrega contínua: a pipeline publica a imagem no Docker Hub e a própria VM busca a versão nova sozinha, sem precisar abrir acesso de fora para dentro.”

**Transição:** Mostrar como o CloudStack foi montado.

## 7. Apache CloudStack na Azure — 1:00

**Objetivo:** Mostrar a nuvem privada que hospeda a aplicação e os problemas resolvidos para montá-la.

**Pontos essenciais:** CloudStack 4.22 em uma VM D4s_v4 com virtualização aninhada. Hierarquia: zona `Azure-Zone` (Advanced), pod, cluster KVM, host único com gerência, MySQL, agente KVM e NFS; rede isolada `rede-conecta-social` com roteador virtual; instância `vm-conecta-social`. Desafios: a Azure descarta MACs desconhecidos (bridges em interfaces dummy + NAT), KVM aninhado, custo (desligamento automático às 23h e VMs religadas no boot) e uma conta somente leitura para o professor.

**Fala sugerida:** “Em vez de hospedar direto na nuvem pública, montamos uma nuvem privada com o Apache CloudStack dentro dela. Todos os papéis ficam numa VM só: gerência, banco do CloudStack, hipervisor KVM e armazenamento NFS. Dentro dele criamos zona, pod, cluster, uma rede isolada com roteador virtual e a máquina da aplicação. O maior desafio foi a rede: a Azure descarta pacotes de endereços MAC que ela não conhece, então as redes do CloudStack ficaram em bridges internas, com NAT para sair. Também automatizamos o desligamento para economizar crédito e criamos uma conta somente leitura para acompanhamento.”

**Ação opcional:** Abrir o painel do CloudStack (`painel.57-156-63-84.sslip.io`) com a conta de leitura e mostrar a `vm-conecta-social` em execução.

**Transição:** Passar da infraestrutura para a experiência nas duas plataformas.

## 8. Eventos: web e mobile — 1:10

**Objetivo:** Comparar a mesma área em dois dispositivos.

**Pontos essenciais:** A captura web histórica mostra a gestão em tabela. A captura do simulador mostra a aba Eventos com publicações ilustradas e acesso ao Instagram. Os exemplos nas imagens não devem ser tratados como resultados do projeto.

**Fala sugerida:** “Aqui podemos comparar duas formas de ver eventos. A web mostra a visão de gestão: tabela, pesquisa e ações por linha. No aplicativo, a aba Eventos apresenta publicações com imagem e um acesso ao Instagram. A diferença não é apenas o tamanho da tela; muda também a forma de navegar e de consumir a informação. As imagens servem para mostrar a interface, não para medir atividade atual.”

**Transição:** Usar o dashboard para discutir densidade de informação.

## 9. Dashboard em duas telas — 1:10

**Objetivo:** Explicar a adaptação de indicadores.

**Pontos essenciais:** A web distribui gráficos em área grande. A captura mobile mostra indicadores em cards, gráfico, escolha de período e rolagem. Os números exibidos não são métricas do projeto.

**Fala sugerida:** “O painel web aproveita o espaço horizontal para distribuir gráficos. No mobile, o Painel começa por indicadores em cards e segue com o gráfico e a seleção do período. A rolagem organiza a leitura em uma coluna mais estreita. O que queremos comparar é a composição da informação nas duas telas; os números vistos nas capturas são apenas dados do ambiente usado.”

**Transição:** Mostrar um fluxo de trabalho que ganha destaque no aplicativo.

## 10. Operação de doações no mobile — 1:10

**Objetivo:** Preparar a demonstração do fluxo operacional.

**Pontos essenciais:** As capturas mostram a lista de doações com filtros por tamanho e gênero e o formulário de ajuste de estoque, incluindo quantidade, motivo e observação. Distribuição e logs podem ser mostrados na demonstração, sem simular telas nos slides.

**Fala sugerida:** “Essas duas telas mostram um percurso operacional. Primeiro, a lista permite filtrar as doações por tamanho e gênero e consultar os itens disponíveis. Depois, no detalhe, o ajuste de estoque registra uma quantidade, um motivo e uma observação. Isso permite representar perda, vencimento ou correção de inventário sem trocar manualmente um número no cadastro. Na demonstração, podemos percorrer esse fluxo no aplicativo e depois abrir os logs de auditoria.”

**Transição:** Registrar o espaço reservado ao material acadêmico final.

## 11. Resumo expandido — 1:00

**Objetivo:** Apresentar a síntese do resumo expandido sem reproduzir seus parágrafos na tela.

**Pontos essenciais:** O texto define a centralização da gestão de organizações sociais como objetivo; descreve desenvolvimento incremental em sprints; relata três aplicações integradas e destaca rastreabilidade e prestação de contas. Registra sincronização offline completa e limite de tentativas no login como pendências.

**Fala sugerida:** “No resumo expandido, organizamos o projeto em quatro partes. O objetivo é reunir doações, famílias, voluntários e eventos num mesmo sistema. A construção foi incremental, em sprints, com aplicações web, API e mobile. O texto apresenta como resultados a área pública, a gestão administrativa, os indicadores e a auditoria. A conclusão é que essa centralização melhora a rastreabilidade e pode apoiar a prestação de contas. Também registramos duas próximas etapas: completar o uso offline e limitar as tentativas de login.”

**Transição:** Abrir o aplicativo real.

## 12. Demonstração ao vivo — 5:00

**Objetivo:** Deixar uma transição clara e uma tela estável durante o preparo.

**Roteiro sugerido:** Antes de começar, ligar a VM na Azure (~5 min) e conferir que a `vm-conecta-social` está Running. No app, escolher no botão **API** a opção da VM CloudStack. Abrir o app mobile; mostrar a navegação por abas; consultar eventos; abrir Painel; filtrar doações; apresentar um detalhe e, se o ambiente permitir, executar uma operação segura de estoque ou distribuição; consultar logs. Ajustar a sequência às contas e aos dados disponíveis. Evitar exibir senhas, tokens ou dados pessoais na projeção.

**Fechamento oral:** “Esse percurso mostra como a proposta de gestão aparece na operação do aplicativo.”
