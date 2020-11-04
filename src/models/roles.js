const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Roles.hasMany(models.Users, {
        foreignKey: 'RoleId',
        targetKey: 'id',
        onDelete: 'SET DEFAULT',
        onUpdate: 'CASCADE',
        as: 'role',
        foreignKeyConstraint: true,
      });
    }
  }
  Roles.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Roles',
  });
  return Roles;
};
