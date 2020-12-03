import express from 'express';
import { isAuthenticated } from '../../../middlewares/authorization';
import notificationsController from '../../../controllers/notificationsController';

const router = express.Router();
router.get('/', isAuthenticated, notificationsController.showAll);
router.get('/:notification', isAuthenticated, notificationsController.getOne);

export default router;
