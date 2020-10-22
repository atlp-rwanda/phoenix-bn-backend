import express from 'express';
import usersController from '../../../controllers/usersController';
import validate from '../../../middlewares/validators/validate';
import verification from '../../../middlewares/verifications/verification';

const router = express.Router();

router.post('/signup', validate.signupValidate, usersController.signupWithEmail);
router.get('/verify/:token', validate.verifyEmail, usersController.verifyEmail);
router.post('/forgot-password', validate.validateEmail, verification.email, usersController.resetPassword);

router.put('/reset-password/:token', validate.passwordMatch, verification.tokenValid, usersController.changePassword);

export default router;
