'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Bar }) {
      Photo.belongsTo(Bar, { foreignKey: 'bar_id' });
    }
  }
  Photo.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      photo_name: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      bar_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Bars',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Photo',
    }
  );
  return Photo;
};
