'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_name: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      user_email: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      user_password: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      user_sex: {
        type: Sequelize.TEXT
      },
      user_age: {
        type: Sequelize.TEXT
      },
      user_city: {
        type: Sequelize.TEXT
      },
      user_street: {
        type: Sequelize.TEXT
      },
      user_house: {
        type: Sequelize.TEXT
      },
      user_isAdmin: {
        allowNull: false,
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Users');
  }
};
