const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Accomodations extends Model {
    /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
    static associate(models) {
      // define association here
      Accomodations.hasMany(models.trips, {
        foreignKey: 'accomodation_id',
        targetKey: 'id',
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
        as: 'trip',
      });
      Accomodations.belongsTo(models.location, {
        foreignKey: 'location_id',
        as: 'location',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      Accomodations.hasMany(models.Rooms, {
        foreignKey: 'accomodation_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: 'accomodation',
      });
    }
  }
  Accomodations.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    location_id: DataTypes.INTEGER,
    amenities: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    image: DataTypes.STRING,
    capacity: DataTypes.INTEGER,
    roomsLeft: DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'Accomodations',
  });
  return Accomodations;
};
