const express = require('express');
const router = express.Router();

const { Produto, Categoria } = require('../models');

// Listagem de todos os produtos (com a categoria associada - Desafio 1)
router.get('/', async (req, res) => {
  const produtos = await Produto.findAll({
    include: 'Categoria'
  });
  const categorias = await Categoria.findAll();

  res.render('produtos/index', {
    produtos,
    categorias
  });
});

// Formulário de novo produto (carrega as categorias para o <select> - Desafio 1)
router.get('/novo', async (req, res) => {
  const categorias = await Categoria.findAll();

  res.render('produtos/novo', {
    categorias
  });
});

// Criar produto (salva Produto associado à CategoriaId - Desafio 1)
router.post('/', async (req, res) => {
  const { nome, preco, quantidade, CategoriaId } = req.body;

  await Produto.create({
    nome,
    preco,
    quantidade,
    CategoriaId: CategoriaId && CategoriaId !== '' ? CategoriaId : null
  });

  res.redirect('/produtos');
});

// Desafio 2 — Consulta de produtos por categoria
// Rota: GET /produtos/categoria/:id
router.get('/categoria/:id', async (req, res) => {
  const categoria = await Categoria.findByPk(req.params.id);

  if (!categoria) {
    return res.redirect('/produtos');
  }

  const produtos = await Produto.findAll({
    where: {
      CategoriaId: req.params.id
    },
    include: 'Categoria'
  });

  const categorias = await Categoria.findAll();

  res.render('produtos/categoria', {
    produtos,
    categoria,
    categorias
  });
});

// Formulário de edição de produto (carrega produto e categorias - Desafio 1)
router.get('/:id/editar', async (req, res) => {
  const produto = await Produto.findByPk(req.params.id);
  const categorias = await Categoria.findAll();

  res.render('produtos/editar', {
    produto,
    categorias
  });
});

// Atualizar produto (com CategoriaId - Desafio 1)
router.post('/:id', async (req, res) => {
  const { nome, preco, quantidade, CategoriaId } = req.body;

  await Produto.update({
    nome,
    preco,
    quantidade,
    CategoriaId: CategoriaId && CategoriaId !== '' ? CategoriaId : null
  }, {
    where: {
      id: req.params.id
    }
  });

  res.redirect('/produtos');
});

// Excluir produto
router.post('/:id/deletar', async (req, res) => {
  await Produto.destroy({
    where: {
      id: req.params.id
    }
  });

  res.redirect('/produtos');
});

module.exports = router;
