'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Superpower extends Model {
    static associate (models) {
      // define association here
      Superpower.belongsToMany(models.Superhero, { 
        through: 'superheroes_to_superpowers',
        foreignKey: 'superpowerId',
     });
    }}
  Superpower.init({
    allowNull: false,
    superpower: DataTypes.STRING,
    validate: {
      notNull: true,
      notEmpty: true,
    },
  }, {
    sequelize,
    modelName: 'Superpower',
    tableName: 'superpower',
    underscored: true,
  });
  return Superpower;
};