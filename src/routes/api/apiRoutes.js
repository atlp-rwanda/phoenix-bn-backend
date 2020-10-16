import express from 'express';
import user from './users/userRoutes';

const router = express.Router();
router.use('/users', user);
export default router;
