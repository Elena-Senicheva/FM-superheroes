'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Superhero extends Model {
    static associate (models) {
      Superhero.hasMany(models.Image, {
        foreignKey: 'superheroId',
      });
       Superhero.belongsToMany(models.Superpower, {
        through: 'superheroes_to_superpowers',
        foreignKey: 'superheroId',
       })
  }};
  Superhero.init({
       nickname: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: true,
          notEmpty: true,
        },
        
      },
      realName: {
        field: "real_name",
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      originDescription: {
        field: "origin_descriptioe",
        type: DataTypes.TEXT
      },
      catchPhrase: {
        field: "catch_phrase",
        type: DataTypes.TEXT
      },
  }, {
    sequelize,
    modelName: 'Superhero',
    tableName: 'superhero',
    underscored: true,
  });
  return Superhero;
};