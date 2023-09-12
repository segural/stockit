'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('dues', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      branch: {
        type: Sequelize.STRING
      },
      who: {
        type: Sequelize.STRING
      },
      duedate: {
        type: Sequelize.DATE
      },
      description: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.TINYINT
      },
      user: {
        type: Sequelize.STRING
      },
      datenumber: {
        type: Sequelize.BIGINT
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
    await queryInterface.dropTable('dues');
  }
};