import express from 'express';
import { isAuthenticated } from '../../../middlewares/authorization';
import commentController from '../../../controllers/commentsController';

const router = express.Router();
router.post('/comment/:id', isAuthenticated, commentController.createComment);
router.get('/comment/:id', isAuthenticated, commentController.RequestComments);
export default router;
