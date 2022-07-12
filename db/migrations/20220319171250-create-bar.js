'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bars', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      bar_title: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      bar_type: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      bar_city: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      bar_street: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      bar_house: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      bar_price: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bars');
  }
};
