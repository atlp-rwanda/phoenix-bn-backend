import express from 'express';
import welcomeController from '../contollers';

const router = express.Router();
router.get('/', welcomeController.getWelcomeController);
export default router;
