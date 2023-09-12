'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cellphones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      phonenumber: {
        type: Sequelize.INTEGER
      },
      brand: {
        type: Sequelize.STRING
      },
      model: {
        type: Sequelize.STRING
      },
      sector: {
        type: Sequelize.STRING
      },
      imei: {
        type: Sequelize.STRING
      },
      user: {
        type: Sequelize.STRING
      },
      deliverydate: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cellphones');
  }
};