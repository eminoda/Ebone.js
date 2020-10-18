const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../connection');

const Book = sequelize.define(
  'book',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    authorId: DataTypes.STRING,
  },
  {
    freezeTableName: 'book',
    timestamps: false,
    underscored: true,
  }
);

module.exports = Book;
