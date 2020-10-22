const { string, date } = require('joi');
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Users.hasOne(models.Roles, {
        foreignKey: {
          name: 'roleId',
        },
      });
    }
  }
  Users.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    roleId: DataTypes.INTEGER,
    profilePicture: DataTypes.STRING,
    officeAddres: DataTypes.STRING,
    preferedLanguage: DataTypes.STRING,
    lineManager: DataTypes.STRING,
    isVerified: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};
