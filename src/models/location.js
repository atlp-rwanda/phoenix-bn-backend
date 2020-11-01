const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Location.hasMany(models.Accomodation, {
        foreignKey: 'location_id',
        as: 'accomodation',
      });
    }
  }
  Location.init({
    name: DataTypes.STRING,
    post_code: DataTypes.STRING,
    images: DataTypes.STRING,
    fImage: DataTypes.TEXT,
    district: DataTypes.STRING,
    sector: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Location',
  });
  return Location;
};
