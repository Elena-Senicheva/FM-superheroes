'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate (models) {
      Image.belongsTo(models.Superhero, {
        foreignKey: 'superheroId'
      });
    }
  };
  Image.init({
    superheroID: {
      field: "hero_id",
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'superhero',
        key: 'id',
      },
    },
    imagePath: {
      field: "image_path",
      allowNull: false,
      type: DataTypes.TEXT
    },
  }, {
    sequelize,
    modelName: 'Image',
    tableName: 'image',
    underscored: true,
  });
  return Image;
};