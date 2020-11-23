import models from '../models';

const { notifications, trips } = models;
/**
 * @exports
 * @class notificationservice
 */
class notificationservice {
  /**
   * create new user
   * @static createNotification
   * @param {object} newNotifications
   * @memberof notificationservice
   * @returns {object} data
   */
  static createNotification(newNotifications) {
    return notifications.create(newNotifications);
  }

  static getNotifications(UserId) {
    return notifications.findAll({
      where: {
        receiver: UserId,
      },
      include: {
        model: trips,
        as: 'tripInfo',
      },
      attributes: {
        exclude: ['receiver', 'createdAt', 'updatedAt'],
      },
    });
  }

  static getOne(notification) {
    return notifications.findOne({
      where: notification,
      attributes: {
        exclude: ['receiver', 'createdAt', 'updatedAt', 'isRead'],
      },
      include: {
        model: trips,
        as: 'tripInfo',
      },
    });
  }

  static update(notification) {
    return notifications.update({ isRead: true }, {
      where: notification,
    });
  }
}
export default notificationservice;
