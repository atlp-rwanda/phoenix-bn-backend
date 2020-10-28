import express from 'express';
import passport from 'passport';
import usersController from '../../../controllers/usersController';
import validate from '../../../middlewares/validators/validate';
import { OAuth, ValidationMiddleWare } from '../../../middlewares';
import { getProvider } from '../../../helpers/socialProvider';
import verification from '../../../middlewares/verifications/verification';
import authorizationValidator from '../../../middlewares/validators/isAuthenticated';

const router = express.Router();

const { createUserValidation } = ValidationMiddleWare;
router.post('/signup', validate.signupValidate, usersController.signupWithEmail);
router.get('/verify/:token', validate.verifyEmail, usersController.verifyEmail);
router.post('/login', createUserValidation, usersController.login);
router.get('/login/:provider', getProvider);
router.get('/signup/:provider', getProvider);
router.post('/logout',authorizationValidator.isTokenExist,authorizationValidator.isTokenValid,authorizationValidator.isUserExists, usersController.userLogout);
router.get('/auth/google/redirect', passport.authenticate('google', { session: false }), OAuth.googleAuth);
router.get('/auth/facebook/callback', passport.authenticate('facebook', { session: false }), OAuth.facebookAuth);
router.post('/forgot-password', validate.validateEmail, verification.email, usersController.resetPassword);
router.put('/reset-password/:token', validate.passwordMatch, verification.tokenValid, usersController.changePassword);

export default router;
