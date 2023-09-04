'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class movements extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      movements.belongsTo(models.products, {
        as: "product",
        foreignKey: "idProduct",
        timestamps: false,
      });
      movements.belongsTo(models.ocs, {
        as: "oc",
        foreignKey: "idOC",
        timestamps: false,
      });
    }
  }
  movements.init({
    type: DataTypes.BOOLEAN,
    provider: {type:DataTypes.STRING, allowNull: true},
    branch: {type:DataTypes.STRING, allowNull: true},
    idProduct: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    companyname: {type:DataTypes.STRING, allowNull: true},
    notes: {type:DataTypes.STRING, allowNull: true},
    idOC: {type:DataTypes.INTEGER, allowNull: true},
    user: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'movements',
  });
  return movements;
};