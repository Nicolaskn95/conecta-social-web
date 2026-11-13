# Suíte de Testes Automatizados - Conecta Social (Produção)

Este projeto contém os testes automatizados de ponta a ponta (E2E), segurança, persistência e performance desenvolvidos em **Robot Framework** com **SeleniumLibrary**, executados diretamente contra o ambiente de produção da aplicação **Conecta Social**:
👉 [https://conecta-social-fatec.vercel.app/](https://conecta-social-fatec.vercel.app/)

---

## 📁 Estrutura do Projeto

```
testes_automatizados/
├── requirements.txt                  # Dependências Python necessárias
├── run_tests.bat                     # Script de execução rápida para CMD (Windows)
├── run_tests.ps1                     # Script de execução avançada para PowerShell
├── README.md                         # Documentação completa
├── resources/
│   ├── variables.resource            # URLs, credenciais, timeouts e configurações globais
│   ├── common_keywords.resource      # Abertura/fechamento de navegadores, login, logout e SLA
│   └── pages/                        # Page Objects com seletores e ações de cada tela
│       ├── landing_page.resource     # Landing Page, cabeçalho institucional e rodapé
│       ├── login_page.resource       # Tela de Login e alternância de visibilidade
│       ├── dashboard_page.resource   # Dashboard e Menu Lateral
│       ├── events_page.resource      # Cadastro com Instagram embed, listagem e exclusão
│       ├── families_page.resource    # Listagem, CEP auto-complete e cadastro de Famílias
│       ├── volunteers_page.resource  # Listagem e busca de Voluntários
│       └── donations_page.resource   # Listagem e estoque de Doações
├── tests/
│   ├── 01_area_nao_logada.robot      # Testes da área pública (Home, Sobre, Contato, 404, Rotas)
│   ├── 02_autenticacao.robot         # Testes de autenticação, validações e logout
│   ├── 03_features_principais.robot  # Testes dos módulos administrativos e listagens
│   ├── 04_persistencia_dados.robot   # Fluxo crítico: cadastro de evento com Instagram, persistência e exibição na LP
│   └── 05_performance.robot          # Benchmarks de tempo de carregamento e SLA
└── results/                          # Relatórios interativos gerados (report.html, log.html)
```

---

## ⚙️ Pré-requisitos e Instalação

1. **Python 3.10+** instalado no sistema.
2. **Google Chrome** instalado.
3. Instalar as dependências do projeto:
   ```bash
   pip install -r requirements.txt
   ```

---

## 🚀 Como Executar os Testes

### 1. Execução Rápida via Scripts Facilitadores

- **Executar todos os testes:**
  - No CMD: `run_tests.bat`
  - No PowerShell: `.\run_tests.ps1`

- **Executar testes específicos por Tag:**
  - Apenas testes da área pública:
    ```bash
    run_tests.bat publico
    ```
  - Apenas testes de autenticação:
    ```bash
    run_tests.bat auth
    ```
  - Apenas o fluxo crítico de persistência de eventos e famílias:
    ```bash
    run_tests.bat persistencia
    ```
  - Apenas testes de performance e SLA:
    ```bash
    run_tests.bat performance
    ```
  - Smoke tests rápidos:
    ```bash
    run_tests.bat smoke
    ```

### 2. Execução Direta via Linha de Comando (Robot CLI)

```bash
# Rodar toda a suíte gerando relatórios na pasta results/
python -m robot --outputdir results/ tests/

# Rodar passando credenciais personalizadas de produção
python -m robot --outputdir results/ -v ADMIN_EMAIL:seu_email@conecta.com -v ADMIN_PASSWORD:sua_senha tests/

# Rodar exibindo o navegador (modo headed visual)
python -m robot --outputdir results/ -v BROWSER:chrome tests/
```

---

## 📊 Relatórios de Execução

Ao final de cada execução, o Robot Framework gera automaticamente relatórios ricos em HTML na pasta `results/`:
- **`results/report.html`**: Visão executiva com métricas de aprovação, tempos e gráficos de status.
- **`results/log.html`**: Log detalhado com cada ação, requisição, tempo de resposta e screenshots automáticos capturados em caso de qualquer falha.
- **`results/output.xml`**: Dados brutos estruturados para integração em esteiras de CI/CD (GitHub Actions).

---

## 🔒 Boas Práticas e Segurança em Produção

- **Cleanup Automático**: O teste do módulo de Eventos cria dados com identificador dinâmico único baseado em timestamp (`EventoRobot_YYYYMMDDHHMMSS`) e executa o cleanup ao final (`Excluir Evento Da Tabela`), mantendo o ambiente de produção limpo.
- **Parametrização Segura**: Nenhuma senha precisa ser hardcoded em arquivos versionados; variáveis podem ser injetadas via argumentos de linha de comando ou variáveis de ambiente de esteiras CI/CD.
