'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      permission.belongsToMany(models.role, {
        as: 'roles',
        through: 'permission_role',
        foreignKey:'permissionId',
        otherKey:'roleId',
        timestamps: false,
      })
    }
  }
  permission.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'permission',
  });
  return permission;
};