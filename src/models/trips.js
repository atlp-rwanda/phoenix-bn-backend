const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class trips extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      trips.belongsTo(models.Users, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        onUpdate:'CASCADE',
        foreignKeyConstraint :true,
      });
      trips.belongsTo(models.Users, {
        foreignKey: 'line_manager',
        onDelete: 'CASCADE',
        onUpdate:'CASCADE',
        foreignKeyConstraint :true,
      });
      trips.belongsTo(models.Users, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        onUpdate:'CASCADE',
        foreignKeyConstraint :true,
      });
      trips.belongsTo(models.Accomodations, {
        foreignKey: 'accomodation_id',
        onDelete: 'CASCADE',
        onUpdate:'CASCADE',
        foreignKeyConstraint :true,
        as: 'trip',

      });
    }
  }
  trips.init({
    user_id: DataTypes.INTEGER,
    origin: DataTypes.STRING,
    destination: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    travelDate: DataTypes.DATE,
    returnDate: DataTypes.DATE,
    reason: DataTypes.STRING,
    accomodation_id: DataTypes.INTEGER,
    type: DataTypes.STRING,
    line_manager: DataTypes.INTEGER,
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'trips',
  });
  return trips;
};
