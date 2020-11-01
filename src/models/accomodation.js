const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Accomodation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Accomodation.hasMany(models.Room, {
        foreignKey: 'accomodation_id',
        as: 'room',
      });
      Accomodation.belongsTo(models.Location, {
        foreignKey: 'location_id',
      })
    };
  };
  Accomodation.init({
    title: DataTypes.STRING,
    location_id: DataTypes.INTEGER,
    rooms: DataTypes.INTEGER,
    internet: DataTypes.BOOLEAN,
    total_price: DataTypes.STRING,
    price_per_night: DataTypes.STRING,
    description: DataTypes.TEXT,
    images: DataTypes.TEXT,
    featured_image: DataTypes.TEXT,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Accomodation',
  });
  return Accomodation;
};