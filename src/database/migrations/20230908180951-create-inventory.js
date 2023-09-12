'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('inventories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      sector: {
        type: Sequelize.STRING
      },
      branch: {
        type: Sequelize.STRING
      },
      properties: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.INTEGER
      },
      user: {
        type: Sequelize.STRING
      },
      servertype: {
        type: Sequelize.STRING
      },
      serverenv: {
        type: Sequelize.STRING
      },
      ip: {
        type: Sequelize.STRING
      },
      serialnumber: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('inventories');
  }
};