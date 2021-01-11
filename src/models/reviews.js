import moment from 'moment';

const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class reviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      reviews.belongsTo(models.Accomodations, {
        foreignKey: 'accomodation',
        as: 'Reviews',
      });
      reviews.belongsTo(models.Users, {
        foreignKey: 'userId',
        as: 'userInfo',
      });
    }
  }
  reviews.init({
    accomodation: DataTypes.INTEGER,
    rate: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'reviews',
  });
  return reviews;
};
