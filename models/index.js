const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false
});

// Model Categoria (Desafio 1)
const Categoria = sequelize.define('Categoria', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'Categorias'
});

// Model Produto
const Produto = sequelize.define('Produto', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },

  preco: {
    type: DataTypes.FLOAT,
    allowNull: false
  },

  quantidade: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'Produtos'
});

// Relacionamentos 1:N entre Categoria e Produto (Desafio 1)
Categoria.hasMany(Produto, { foreignKey: 'CategoriaId', as: 'Produtos' });
Produto.belongsTo(Categoria, { foreignKey: 'CategoriaId', as: 'Categoria' });

module.exports = {
  sequelize,
  Produto,
  Categoria
};
