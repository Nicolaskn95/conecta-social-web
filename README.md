# 🌱 Conecta Social

> **Conectando tecnologia com projetos sociais**

O Conecta Social é uma plataforma web desenvolvida para gerenciar e conectar projetos sociais, especificamente o **Projeto Conecta Social**. A aplicação oferece uma interface moderna e intuitiva para gerenciar voluntários, famílias beneficiárias, eventos e doações, além de fornecer dashboards analíticos para acompanhamento do impacto social.

## 📋 Índice

-  [Sobre o Projeto](#-sobre-o-projeto)
-  [Funcionalidades](#-funcionalidades)
-  [Tecnologias](#-tecnologias)
-  [Estrutura do Projeto](#-estrutura-do-projeto)
-  [Instalação](#-instalação)
-  [Executando o Projeto](#-executando-o-projeto)
-  [Docker](#-docker)
-  [Contribuição](#-contribuição)
-  [Licença](#-licença)

## 🎯 Sobre o Projeto

O **Projeto Sementes do Amanhã** nasceu em 2020 com o objetivo de criar um espaço seguro e acolhedor onde crianças em situação de vulnerabilidade pudessem receber apoio educacional, alimentação e, principalmente, carinho e esperança para o futuro.

O Conecta Social é a plataforma tecnológica que facilita a gestão deste projeto, permitindo:

-  **Gestão de Voluntários**: Cadastro e controle de voluntários
-  **Gestão de Famílias**: Acompanhamento de famílias beneficiárias
-  **Gestão de Eventos**: Organização e controle de eventos sociais
-  **Gestão de Doações**: Controle de doações recebidas
-  **Dashboards Analíticos**: Visualização de métricas e indicadores de impacto

## ✨ Funcionalidades

### 🏠 Landing Page

-  **Carousel interativo** com informações do projeto
-  **Seção "Nosso Trabalho"** explicando a missão
-  **Calendário de eventos** com eventos futuros
-  **Seção "Como Ajudar"** com formas de contribuição
-  **Navegação responsiva** e moderna

### 📊 Dashboard de Gerenciamento

-  **Visão geral** com métricas principais
-  **Gráficos interativos** de doações e atividades
-  **Distribuição de renda familiar** em gráficos
-  **Atividade mensal** com visualizações temporais

### 👥 Gestão de Voluntários

-  Cadastro completo de voluntários
-  Controle de informações pessoais e de contato
-  Gerenciamento de endereços
-  Histórico de participação em eventos

### 👨‍👩‍👧‍👦 Gestão de Famílias

-  Cadastro de famílias beneficiárias
-  Controle de status (Ativo/Cancelado)
-  Informações de endereço e contato
-  Acompanhamento temporal

### 🎉 Gestão de Eventos

-  Criação e edição de eventos
-  Informações de localização e data
-  Controle de participantes
-  Integração com redes sociais (Instagram)

### 🎁 Gestão de Doações

-  Cadastro de doações por categoria
-  Controle de quantidades (inicial e atual)
-  Informações do doador
-  Categorização por tipo e características

## 🛠 Tecnologias

### Frontend

-  **Next.js 14** - Framework React com App Router
-  **React 18** - Biblioteca para interfaces de usuário
-  **TypeScript** - Tipagem estática
-  **Tailwind CSS** - Framework CSS utilitário
-  **Chart.js** - Biblioteca para gráficos
-  **React Hook Form** - Gerenciamento de formulários
-  **Zod** - Validação de schemas
-  **Lottie React** - Animações

### Ferramentas de Desenvolvimento

-  **ESLint** - Linting de código
-  **PostCSS** - Processamento de CSS
-  **Autoprefixer** - Prefixos CSS automáticos

### Deploy e Containerização

-  **Docker** - Containerização
-  **Docker Compose** - Orquestração de containers

## 📁 Estrutura do Projeto

```
src/
├── app/                          # App Router do Next.js
│   ├── (pages)/                  # Páginas públicas
│   │   ├── (manager)/            # Área administrativa
│   │   │   └── dashboard/        # Dashboard e CRUDs
│   │   ├── about/                # Página sobre
│   │   ├── contactUs/            # Página de contato
│   │   └── login/                # Página de login
│   └── globals.css               # Estilos globais
├── components/                   # Componentes reutilizáveis
│   ├── Dashboard/                # Componentes de gráficos
│   ├── LandingPage/              # Componentes da página inicial
│   ├── Panel/                    # Componentes de painel
│   ├── shared/                   # Componentes compartilhados
│   └── template/                 # Templates de layout
├── core/                         # Lógica de negócio
│   ├── donation/                 # Modelos e validações de doações
│   ├── event/                    # Modelos e validações de eventos
│   ├── family/                   # Modelos e validações de famílias
│   └── volunteer/                # Modelos e validações de voluntários
├── data/                         # Gerenciamento de dados
│   ├── context/                  # Contextos React
│   └── hooks/                    # Hooks customizados
└── utils/                        # Utilitários
    ├── format.ts                 # Funções de formatação
    └── masks.ts                  # Máscaras de input
```

## 🚀 Instalação

### Pré-requisitos

-  Node.js 18+
-  npm, yarn ou pnpm
-  Git

### Passos para instalação

1. **Clone o repositório**

```bash
git clone <url-do-repositorio>
cd conecta-social-web
```

2. **Instale as dependências**

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

## 🏃‍♂️ Executando o Projeto

### Desenvolvimento

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

### Build de Produção

```bash
npm run build
npm run start
# ou
yarn build
yarn start
```

### Linting

```bash
npm run lint
# ou
yarn lint
```

## 🐳 Docker

### Executando com Docker Compose

```bash
docker-compose up --build
```

### Build da imagem Docker

```bash
docker build -t conecta-social-web .
```

### Executando container

```bash
docker run -p 3000:3000 conecta-social-web
```

## 📊 Scripts Disponíveis

| Script  | Descrição                            |
| ------- | ------------------------------------ |
| `dev`   | Inicia o servidor de desenvolvimento |
| `build` | Cria build de produção               |
| `start` | Inicia o servidor de produção        |
| `lint`  | Executa o linter ESLint              |

## 🎨 Design System

O projeto utiliza um design system consistente com:

-  **Cores primárias**: Azul (#3A8DBA) e gradientes
-  **Tipografia**: Fontes do sistema com hierarquia clara
-  **Componentes**: Reutilizáveis e responsivos
-  **Animações**: Lottie para micro-interações

## 📱 Responsividade

A aplicação é totalmente responsiva, funcionando em:

-  📱 Dispositivos móveis (320px+)
-  📱 Tablets (768px+)
-  💻 Desktops (1024px+)
-  🖥 Telas grandes (1440px+)

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Adicione suas variáveis de ambiente aqui
NEXT_PUBLIC_API_URL=your_api_url
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código

-  Use TypeScript para tipagem
-  Siga as convenções do ESLint configurado
-  Escreva componentes funcionais com hooks
-  Use Tailwind CSS para estilização
-  Documente componentes complexos

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato

**Projeto Sementes do Amanhã**

-  Website: [conecta-social.com](https://conecta-social.com)
-  Email: contato@sementesdoamanha.org

---

<div align="center">
  <p>Feito com ❤️ para transformar vidas através da solidariedade</p>
  <p>🌱 <strong>Sementes do Amanhã</strong> - Conectando tecnologia com projetos sociais</p>
</div>
