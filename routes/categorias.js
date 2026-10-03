const express = require('express');
const router = express.Router();

const { Categoria, Produto } = require('../models');

// Listar categorias
router.get('/', async (req, res) => {
  const categorias = await Categoria.findAll({
    include: 'Produtos'
  });

  res.render('categorias/index', {
    categorias
  });
});

// Formulário de nova categoria
router.get('/nova', (req, res) => {
  res.render('categorias/nova');
});

// Cadastrar nova categoria
router.post('/', async (req, res) => {
  if (req.body.nome && req.body.nome.trim() !== '') {
    await Categoria.create({
      nome: req.body.nome.trim()
    });
  }

  res.redirect('/categorias');
});

// Excluir categoria
router.post('/:id/deletar', async (req, res) => {
  await Categoria.destroy({
    where: {
      id: req.params.id
    }
  });

  res.redirect('/categorias');
});

module.exports = router;
