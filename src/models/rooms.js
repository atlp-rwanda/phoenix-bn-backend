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
    price: DataTypes.STRING,
    accomodation_id: DataTypes.INTEGER,
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    details: DataTypes.STRING,
    roomNumber: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Rooms',
  });
  return Rooms;
};
