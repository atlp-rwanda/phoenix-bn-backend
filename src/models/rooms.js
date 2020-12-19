import moment from 'moment';

const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Rooms extends Model {
    /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
    static associate(models) {
      // define association here
      Rooms.belongsTo(models.Accomodations, {
        foreignKey: 'accomodation_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: 'accomodation',
      });
    }
  }
  Rooms.init({
    userId: DataTypes.INTEGER,
    accomodation_id: DataTypes.INTEGER,
    checkIn: {
      allowNull: false,
      type: DataTypes.DATEONLY,
      get: () => moment(this.getDataValue('checkIn')).format('DD/MM/YYYY h:mm:ss'),
    },
    checkOut: {
      allowNull: false,
      type: DataTypes.DATEONLY,
      get: () => moment(this.getDataValue('checkOut')).format('DD/MM/YYYY h:mm:ss'),
    },
    Status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Rooms',
  });
  return Rooms;
};
