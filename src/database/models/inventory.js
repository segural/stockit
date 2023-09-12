'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class inventory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  inventory.init({
    type: DataTypes.STRING,
    name: DataTypes.STRING,
    sector: {type:DataTypes.STRING, allowNull: true},
    branch: {type:DataTypes.STRING, allowNull: true},
    properties: DataTypes.STRING,
    status: DataTypes.INTEGER,
    user: DataTypes.STRING,
    servertype: {type:DataTypes.STRING, allowNull: true},
    serverenv: {type:DataTypes.STRING, allowNull: true},
    ip: {type:DataTypes.STRING, allowNull: true},
    serialnumber: {type:DataTypes.STRING, allowNull: true},
  }, {
    sequelize,
    modelName: 'inventory',
  });
  return inventory;
};