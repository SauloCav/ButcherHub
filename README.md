# ButcherHub

### Bem vindo ao ButcherHub!
#### Seu Sistema completo para gerenciamento de carnes, compradores e pedidos!

## 📊 Visão Geral

O **ButcherHub** é uma aplicação Web desenvolvida para gerenciar:

* Cadastro e listagem de **carnes**
* Cadastro e listagem de **compradores**
* Criação, edição e exclusão de **pedidos**

Inclui relacionamentos entre as entidades, conversão de moedas com a **AwesomeAPI**, e um frontend com formulários controlados, mensagens de feedback, modais de confirmação, e muito mais.

---

## 🚀 Tecnologias Utilizadas

### Backend (.NET 8)

* ASP.NET Core
* Entity Framework Core
* SQL Server
* Arquitetura em camadas (Controller, Service, Data, Model)

### Frontend (React)

* React 18+
* React Router DOM
* Axios
* React Hook Form

---

## 📂 Estrutura do Projeto

```
ButcherHub/
├── backend/
│   ├── ButcherHub.Api (Controllers)
│   ├── ButcherHub.Application (Regras de negócio)
│   ├── ButcherHub.Infrastructure (Contexto EF, repositórios e migrations)
│   ├── ButcherHub.Shared (Utils e arquivos compartilhados)
│   └── ButcherHub.Domain (Entidades do domínio)
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── interfaces/
│       └── utils/
```

---

## 🔧 Como Rodar o Projeto

### 1. Requisitos

* [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download)
* [Node.js (v18+)](https://nodejs.org)
* [SQL Server](https://www.microsoft.com/pt-br/sql-server)
* [Visual Studio e VS Code](https://code.visualstudio.com/)

### 2. Clonar o repositório

```bash
git clone https://github.com/SauloCav/ButcherHub.git
cd ButcherHub
```

---

### 3. Configurar o Banco de Dados

1. Crie um banco no SQL Server.
2. Utilize o script SQL em `backend/ButcherHub.Data/Migrations/` para criar as tabelas e popular com dados iniciais.
3. No projeto `ButcherHub.Api`, edite o `appsettings.json` com sua connection string:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=ButcherHubDb;User Id=seu_usuario;Password=sua_senha;TrustServerCertificate=True"
}
```

---

### 4. Rodar o Backend

```bash
cd backend/ButcherHub.Api
dotnet restore
dotnet build
dotnet run
```

---

### 5. Rodar o Frontend

### Usando npm

```bash
cd frontend
npm install
npm start
```

### Usando yarn

```bash
cd frontend
yarn
yarn dev
```


## 📅 Funcionalidades

### 🥩 Carnes

* Cadastro, listagem, edição e exclusão.
* Origem da carne: Bovina, Suína, Aves, Peixes.
* Exclusão bloqueada se houver pedidos associados.

### 💼 Compradores

* Cadastro com nome, documento (CPF/CNPJ), cidade e estado.
* Exclusão bloqueada se houver pedidos associados.

### 📆 Pedidos

* Cadastro com data, comprador, carnes, preço e moeda.
* Conversão de moedas via [AwesomeAPI](https://docs.awesomeapi.com.br/api-de-moedas).
* Edição, exclusão e listagem com valor total em Real.

---

## 🔗 Links Importantes

* [AwesomeAPI - Conversão de Moedas](https://docs.awesomeapi.com.br/api-de-moedas)
* [Documentação do .NET 8](https://learn.microsoft.com/pt-br/dotnet/core/whats-new/dotnet-8)
* [Documentação do React](https://react.dev/)
* [IBGE - Lista de Estados](https://servicodados.ibge.gov.br/api/v1/localidades/estados)
* [IBGE - Lista de Municípios por Estado](https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios)

---

## ✉️ Licença

Este projeto está sob a licença MIT. Consulte o arquivo `LICENSE` para mais detalhes.
