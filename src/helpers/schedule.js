var cron = require('node-cron');
import bookController from '../controllers/bookController';

cron.schedule('* * * * *', () => {
  bookController.checkOutUser();
});