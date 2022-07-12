'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Mail.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    from_user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    to_user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    bar_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    mail_message: {
      type: DataTypes.TEXT
    },
    mail_status: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Mail',
  });
  return Mail;
};
