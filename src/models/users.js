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
      models.Users.belongsTo(models.Roles,{
        foreignKey: {
          name: 'RoleId',
        },
      });
    }
  }
  Users.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    RoleId: DataTypes.INTEGER,
    profilePicture: DataTypes.STRING,
    officeAddres: DataTypes.STRING,
    preferedLanguage: DataTypes.STRING,
    lineManager: DataTypes.INTEGER,
    isVerified: DataTypes.BOOLEAN,
    socialId: DataTypes.STRING,
    provider: DataTypes.STRING,
    authToken: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};
