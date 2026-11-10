# Conteúdo pendente e validações

## Para preencher

- Confirmar se os orientadores e disciplinas do documento acadêmico de 2025 ainda são os da banca atual antes de exibi-los.
- Se a banca exigir uma tela de auditoria nos slides, capturar a aba Logs e decidir se ela merece substituir uma das quatro capturas mobile já incluídas. A consulta de logs continua prevista para a demonstração ao vivo.
- Se desejado, substituir as capturas web históricas por versões atuais em `public/screenshots/web/` e atualizar o manifesto. As imagens existentes têm dados demonstrativos/antigos.
- Revisar o roteiro oral com o aplicativo e o equipamento de projeção disponíveis no dia.

## Para validar antes da banca

- No dia, ligar a VM da Azure com antecedência (~5 min até a API responder) e conferir se a `vm-conecta-social` subiu: há uma corrida conhecida no boot com o roteador virtual.
- No app mobile, selecionar no botão API a opção da VM CloudStack (`https://57-156-63-84.sslip.io`).
- S3 e Better Stack estão no código, mas não configurados na VM do CloudStack: imagens de doações aparecem sem foto.
- A API da VM grava no MongoDB Atlas oficial do time: evitar operações destrutivas na demonstração.
- Rever status documental de R04: a matriz o marca como aceito, enquanto o entrypoint atual condiciona migrations e seed a flags.
- Validar o tratamento de R02, R03, R05 e R09 por endpoint e ambiente antes de atualizar as classificações.
- Não declarar sincronização offline como entregue: aparece como requisito no README mobile, sem implementação confirmada na inspeção.
- Confirmar se o trecho de URLs Instagram cobre todos os formatos aceitos pela aplicação antes de descrevê-lo como validação completa.
- Rever se os logs exigem sanitização profunda: a implementação observada redige apenas chaves no primeiro nível do payload.
- Confirmar a versão final, a autoria e os agradecimentos do resumo expandido antes da banca: o arquivo recebido traz nomes diferentes dos quatro integrantes informados para esta apresentação.

## Divergências de fonte

- O documento acadêmico de 2025 e os READMEs listam integrantes diferentes; para esta apresentação, usar os quatro nomes fornecidos diretamente pelo usuário em 20/10/2026.
- O resumo expandido recebido em 20/10/2026 também traz autoria e agradecimentos divergentes; o slide usa somente seu conteúdo temático, sem reproduzir esses créditos.
- O README mobile descreve requisitos e diretrizes que não devem ser confundidos com funcionalidades comprovadas.
- O relatório de nuvem de 06/10/2026 descreve o deploy na Oracle Cloud com PostgreSQL. Ele foi substituído pelo deploy no Apache CloudStack sobre a Azure com MongoDB Atlas (out–nov/2026), que é o que os slides mostram.
- A POC de setembro planejou faixas de rede e storage diferentes das usadas na Azure. Valores implementados: gerência 192.168.100.0/24, pública 192.168.200.10–50, rede guest 10.1.1.0/24.
- Um documento de riscos operacionais de maio de 2026 é anterior a componentes de auditoria hoje encontrados no código. Ele serve como contexto histórico, não como retrato automático do estado atual.
