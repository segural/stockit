'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ocs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ocs.hasMany(models.movements, {
        as: "movement",
        foreignKey: "idOC",
      });
    }
  }
  ocs.init({
    number: DataTypes.BIGINT,
    recibed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'ocs',
  });
  return ocs;
};