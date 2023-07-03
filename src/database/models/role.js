'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      role.belongsToMany(models.user, {
        as: 'users',
        through: 'user_role',
        foreignKey:'roleId',
        otherKey:'userId',
        timestamps: false,
      }),
      role.belongsToMany(models.permission, {
        as: 'permissions',
        through: 'permission_role',
        foreignKey:'roleId',
        otherKey:'permissionId',
        timestamps: false,
      })
    }
  }
  role.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'role',
  });
  return role;
};