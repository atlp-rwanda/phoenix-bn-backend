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
    }
  }
  Accomodations.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    location: DataTypes.STRING,
    cost: DataTypes.INTEGER,
    owner: DataTypes.STRING,
    status: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    availableRooms: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Accomodations',
  });
  return Accomodations;
};
