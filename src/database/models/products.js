'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      products.belongsTo(models.categories, {
        as: "category",
        foreignKey: "idCategory",
        timestamps: false,
      });
      products.hasMany(models.stock, {
        as: "stock",
        foreignKey: "idProduct",
      });
    }
  }
  products.init({
    description: DataTypes.STRING,
    brand: DataTypes.STRING,
    idCategory: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'products',
  });
  return products;
};