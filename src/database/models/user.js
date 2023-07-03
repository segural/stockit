"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.belongsToMany(models.role, {
        as: "roles",
        through: "user_role",
        foreignKey: "userId",
        otherKey: "roleId",
        timestamps: false,
      });
      // Users tiene dos asociaciones con los Logs
      // Una para registrar los logs de las acciones que se ejercen sobre los usuarios (ediciones, cambio de roles, etc.)
      // user.hasMany(models.log, {
      //   as: "logs",
      //   foreignKey: "logId",
      //   constraints: false,
      //   scope: {
      //     logType: "Users",
      //   },
      // });
      // Una para registrar los logs de las acciones de un usuario en partcular sobre distientos elementos como invoices, suppliers, etc.
      // user.hasMany(models.log, {
      //   as: "userLogs",
      //   foreignKey: "userId",
      //   timestamps: false,
      // });
    }
  }
  user.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      user: DataTypes.STRING,
      email: DataTypes.STRING,
      image: DataTypes.STRING,
      password: DataTypes.STRING,
      resetFlag: DataTypes.BOOLEAN,
      active: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
