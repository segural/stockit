'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class due extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  due.init({
    branch: DataTypes.STRING,
    who: DataTypes.STRING,
    duedate: DataTypes.DATE,
    description: DataTypes.STRING,
    status: DataTypes.TINYINT,
    user: DataTypes.STRING,
    datenumber: DataTypes.BIGINT,
  }, {
    sequelize,
    modelName: 'due',
  });
  return due;
};