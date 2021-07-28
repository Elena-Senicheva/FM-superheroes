'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Image.init({
    heroID: {
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