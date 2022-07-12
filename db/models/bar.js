'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate({ Photo, Favorite }) {
      Bar.hasMany(Photo, { foreignKey: 'bar_id' });
      Bar.hasMany(Favorite, { foreignKey: 'bar_id' });
    }
  }
  Bar.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      bar_title: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      bar_type: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      bar_city: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      bar_street: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      bar_house: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      bar_price: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
  }, {
    sequelize,
    modelName: 'Bar',
  });
  return Bar;
};
