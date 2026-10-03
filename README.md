# Cadastro de Produtos — MVC

Aplicação web desenvolvida com **Node.js**, **Express**, **EJS**, **Sequelize** e **SQLite**, utilizando o padrão arquitetural **MVC** (Model-View-Controller) para cadastro e controle de produtos.

---

## Integrante
- **Nome:** (Preencha seu Nome Completo)
- **RM:** (Preencha seu RM)

---

## 🛠️ Tecnologias Utilizadas
- **Node.js:** Ambiente de execução JavaScript no servidor.
- **Express:** Framework web para gerenciamento de rotas e requisições HTTP.
- **EJS:** Sistema de templates para renderização dinâmica de páginas HTML.
- **Sequelize:** ORM para comunicação com o banco de dados via objetos JavaScript.
- **SQLite:** Banco de dados relacional armazenado no arquivo `database.sqlite`.

---

## 📐 Estrutura MVC

- **Model (`models/index.js`):** Representa o modelo `Produto` e a conexão com o banco de dados SQLite.
- **View (`views/produtos/`):** Páginas HTML dinâmicas com EJS (`index.ejs`, `novo.ejs`, `editar.ejs`).
- **Controller / Rotas (`routes/produtos.js`):** Gerencia as rotas e a lógica de requisição/resposta para operações de CRUD.

---

## 🚀 Como Executar o Projeto

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Inicie o servidor:**
   ```bash
   npm start
   ```

3. **Acesse no navegador:**
   ```
   http://localhost:3000/produtos
   ```

---

## 📋 Funcionalidades Implementadas (Base)
- Listagem de produtos cadastrados (`GET /produtos`)
- Cadastro de novos produtos (`GET /produtos/novo` e `POST /produtos`)
- Edição de produtos existentes (`GET /produtos/:id/editar` e `POST /produtos/:id`)
- Exclusão de produtos (`POST /produtos/:id/deletar`)
- Persistência automática no banco `database.sqlite` via Sequelize.
