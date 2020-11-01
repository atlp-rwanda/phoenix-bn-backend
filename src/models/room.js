'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Room.belongsTo(models.Accomodation, {
        foreignKey: 'accomodation_id',
      });
    };
  };
  Room.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    simiralRooms: DataTypes.INTEGER,
    roomNumber: DataTypes.STRING,
    cost: DataTypes.STRING,
    accomodation_id: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};