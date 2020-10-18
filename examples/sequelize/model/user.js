const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../connection');

const User = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    bookId: DataTypes.STRING,
  },
  {
    freezeTableName: 'user',
    timestamps: false,
    underscored: true,
  }
);

module.exports = User;
