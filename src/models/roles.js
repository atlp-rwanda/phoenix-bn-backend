import moment from 'moment';

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
    createdAt: {
      allowNull: false,
      type: DataTypes.DATEONLY,
      get: () => moment(this.getDataValue('createdAt')).format('DD/MM/YYYY h:mm:ss'),
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATEONLY,
      get: () => moment(this.getDataValue('updatedAt')).format('DD/MM/YYYY h:mm:ss'),
    },
  }, {
    sequelize,
    modelName: 'Roles',
  });
  return Roles;
};
