import express from 'express';
import usersController from '../../../controllers/usersController';
import validate from '../../../middlewares/validators/validate';

const router = express.Router();
router.post('/signup', validate.signupValidate, usersController.signupWithEmail);
router.get('/verify/:token', validate.verifyEmail, usersController.verifyEmail);
export default router;
