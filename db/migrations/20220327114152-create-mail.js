'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Mails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      from_user_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      to_user_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      bar_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      mail_message: {
        type: Sequelize.TEXT
      },
      mail_status: {
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
    await queryInterface.dropTable('Mails');
  }
};
