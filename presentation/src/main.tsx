import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowLeft, ArrowRight, Expand, Gift, Grid2X2, HeartHandshake, Minimize2, Monitor, Play, ShieldCheck, Smartphone, Server, X, Cloud } from 'lucide-react'
import { Architecture } from './components/Architecture'
import { RiskMatrix } from './components/RiskMatrix'
import { Screenshot } from './components/Screenshot'
import { abstractContent, cloudstackContent, screenshots, slides, teamMembers } from './data/content'
import type { SlideId } from './data/content'
import './style.css'

const getHashIndex = () => {
  const id = decodeURIComponent(window.location.hash.slice(1))
  const index = slides.findIndex(slide => slide.id === id)
  return index < 0 ? 0 : index
}

function Header({ section, number }: { section: string; number: number }) {
  return <header className="slide-header"><div className="brand"><img src="/images/icon.png" alt=""/><span>Conecta Social</span></div><div className="section-label">{section} <span className="section-divider"/> {String(number).padStart(2, '0')}</div></header>
}

function Slide({ id, selectedRisk, onSelectRisk }: { id: SlideId; selectedRisk: string; onSelectRisk: (id: string) => void }) {
  switch (id) {
    case 'abertura': return <div className="slide-body cover"><div className="cover-orbit"/><div className="cover-content"><div className="eyebrow">PROJETO INTEGRADOR · FATEC VOTORANTIM</div><img className="cover-logo" src="/images/icon.png" alt="Logotipo do Conecta Social"/><h1>Conecta <em>Social</em></h1><p>Gestão de iniciativas sociais em uma plataforma web e mobile.</p><div className="cover-academic">Desenvolvimento de Software Multiplataforma</div><div className="cover-team"><div className="cover-team-label">INTEGRANTES</div><div className="cover-team-grid">{teamMembers.map(name => <span key={name}>{name}</span>)}</div></div></div><div className="cover-glow"/></div>
    case 'pitch': return <div className="slide-body pitch"><div className="eyebrow">01 / PROPÓSITO</div><h2>Gestão para iniciativas sociais</h2><p className="lead">Equipes pequenas precisam organizar doações, eventos e famílias com recursos limitados.</p><div className="pitch-flow"><div><small>DESAFIO</small><strong>Informação dispersa</strong><span>Mais trabalho administrativo para quem atua na comunidade.</span></div><ArrowRight size={34}/><div><small>SOLUÇÃO</small><strong>Conecta Social</strong><span>Cadastros, operações e indicadores em uma plataforma.</span></div><ArrowRight size={34}/><div><small>BENEFÍCIO</small><strong>Operação mais clara</strong><span>Web para gestão; mobile para consulta e trabalho em campo.</span></div></div><div className="pitch-audience"><HeartHandshake size={27}/> Para organizações sociais, gestores e equipes de apoio</div></div>
    case 'timeline': return <div className="slide-body timeline"><div className="eyebrow">01 / EVOLUÇÃO DO PROJETO</div><h2>Uma base construída. Uma nova experiência.</h2><p className="sublead">O mobile amplia uma plataforma que já contava com API e gestão web.</p><div className="timeline-groups"><div className="timeline-previous"><div className="timeline-period">BASE ANTERIOR</div><div className="timeline-cards"><div className="timeline-card"><Server size={34}/><small>BACKEND</small><strong>API</strong><span>NestJS · dados e regras de negócio</span></div><div className="timeline-card"><Monitor size={34}/><small>FRONTEND</small><strong>Gestão web</strong><span>Next.js · interface de gestão</span></div></div></div><ArrowRight className="timeline-arrow" size={34}/><div className="timeline-current"><div className="timeline-period">NESTE SEMESTRE</div><div className="timeline-card"><Smartphone size={38}/><small>NOVA EXPERIÊNCIA</small><strong>App mobile</strong><span>React Native + Expo · operação em campo</span></div></div></div></div>
    case 'matriz': return <div className="slide-body"><div className="eyebrow">02 / SEGURANÇA DA INFORMAÇÃO</div><h2>Mapa de riscos</h2><p className="sublead">Nove riscos documentados · posição pelos valores originais de impacto e probabilidade</p><RiskMatrix selectedId={selectedRisk} onSelect={onSelectRisk}/><div className="slide-note">Classificação de severidade reproduzida da matriz. A pontuação não representa risco residual.</div></div>
    case 'tratamento': return <div className="slide-body"><div className="eyebrow">02 / SEGURANÇA DA INFORMAÇÃO</div><h2>Riscos mitigados: R01 e R07</h2><div className="treatment-layout"><div className="treatment-feature"><span className="feature-icon"><ShieldCheck size={40}/></span><div className="eyebrow">R01 · MITIGADO NA MATRIZ</div><h3>Dados em logs</h3><p>O risco identificado era expor senhas ou tokens nos logs de requisições.</p><p>O interceptor oculta chaves sensíveis no primeiro nível do payload; o envio dos logs não bloqueia a resposta.</p><div className="evidence-line">Impacto 8 · probabilidade 7 · 56 (alto)</div></div><div className="treatment-side"><div><small>R07 · MITIGADO NA MATRIZ</small><strong>URLs do Instagram</strong><span>Links externos precisavam de validação antes da geração das publicações incorporadas.</span></div><div><small>TRATAMENTO IMPLEMENTADO</small><strong>Validação na API</strong><span>A API valida o link e gera o embed localmente. Impacto 6 · probabilidade 3 · 18 (médio).</span></div></div></div></div>
    case 'arquitetura': return <div className="slide-body architecture-slide"><div className="eyebrow">03 / COMPUTAÇÃO EM NUVEM</div><h2>Arquitetura do Conecta Social</h2><p className="sublead">Como as aplicações se conectam à API e aos dados</p><Architecture/><div className="architecture-summary"><span><b>Infraestrutura:</b> Azure · Apache CloudStack 4.22 · Docker Compose · MongoDB Atlas</span><span><b>Proteção:</b> NSG só 80/443 · firewall do CloudStack · HTTPS no Caddy · JWT na API</span></div></div>
    case 'cloudstack': return <div className="slide-body"><div className="eyebrow">03 / COMPUTAÇÃO EM NUVEM</div><h2>Apache CloudStack na Azure</h2><div className="treatment-layout cloudstack-layout"><div className="treatment-feature"><span className="feature-icon"><Cloud size={40}/></span><div className="eyebrow">NUVEM PRIVADA DENTRO DA NUVEM PÚBLICA</div><ul className="cs-hierarchy">{cloudstackContent.hierarchy.map(([label, value]) => <li key={label}><small>{label}</small><span>{value}</span></li>)}</ul></div><div className="treatment-side cloudstack-side">{cloudstackContent.challenges.map(([title, text]) => <div key={title}><small>DESAFIO RESOLVIDO</small><strong>{title}</strong><span>{text}</span></div>)}</div></div></div>
    case 'eventos': return <ComparisonSlide title="Eventos: web e mobile" left="webEvents" right="mobileEvents" labels={['Tabela, pesquisa e ações por linha', 'Publicações na aba Eventos']} />
    case 'dashboard': return <ComparisonSlide title="Dashboard em duas telas" left="webDashboard" right="mobileDashboard" labels={['Gráficos na área do navegador', 'Cards, gráfico e seleção de período']} />
    case 'operacao': return <div className="slide-body compare"><div className="eyebrow">04 / EXPERIÊNCIA MOBILE</div><h2>Operação de doações no mobile</h2><div className="mobile-operation"><div className="operation-item"><Screenshot data={screenshots.mobileDonations}/><span>Filtros por tamanho e gênero</span></div><div className="operation-arrow"><Gift size={42}/><span>Selecionar e ajustar</span><ArrowRight size={30}/></div><div className="operation-item"><Screenshot data={screenshots.mobileStock}/><span>Quantidade e motivo do ajuste</span></div></div></div>
    case 'resumo': return <div className="slide-body abstract"><div className="eyebrow">05 / PRODUÇÃO ACADÊMICA</div><h2>Resumo expandido</h2><p className="sublead">Da necessidade de gestão à operação integrada em web e mobile.</p><div className="abstract-grid">{([['01','Objetivo',abstractContent.objective],['02','Metodologia',abstractContent.methodology],['03','Resultados',abstractContent.results],['04','Conclusões',abstractContent.conclusions]] as const).map(([n,label,value]) => <div key={n}><small>{n}</small><strong>{label}</strong><span>{value}</span></div>)}</div></div>
    case 'demo': return <div className="slide-body demo"><div className="demo-halo"/><div className="demo-phone"><div className="phone-top"/><img src="/images/icon.png" alt=""/><span>Conecta Social</span></div><div className="demo-copy"><div className="eyebrow">06 / APLICAÇÃO MOBILE</div><h1>Demonstração<br/><em>ao vivo</em></h1><p>Agora, vamos ver o projeto em funcionamento.</p><div className="demo-ready"><span className="live-dot"/> Aplicativo real · navegação prática</div></div></div>
  }
}

function ComparisonSlide({ title, left, right }: { title: string; left: keyof typeof screenshots; right: keyof typeof screenshots; labels: [string,string] }) {
  return <div className="slide-body compare"><div className="eyebrow">04 / EXPERIÊNCIA WEB × MOBILE</div><h2>{title}</h2><div className="comparison-grid"><div className="comparison-item"><Screenshot data={screenshots[left]}/></div><div className="comparison-item"><Screenshot data={screenshots[right]}/></div></div></div>
}

function App() {
  const [index, setIndex] = useState(getHashIndex)
  const [overview, setOverview] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [selectedRisk, setSelectedRisk] = useState('R01')
  const [scale, setScale] = useState(1)
  const stageRef = useRef<HTMLDivElement>(null)
  const lastFocus = useRef<HTMLElement | null>(null)
  const overviewClose = useRef<HTMLButtonElement>(null)
  const slide = slides[index]
  const presentSeconds = useMemo(() => slides.slice(0, -1).reduce((sum,s) => sum + s.seconds,0), [])
  const go = (next: number) => setIndex(Math.max(0, Math.min(slides.length-1, next)))
  useEffect(() => { const update = () => setScale(Math.min((window.innerWidth-36)/1600, (window.innerHeight-36)/900)); update(); window.addEventListener('resize', update); return () => window.removeEventListener('resize', update) }, [])
  useEffect(() => { window.location.hash = slides[index].id }, [index])
  useEffect(() => { const onHash = () => setIndex(getHashIndex()); window.addEventListener('hashchange', onHash); return () => window.removeEventListener('hashchange', onHash) }, [])
  useEffect(() => { const onChange = () => setFullscreen(Boolean(document.fullscreenElement)); document.addEventListener('fullscreenchange', onChange); return () => document.removeEventListener('fullscreenchange', onChange) }, [])
  useEffect(() => { if (overview) overviewClose.current?.focus() }, [overview])
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (e.key === 'Escape') { if (overview) { setOverview(false); setTimeout(() => lastFocus.current?.focus(), 0) } return }
      if (overview && e.key.toLowerCase() === 'o') { setOverview(false); setTimeout(() => lastFocus.current?.focus(), 0); return }
      if (target.closest('input, textarea, select, [contenteditable="true"], [role="dialog"]')) return
      if (e.key.toLowerCase() === 'o') { lastFocus.current = document.activeElement as HTMLElement; setOverview(v => !v); return }
      if (e.key.toLowerCase() === 'f') { document.fullscreenElement ? document.exitFullscreen() : stageRef.current?.requestFullscreen(); return }
      if (overview) return
      if (['ArrowRight','ArrowDown','PageDown',' '].includes(e.key)) { e.preventDefault(); go(index+1) }
      if (['ArrowLeft','ArrowUp','PageUp'].includes(e.key)) { e.preventDefault(); go(index-1) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, overview])
  return <div className="app" ref={stageRef}>
    <div className="stage-viewport" style={{width:1600*scale,height:900*scale}}><div className="stage" style={{transform:`scale(${scale})`}}>
      <Header section={slide.section} number={index+1}/>
      <div className="slide-view" key={slide.id}><Slide id={slide.id} selectedRisk={selectedRisk} onSelectRisk={setSelectedRisk}/></div>
      <footer className="slide-footer"><div className="footer-left">PROJETO INTEGRADOR <span/> {index === slides.length-1 ? 'DEMONSTRAÇÃO' : 'APRESENTAÇÃO'}</div><div className="footer-controls"><button type="button" aria-label="Slide anterior" disabled={index===0} onClick={() => go(index-1)}><ArrowLeft size={20}/></button><span>{String(index+1).padStart(2,'0')} / {String(slides.length).padStart(2,'0')}</span><button type="button" aria-label="Próximo slide" disabled={index===slides.length-1} onClick={() => go(index+1)}><ArrowRight size={20}/></button><button type="button" aria-label="Visão geral dos slides" onClick={(e) => { lastFocus.current=e.currentTarget; setOverview(true) }}><Grid2X2 size={20}/></button><button type="button" aria-label={fullscreen ? 'Sair da tela cheia' : 'Entrar em tela cheia'} onClick={() => fullscreen ? document.exitFullscreen() : stageRef.current?.requestFullscreen()}>{fullscreen ? <Minimize2 size={20}/> : <Expand size={20}/>}</button></div></footer>
      <div className="progress-track"><div style={{width:`${(index+1)/slides.length*100}%`}}/></div>
      {overview && <div className="overview" role="dialog" aria-modal="true" aria-label="Visão geral dos slides"><div className="overview-head"><div><small>VISÃO GERAL</small><h2>Escolha um slide</h2><p>{Math.floor(presentSeconds/60)} min de apresentação + 5 min de demonstração</p></div><button ref={overviewClose} type="button" aria-label="Fechar visão geral" onClick={() => { setOverview(false); setTimeout(() => lastFocus.current?.focus(),0) }}><X/></button></div><div className="overview-grid">{slides.map((s,i) => <button type="button" key={s.id} className={i===index ? 'active' : ''} onClick={() => {go(i);setOverview(false);setTimeout(() => lastFocus.current?.focus(),0)}}><small>{String(i+1).padStart(2,'0')} · {s.section}</small><strong>{s.title}</strong><span>{Math.floor(s.seconds/60)}:{String(s.seconds%60).padStart(2,'0')}</span></button>)}</div><p className="overview-help">Setas / PageUp / PageDown para navegar · O visão geral · F tela cheia</p></div>}
    </div></div>
    <div className="mobile-hint"><Play size={16}/> Use a janela horizontal para apresentar</div>
  </div>
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>)
