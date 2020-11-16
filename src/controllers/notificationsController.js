import notificationService from '../services/notifications';
import { renderEmail, sendNotification } from '../helpers/notifications/emailNotifier';
import Util from '../helpers/utils';

const util = new Util();

export default class notifier {
  static async notifyTheUser(notification, email) {
    await notificationService.createNotification(notification);
    await sendNotification({
      message: renderEmail(notification.message),
      email,
    });
  }

  static async showAll(req, res) {
    try {
      const { id } = req.userInfo;
      const notifications = await notificationService.getNotifications(id);
      util.setSuccess(200, 'Notifications', notifications);
      return util.send(res);
    } catch (error) {
      util.setError(500, error.message);
      return util.send(res);
    }
  }

  static async getOne(req, res) {
    try {
      const { id } = req.userInfo;
      const { notification } = req.params;
      const notifications = await notificationService.getOne({ receiver: id, id: notification });
      await notificationService.update({ receiver: id, id: notification });
      util.setSuccess(200, 'Notifications', notifications);
      return util.send(res);
    } catch (error) {
      util.setError(500, error.message);
      return util.send(res);
    }
  }
}
