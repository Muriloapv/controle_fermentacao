# Controle de Fermentação

Sistema full-stack para controle de fermentação de cervejas artesanais. Gerencia estilos, tanques, lotes, parâmetros e histórico de fermentação.

**Stack:** ASP.NET Core 10 · Entity Framework Core · PostgreSQL · React 19 · TypeScript · MUI

### Arquitetura

- **Backend** — ASP.NET Core 10 com EF Core + PostgreSQL. Domínio organizado em entidades (`Cerveja`, `Tanque`, `Lote`, `FermentacaoHistorico`, `CervejaEstilo`, `CervejaParametros`) com soft-delete via coluna `*_exclusao` e global query filters. API RESTful com Swagger para documentação viva.
- **Frontend** — SPA React 19 + TypeScript + MUI. Organizado em `pages/components/services/models`. Comunicação via Axios com a API.
- **Banco de dados** — PostgreSQL com snake_case aplicado pelo EF Core (NamingConventions). Relacionamentos: `Cerveja → Estilo`, `Cerveja → Parâmetros`, `Lote → Cerveja + Tanque`, `Histórico → Lote`.

---

## Pré-requisitos

| Ferramenta | Versão mínima |
|---|---|
| [.NET SDK](https://dotnet.microsoft.com/download) | 10.0.301 |
| [Node.js](https://nodejs.org/) | 20+ |
| [PostgreSQL](https://www.postgresql.org/download/) | 15+ |

Verifique as versões instaladas:

```bash
dotnet --version
node --version
psql --version
```

---

## Clonando o repositório

```bash
git clone https://github.com/Muriloapv/controle_fermentacao.git
cd controle_fermentacao
```

---

## Backend

### 1. Configurar variáveis de ambiente

Crie o arquivo `backend/.env` com base no template:

```bash
cp backend/.env.example backend/.env
```

Edite `backend/.env` com as credenciais do seu PostgreSQL:

```env
DB_HOST=localhost
DB_NAME=arBrain
DB_USERNAME=postgres
DB_PASSWORD=sua_senha
```

> O banco de dados `arBrain` será criado automaticamente pelo EF Core na etapa de migrations.

### 2. Instalar a ferramenta do EF Core (se ainda não tiver)

```bash
dotnet tool install --global dotnet-ef
```

### 3. Compilar o projeto

Os pacotes NuGet são restaurados automaticamente durante a compilação.

```bash
cd backend
dotnet build
```

### 4. Criar as tabelas e seed de dados

As migrations já estão incluídas no repositório. Execute apenas:

```bash
dotnet ef database update
```

Isso cria todas as tabelas e insere os dados iniciais de seed.

### 5. Executar o servidor

```bash
dotnet run
```

| Recurso | URL |
|---|---|
| API | `http://localhost:5298` |
| Swagger (documentação) | `http://localhost:5298/swagger` |

---

## Frontend

Em um terminal separado:

### 1. Instalar dependências

```bash
cd frontend
npm install
```

### 2. Executar o servidor de desenvolvimento

```bash
npm run dev
```

| Recurso | URL |
|---|---|
| Aplicação | `http://localhost:5173` |

> O backend tem CORS configurado para aceitar requisições apenas de `http://localhost:5173`. O frontend deve rodar nessa porta (padrão do Vite).

---

## Executando os dois juntos

Suba os serviços nessa ordem:

```
Terminal 1 — backend:   cd backend  && dotnet run
Terminal 2 — frontend:  cd frontend && npm run dev
```

Acesse `http://localhost:5173` para usar a aplicação.

---

## Premissas adotadas

### Por que soft-delete

O domínio é de **rastreabilidade**. Se um `Tanque` ou `Cerveja` fosse deletado fisicamente, todos os `Lotes` e `FermentacaoHistorico` vinculados perderiam a referência quebrando o histórico de produção. Soft-delete preserva os dados para auditoria e integridade referencial sem precisar de CASCADE ou nullable FKs artificiais.

`FermentacaoHistorico` é a exceção intencional: ele **não tem soft-delete** porque a regra de negócio é a oposta, uma leitura de pH, temperatura ou extrato registrada nunca pode ser apagada nem editada. O comentário no controller reflete isso: *"O histórico não pode ser alterado nem deletado para garantir a confiabilidade das informações."*

### Decisões de modelagem

- **Parâmetros separados da cerveja** : `CervejaParametro` é uma entidade própria (não campos em `Cerveja`) porque a receita pode mudar por lote. A query `ultimos-registros` usa `cp.cerveja_id = lot.cerveja_id` para buscar sempre o parâmetro vigente.
- **Lote como ponto central** : `Lote` conecta `Cerveja + Tanque + FermentacaoHistorico`. Lotes ativos são identificados por `lote_finalizacao IS NULL AND lote_exclusao IS NULL`.
- **`CervejaExclusao` com `[JsonIgnore]`** : o campo de exclusão não é serializado na resposta da API, evitando expor dados internos ao frontend.

### Padrão de código

- **Prefixo do nome da entidade em todos os campos** : ex: `CervejaId`, `CervejaNome`, `CervejaExclusao`. Evita ambiguidade em joins e facilita leitura do SQL gerado pelo EF Core.
- **`DateTime? LoteFinalizacao`** : nullable indica estado: `null` = em andamento, preenchido = finalizado. Sem enum de status.
- **`[Precision]` em todos os decimais** : pH com `(5,3)`, temperatura/extrato com `(5,2)`. Precisão definida pelo domínio.
- **`[MaxLength]` em strings** : observações com 2000 chars, nomes com 200. Evita colunas `TEXT` ilimitadas.
- **Controllers co-localizados com o modelo** : cada feature tem seu controller dentro da própria pasta (`Models/Cerveja/CervejasController.cs`).
- **Async/await em todas as operações de banco** : `ToListAsync`, `FindAsync`, `SaveChangesAsync` de forma consistente.

---

## O que faria diferente com mais tempo

**1. Feedback visual de erros ao usuário**
Os `catch` das páginas apenas fazem `console.error`. Adicionaria um componente de `Snackbar/Toast` (MUI já tem) para exibir mensagens de falha, especialmente importante em operações de salvar e deletar.

**2. Paginação server-side**
Todos os controllers retornam `.ToListAsync()` completo. Com lotes crescendo ao longo do tempo, `FermentacaoHistorico` pode ficar pesado. Adicionaria `Skip/Take` no backend e paginação no `DataGrid` do MUI.

**3. Testes automatizados**
Sem nenhuma cobertura hoje. Priorizaria testes de integração no backend (xUnit + banco real em container) para os controllers mais críticos, especialmente a query SQL `ultimos-registros` que tem lógica de negócio embutida.

**4. Docker Compose**
Subir PostgreSQL + backend + frontend com um único `docker compose up`. Eliminaria a dependência de ter o PostgreSQL instalado localmente e tornaria o onboarding de novos desenvolvedores trivial.

**5. Middleware global de erros no backend**
Hoje cada controller tem seu próprio try/catch com formatos de resposta inconsistentes. Um `ExceptionHandlerMiddleware` centralizaria isso e garantiria um formato de erro padronizado para toda a API.

**6. Autenticação básica**
Os endpoints estão todos públicos. Mesmo um JWT simples com ASP.NET Identity já resolveria o problema de acesso não autorizado, especialmente porque o histórico é imutável por regra de negócio, mas hoje qualquer pessoa pode inserir registros.

**7. Melhor aproveitamento dos dados coletados**
O sistema registra temperatura, pH e extrato a cada coleta, mas exibe essas informações apenas em tabela. Com mais tempo, adicionaria tratamento e agregação desses dados para exibição mais detalhada, além de gráficos de evolução por lote, permitindo visualizar tendências ao longo do processo de fermentação e identificar desvios com mais facilidade.

---

## Uso de ferramentas de IA

**Ferramentas utilizadas**
ChatGPT( OpenAI ) e Claude (Anthropic) como assistente durante o desenvolvimento.

**Em quais partes a IA ajudou**
- Geração de boilerplate repetitivo: models, DTOs, controllers CRUD e services Axios seguindo o mesmo padrão entre entidades
- Estrutura inicial dos componentes React com MUI (DataGrid, Modal, formulários)
- Configuração do EF Core: connection string, `UseSnakeCaseNamingConvention`, registro do DbContext
- Sugestão da estrutura de pastas co-localizando controllers com seus modelos
- Escrita das migrations e seed data com SQL compatível com PostgreSQL

**O que precisou corrigir**
- As relações entre entidades foram geradas com nomes de propriedades de navegação inconsistentes e FKs faltando em alguns models, exigindo revisão manual
- O soft-delete foi gerado inicialmente sem os `HasQueryFilter` globais no `AppDbContext`, aplicando a exclusão lógica apenas no controller sem filtrar nas consultas automáticas
- A regra de imutabilidade do `FermentacaoHistorico` não foi inferida pela IA, sendo uma decisão tomada manualmente ao perceber que registros de medição não devem ser alterados
- A query SQL de `ultimos-registros` com a lógica de classificação `abaixo / ok / acima` foi escrita manualmente, pois envolvia conhecimento do domínio que a IA não tinha contexto para inferir corretamente
