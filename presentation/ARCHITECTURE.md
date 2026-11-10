# Arquitetura do Conecta Social

## Escopo dos slides

Os slides 6 (arquitetura) e 7 (CloudStack) mostram o **deploy atual**: a API roda numa VM do **Apache CloudStack 4.22**, que por sua vez está instalado numa VM da **Azure**. O deploy anterior na Oracle Cloud (relatório de 06/10/2026) foi substituído e fica só como histórico.

## Componentes

| Componente | Papel no fluxograma | Onde está documentado |
|---|---|---|
| Web (Next.js) e mobile (React Native/Expo) | Clientes; o app escolhe a API pelo botão de ambientes | Código das aplicações |
| Azure: VM `vm-cloudstack` (D4s_v4, Ubuntu 24.04, KVM aninhado) | Host da nuvem privada | `conecta-social-api/deploy/azure-cloudstack/README.md` |
| NSG + DNAT (nftables) | Só 80/443 públicas; tráfego encaminhado ao IP público do CloudStack | idem |
| Apache CloudStack 4.22 | Zona Advanced, pod, cluster KVM, host único (gerência + MySQL + KVM + NFS) | idem |
| Virtual Router | NAT estático e firewall da rede isolada 10.1.1.0/24 | idem |
| `vm-conecta-social` + Docker Compose | Caddy (HTTPS) e API NestJS (JWT) | `deploy/azure-cloudstack/` |
| MongoDB Atlas | Banco oficial do time, fora da Azure | `DATABASE_PROVIDER=mongo` |
| GitHub Actions → Docker Hub → atualizador | Entrega contínua por *pull*: a VM baixa a imagem nova a cada 5 min | `.github/workflows/main.yml` da API |
| S3 e Better Stack | Integrações presentes no código, **não configuradas** neste deploy | Código da API |

## Leitura visual

1. Faixa superior: Web + mobile → NSG/DNAT (Azure) → Virtual Router (CloudStack) → Caddy → NestJS → MongoDB Atlas. As molduras tracejadas mostram o que está dentro da Azure e o que está dentro do CloudStack.
2. Faixa inferior: GitHub Actions → Docker Hub → atualizador na VM, e um bloco de operação (desligamento diário às 23h, VMs religadas no boot).

O fluxograma é SVG editável em `src/components/Architecture.tsx`; estilos nas classes `.flow-*` de `src/style.css`. O conteúdo do slide do CloudStack está em `cloudstackContent` (`src/data/content.ts`). Para trocar o SVG por uma imagem, coloque-a em `public/images/` e configure `architecture.replacementImage`.

## Histórico

- `references/POC-Apache-CloudStack-2026.pdf`: POC de setembro (laboratório `cs-mgmt` + `cs-kvm01`). A implantação na Azure usou faixas de rede diferentes.
- `public/images/arquitetura-poc-oracle.png`: imagem do deploy Oracle, não utilizada.
