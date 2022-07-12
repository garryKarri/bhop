'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Favorite }) {
      User.hasMany(Favorite, { foreignKey: 'user_id' })
    }
  }
  User.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    user_name: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    user_email: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    user_password: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    user_sex: {
      type: DataTypes.TEXT
    },
    user_age: {
      type: DataTypes.TEXT
    },
    user_city: {
      type: DataTypes.TEXT
    },
    user_street: {
      type: DataTypes.TEXT
    },
    user_house: {
      type: DataTypes.TEXT
    },
    user_isAdmin: {
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
    modelName: 'User',
  });
  return User;
};
