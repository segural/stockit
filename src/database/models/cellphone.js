'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cellphone extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  cellphone.init({
    phonenumber: DataTypes.BIGINT,
    brand: DataTypes.STRING,
    model: DataTypes.STRING,
    sector: DataTypes.STRING,
    imei: DataTypes.STRING,
    user: DataTypes.STRING,
    deliverydate: DataTypes.DATE,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'cellphone',
  });
  return cellphone;
};