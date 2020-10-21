import express from 'express';
import dotenv from 'dotenv';
import api from './api/apiRoutes';
import welcomeController from '../controllers/index';

dotenv.config();
const version = process.env.API_VERSION || 'v1';
const url = `/api/${version}`;
const router = express.Router();
router.get('/', welcomeController.getWelcomeController);
router.use(url, api);
export default router;
