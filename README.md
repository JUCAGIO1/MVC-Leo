# Cadastro de Produtos — MVC

Aplicação web desenvolvida com **Node.js**, **Express**, **EJS**, **Sequelize** e **SQLite**, aplicando o padrão arquitetural **MVC** (Model-View-Controller) para controle de produtos e categorias.

---

## 👤 Integrante
- **Nome:** Giovanni Corrêa Amadio
- **RM:** (Preencha seu RM)

---

## 🛠️ Tecnologias Utilizadas
- **Node.js:** Ambiente de execução JavaScript no servidor.
- **Express:** Framework web para roteamento e gerenciamento de requisições HTTP.
- **EJS:** View engine para renderização dinâmica das páginas HTML.
- **Sequelize:** ORM para manipulação e persistência dos dados relacionais.
- **SQLite:** Banco de dados relacional leve armazenado em arquivo (`database.sqlite`).

---

## 📐 Estrutura MVC do Projeto

- **Model (`models/index.js`):** Define as entidades `Produto` e `Categoria`, além dos relacionamentos 1:N no Sequelize (`hasMany` e `belongsTo`).
- **View (`views/`):** Templates EJS organizados em subpastas:
  - `views/produtos/`: listagem geral, tela de novo produto, tela de edição e listagem filtrada por categoria.
  - `views/categorias/`: listagem e tela de cadastro de categorias.
- **Controller / Rotas (`routes/`):**
  - `routes/produtos.js`: CRUD de produtos e rota de consulta por categoria (`/produtos/categoria/:id`).
  - `routes/categorias.js`: rotas para gerenciamento e cadastro de categorias (`/categorias`).

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
   - **Produtos:** [http://localhost:3000/produtos](http://localhost:3000/produtos)
   - **Categorias:** [http://localhost:3000/categorias](http://localhost:3000/categorias)

---

## 📋 Funcionalidades Implementadas

- **Produtos:**
  - Cadastro de produtos com nome, preço, quantidade e categoria associada (`POST /produtos`).
  - Listagem de produtos exibindo o nome de sua respectiva categoria (`GET /produtos`).
  - Edição de produtos existentes com atualização de categoria (`GET /produtos/:id/editar` e `POST /produtos/:id`).
  - Exclusão de produtos (`POST /produtos/:id/deletar`).
  - Filtro dropdown para alternar visualização por categoria na tela inicial.
- **Categorias (Desafio 1):**
  - Cadastro de novas categorias (`GET /categorias/nova` e `POST /categorias`).
  - Listagem de categorias com contador de produtos vinculados (`GET /categorias`).
  - Exclusão de categorias (`POST /categorias/:id/deletar`).
- **Consulta por Categoria (Desafio 2):**
  - Rota dedicada (`GET /produtos/categoria/:id`) que busca e exibe apenas os produtos pertencentes à categoria selecionada.

---

## 🏆 Resolução dos Desafios

### Desafio 1 — Categorias e Relacionamento com Produtos
- **Model Categoria:** Criado o modelo `Categoria` no arquivo `models/index.js` contendo o campo `nome`.
- **Associação no Sequelize:** Definida a relação de 1 para N (uma categoria possui muitos produtos e um produto pertence a uma categoria):
  ```javascript
  Categoria.hasMany(Produto, { foreignKey: 'CategoriaId', as: 'Produtos' });
  Produto.belongsTo(Categoria, { foreignKey: 'CategoriaId', as: 'Categoria' });
  ```
- **CRUD e Rotas de Categorias:** Criado o arquivo `routes/categorias.js` e as views correspondentes em `views/categorias/`, permitindo cadastrar e listar categorias.
- **Associação no Formulário e Listagem:** No formulário de produtos (`novo.ejs` e `editar.ejs`), foi adicionado um campo `<select name="CategoriaId">` populado dinamicamente com as categorias cadastradas. Na listagem de produtos (`index.ejs`), a consulta utiliza `include: 'Categoria'`, apresentando a categoria vinculada a cada produto salvo no banco de dados SQLite.

### Desafio 2 — Listando Produtos por Categoria
- **Definição da Rota:** Criada a rota `GET /produtos/categoria/:id` no arquivo `routes/produtos.js`.
- **Consulta no Banco:** A rota recupera a categoria pelo ID (`Categoria.findByPk`) e busca os produtos correspondentes utilizando uma cláusula de filtro `where`:
  ```javascript
  const produtos = await Produto.findAll({
    where: { CategoriaId: req.params.id },
    include: 'Categoria'
  });
  ```
- **Interface e Navegação:** Criada a view `views/produtos/categoria.ejs` com tabela dedicada mostrando os produtos daquela categoria específica, além de um seletor rápido para alternar entre categorias e links diretos clicáveis na listagem de categorias e na tabela de produtos.
