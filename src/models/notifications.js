const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class notifications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      notifications.belongsTo(models.Users, {
        foreignKey: 'receiver',
        as: 'userNotifications',
      });
      notifications.belongsTo(models.trips, {
        foreignKey: 'tripId',
        as: 'tripInfo',
      });
    }
  }
  notifications.init({
    receiver: DataTypes.INTEGER,
    tripId: DataTypes.INTEGER,
    message: DataTypes.TEXT,
    isRead: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'notifications',
  });
  return notifications;
};
