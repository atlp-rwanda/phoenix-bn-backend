import express from 'express';
import passport from 'passport';
import usersController from '../../../controllers/usersController';
import fileController from '../../../controllers/fileController';
import validate from '../../../middlewares/validators/validate';
import { OAuth, ValidationMiddleWare } from '../../../middlewares';
import { getProvider } from '../../../helpers/socialProvider';
import verification from '../../../middlewares/verifications/verification';
import authorizationValidator from '../../../middlewares/validators/isAuthenticated';
import { isAuthenticated, allowedRoles } from '../../../middlewares/authorization';

const router = express.Router();

const { createUserValidation } = ValidationMiddleWare;
router.post('/signup', validate.signupValidate, usersController.signupWithEmail);
router.get('/verify/:token', validate.verifyEmail, usersController.verifyEmail);
router.post('/login', createUserValidation, usersController.login);
router.get('/login/:provider', getProvider);

router.get('/signup/:provider', getProvider);

router.post('/logout', authorizationValidator.isTokenExist, authorizationValidator.isTokenValid, authorizationValidator.isUserExists, usersController.userLogout);

router.get('/auth/google/redirect', passport.authenticate('google', { session: false }), OAuth.googleAuth);
router.get('/auth/facebook/callback', passport.authenticate('facebook', { session: false }), OAuth.facebookAuth);
router.post('/forgot-password', validate.validateEmail, verification.email, usersController.resetPassword);
router.put('/reset-password/:token', validate.passwordMatch, verification.tokenValid, usersController.changePassword);
router.put('/changeRole/:id', isAuthenticated, allowedRoles([1]), validate.roleExist, usersController.changeRole);
router.put('/manager/assign', isAuthenticated, allowedRoles([3]), usersController.assignUsers);
router.get('/manager/:id', isAuthenticated, allowedRoles([3]), usersController.getUsers);
router.put('/updateProfile/:id', isAuthenticated, usersController.updateProfile);

router.post("/profileImage/upload", isAuthenticated, fileController.upload);
router.get('/profile/:id', isAuthenticated, usersController.getProfile);
export default router;
