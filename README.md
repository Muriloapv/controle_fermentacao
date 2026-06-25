# Controle de Fermentação

dotNet -> 10.0.301

# Executando o projeto

## Clonar o repositório

```bash
git clone https://github.com/Muriloapv/controle_fermentacao.git
```

## Entrar na pasta do backend

```bash
cd backend
```

## Configurar variáveis de ambiente

Crie um arquivo `.env` na pasta `backend/` com base no `.env.example`:

```env
DB_HOST=localhost
DB_NAME=postgres
DB_USERNAME=postgres
DB_PASSWORD=sua_senha
```

## Compilar o projeto

Os pacotes NuGet serão restaurados automaticamente durante a compilação.

```bash
dotnet build
```

## Aplicar migrations (criar tabelas no banco)

```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

## Executar o projeto

```bash
dotnet run
```

A documentação da API estará disponível em `https://localhost:{porta}/swagger`.
