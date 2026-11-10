import { architecture } from '../data/content'

interface FlowNodeProps {
  x: number
  y: number
  width: number
  number: string
  title: string
  detail: string
  variant?: 'pending' | 'conditional'
}

function FlowNode({ x, y, width, number, title, detail, variant }: FlowNodeProps) {
  return <g className={variant ? `flow-node flow-node-${variant}` : 'flow-node'}>
    <rect x={x} y={y} width={width} height="88" rx="14" />
    <text x={x + 18} y={y + 24} className="flow-node-number">{number}</text>
    <text x={x + 18} y={y + 53} className="flow-node-title">{title}</text>
    <text x={x + 18} y={y + 75} className="flow-node-detail">{detail}</text>
  </g>
}

/** Deploy atual: Azure → Apache CloudStack → VM da aplicação → MongoDB Atlas. */
export function Architecture() {
  if (architecture.replacementImage) return <img className="architecture-image" src={architecture.replacementImage} alt="Diagrama de arquitetura configurado para substituir o fluxograma editável" />

  return <svg className="architecture-flow" viewBox="0 0 1390 430" role="img" aria-labelledby="architecture-title architecture-description">
    <title id="architecture-title">Fluxograma da arquitetura do Conecta Social</title>
    <desc id="architecture-description">Clientes web e mobile chegam por HTTPS a uma VM na Azure, que libera apenas as portas 80 e 443 e encaminha o tráfego ao Apache CloudStack instalado nela. O roteador virtual do CloudStack aplica NAT estático e firewall e entrega à VM da aplicação, onde o Caddy faz o HTTPS e repassa à API NestJS com JWT. A API usa o MongoDB Atlas do time, fora da Azure. Na entrega contínua, o GitHub Actions publica a imagem no Docker Hub e um atualizador na VM baixa a versão nova a cada 5 minutos.</desc>
    <defs>
      <marker id="flow-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="#74c7f3" /></marker>
      <marker id="flow-arrow-pending" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="#90a9bb" /></marker>
    </defs>

    <g className="flow-lane">
      <rect x="1" y="1" width="1388" height="255" rx="18" />
      <text x="31" y="34" className="flow-lane-title">FLUXO DA APLICAÇÃO</text>
      <text x="1357" y="34" textAnchor="end" className="flow-lane-meta">AZURE · APACHE CLOUDSTACK 4.22</text>
      <rect x="250" y="48" width="874" height="180" rx="16" className="flow-boundary" />
      <text x="268" y="70" className="flow-boundary-label">AZURE · VM UBUNTU 24.04 COM KVM</text>
      <rect x="484" y="82" width="628" height="134" rx="14" className="flow-boundary" />
      <text x="500" y="102" className="flow-boundary-label">APACHE CLOUDSTACK · REDE ISOLADA 10.1.1.0/24</text>
      <path className="flow-connector" d="M230 156 H268" />
      <path className="flow-connector" d="M463 156 H500" />
      <path className="flow-connector" d="M700 156 H728" />
      <path className="flow-connector" d="M908 156 H935" />
      <path className="flow-connector" d="M1110 156 H1160" />
      <FlowNode x={30} y={112} width={200} number="01 · CLIENTES" title="Web + mobile" detail="Next.js · Expo" />
      <FlowNode x={268} y={112} width={195} number="02 · ENTRADA" title="NSG + DNAT" detail="só 80/443 · nftables" />
      <FlowNode x={500} y={112} width={200} number="03 · CLOUDSTACK" title="Virtual Router" detail="NAT estático · firewall" />
      <FlowNode x={728} y={112} width={180} number="04 · VM APP" title="Caddy" detail="HTTPS · proxy" />
      <FlowNode x={935} y={112} width={175} number="05 · API" title="NestJS" detail="JWT · Docker" />
      <FlowNode x={1160} y={112} width={200} number="06 · DADOS" title="MongoDB Atlas" detail="banco oficial do time" />
      <text x="31" y="245" className="flow-lane-caption">Só 80/443 ficam abertas ao público e o SSH é restrito por IP. A VM da aplicação não guarda banco: a API acessa o Atlas, fora da Azure.</text>
    </g>

    <g className="flow-lane flow-lane-code">
      <rect x="1" y="269" width="1388" height="160" rx="18" />
      <text x="31" y="301" className="flow-lane-title">ENTREGA CONTÍNUA E OPERAÇÃO</text>
      <path className="flow-connector" d="M290 366 H340" />
      <path className="flow-connector" d="M580 366 H630" />
      <FlowNode x={30} y={322} width={260} number="01 · CI/CD" title="GitHub Actions" detail="build · testes · versão" />
      <FlowNode x={340} y={322} width={240} number="02 · REGISTRO" title="Docker Hub" detail="imagem da API :latest" />
      <FlowNode x={630} y={322} width={280} number="03 · DEPLOY (PULL)" title="Atualizador" detail="na VM · a cada 5 minutos" />
      <FlowNode x={960} y={322} width={400} number="OPERAÇÃO" title="Custo sob controle" detail="desliga às 23h · religa as VMs no boot" variant="conditional" />
    </g>
  </svg>
}
