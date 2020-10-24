import express from 'express';
import passport from 'passport';
import usersController from '../../../controllers/usersController';
import validate from '../../../middlewares/validators/validate';
import { OAuth, ValidationMiddleWare } from '../../../middlewares';
import { getProvider } from '../../../helpers/socialProvider';

const router = express.Router();

const { createUserValidation } = ValidationMiddleWare;
router.post('/signup', validate.signupValidate, usersController.signupWithEmail);
router.get('/verify/:token', validate.verifyEmail, usersController.verifyEmail);
router.post('/login', createUserValidation, usersController.login);
router.get('/login/:provider', getProvider);
router.get('/auth/google/redirect', passport.authenticate('google', { session: false }), OAuth.googleAuth);
router.get('/auth/facebook/callback', passport.authenticate('facebook', { session: false }), OAuth.facebookAuth);
export default router;
