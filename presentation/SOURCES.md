# Fontes dos slides

| Slides | Afirmações principais | Fontes |
|---|---|---|
| 1–2 | Nome, propósito, público, Fatec e curso | `conecta-social-resources/README.md`; `conecta-social-web/README.md`; `conecta-social-mobile/README.md`; `conecta-social-resources/Conecta-Social-PI.pdf` (documento histórico de 2025) |
| 1 | Integrantes da apresentação | Nomes fornecidos diretamente pelo usuário em 20/10/2026 |
| 3 | Evolução: base web e API anteriores; mobile neste semestre | Informação fornecida pela equipe; `conecta-social-web/README.md`; `conecta-social-mobile/README.md` |
| 4–5 | R01–R10, exceto R06, valores, severidade e tratamento | `conecta-social-api/RISK_MATRIX.md` |
| 5 | R01: ocultação de chaves sensíveis no primeiro nível e envio assíncrono; R02: tentativas de login sem controle e tratamento proposto | `conecta-social-api/RISK_MATRIX.md`; `conecta-social-api/src/common/interceptor/logging.interceptor.ts`; `src/common/logger/logger.service.ts` |
| 6–7 | Azure, Apache CloudStack 4.22, roteador virtual, Caddy, NestJS, MongoDB Atlas, entrega contínua | `conecta-social-api/deploy/azure-cloudstack/` (README, compose, Caddyfile) e ambiente em execução (out–nov/2026) |
| 6 | S3, Better Stack e opção MongoDB | `conecta-social-api/src/modules/donation/services/donation-image.service.ts`; `src/common/logger/logger.service.ts`; `src/infra/database/database.module.ts` |
| 7 | Web: tabela de eventos; mobile: aba Eventos com publicações ilustradas | `conecta-social-resources/capturas de tela/print6.png`; `conecta-social-web/src/app/(pages)/(manager)/dashboard/events/page.tsx`; `presentation/public/screenshots/mobile/eventos.png` (simulador, 20/10/2026) |
| 8 | Web: dashboard amplo; mobile: cards e gráfico por período | `conecta-social-resources/capturas de tela/print8.png`; `conecta-social-web/src/app/(pages)/(manager)/dashboard/page.tsx`; `presentation/public/screenshots/mobile/dashboard.png` (simulador, 20/10/2026) |
| 9 | Lista de doações com filtros; formulário de ajuste de estoque | `presentation/public/screenshots/mobile/doacoes-lista.png`; `presentation/public/screenshots/mobile/ajuste-estoque.png` (simulador, 20/10/2026); `conecta-social-mobile/src/screens/DonationsListScreen.tsx`; `DonationDetailScreen.tsx` |
| 10 | Objetivo, metodologia, resultados, conclusões e limitações sintetizados | `Conecta Social - Resumo Expandido.docx`, fornecido pelo usuário em 20/10/2026 (seções 1–4) |
| 11 | Transição para demo real | Solicitação do usuário |

As capturas web são históricas. As quatro capturas mobile foram fornecidas pelo usuário em 20/10/2026 e feitas no simulador iPhone 16 Plus. Textos e números visíveis nas imagens não foram usados como métricas da apresentação. O deploy na Azure só responde com a VM ligada; conferir antes da banca. O documento `conecta-social-resources/riscos-operacionais-evolucoes-imediatas-2026-05-28.md` foi consultado como contexto histórico e pode divergir do código atual.

O fluxograma de arquitetura foi construído em SVG editável a partir do deploy atual no Apache CloudStack sobre a Azure. O deploy anterior na Oracle Cloud (relatório de 06/10/2026) e a POC CloudStack (`presentation/references/POC-Apache-CloudStack-2026.pdf`) ficam como histórico.

O ícone exibido nos slides foi copiado de `conecta-social-mobile/assets/icon.png`; o SVG original de `conecta-social-web/public/images/logo.svg` também foi preservado em `presentation/public/images/` para reutilização.
