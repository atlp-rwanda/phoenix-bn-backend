import bookController from '../controllers/bookController';

const cron = require('node-cron');

cron.schedule('* * * * *', () => {
  bookController.checkOutUser();
});
