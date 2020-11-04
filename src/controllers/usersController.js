import bcrypt from 'bcrypt';
import { pick } from 'lodash';
import { sendLink } from '../utils/sendVerificationLink';
import { newJwtToken } from '../helpers/tokenGenerator';
import Util from '../helpers/utils';
import userService from '../services/userService';
import AuthTokenHelper from '../helpers/AuthTokenHelper';
import {
  sendPasswordResetLink,
} from '../utils/sendPasswordLInk';
import 'dotenv/config';
import { decodeToken } from '../middlewares/verifications/verifyToken';

const util = new Util();
export default class user {
  static async signupWithEmail(req, res) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
      };
      const createdUser = await userService.createuser(newUser);
      return sendLink(res, createdUser);
    } catch (error) {
      util.setError(500, error.message);
      return util.send(res);
    }
  }

  static async verifyEmail(req, res) {
    try {
      await userService.updateAtt({
        isVerified: true,
      }, {
        id: res.id,
      });
      const {
        id, isVerified, RoleId, email,
      } = await userService.findById(res.id);
      const token = await newJwtToken({ userId: id, RoleId }, '1h');
      const data = { userId: id, email, token };
      const message = 'your account was verified!';
      util.setSuccess(200, message, data);
      return util.send(res);
    } catch (error) {
      util.setError(500, error.message);
      return util.send(res);
    }
  }

  static async resetPassword(req, res, next) {
    try {
      const { userInfo } = res;
      const { token } = res;
      const sentLink = await sendPasswordResetLink(res, {
        token,
        email: userInfo.email,
        name: userInfo.firstName,
      });
      util.setSuccess(200, sentLink.message, sentLink.data);
      return util.send(res);
    } catch (error) {
      util.setError(500, error.message, null);
      return util.send(res);
    }
  }

  static async changePassword(req, res, next) {
    try {
      const email = res.info.email;
      const userId = res.info.userId;
      console.log(res.info);
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      await userService.updateAtt({ password: hashedPassword }, { id: userId, email });
      util.setError(200, 'password changed! you can now login with new password');
      return util.send(res);
    } catch (error) {
      util.setError(500, error.message, null);
      return util.send(res);
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      if (email === null) {
        util.message = 'Email is Required';
        util.statusCode = 400;
        return util.send(res);
      }
      if (password === null) {
        util.message = 'Password is Required';
        util.statusCode = 400;
        return util.send(res);
      }

      const currentUser = await userService.findByEmail(email);
      if (!currentUser) {
        util.message = 'User not exist';
        util.statusCode = 404;
        return util.send(res);
      }
      if (currentUser.isVerified === false) {
        util.message = 'Please Verify your account';
        util.statusCode = 400;
        return util.send(res);
      }
      const isMatch = await bcrypt.compare(password, currentUser.password);
      if (isMatch) {
        const displayData = pick(currentUser.dataValues, ['firstName', 'lastName', 'email', 'id', 'RoleId']);
        const authToken = AuthTokenHelper.generateToken(displayData);
        userService.updateAtt({ authToken }, { email: displayData.email });
        util.statusCode = 200;
        util.type = 'success';
        util.message = 'User Logged in Successfully';
        util.data = { displayData, authToken };
        return util.send(res);
      }
      util.setError(401, 'Incorrect username or password');
      return util.send(res);
    } catch (err) {
      util.setError(500, err.message);
      return util.send(res);
    }
  }

  static async changeRole(req, res, next) {

    try {
      const { id } = req.params;
      const { roleId } = req.body;
      const userExist = await userService.findById(id);
      if (userExist) {
        const update = await userService.updateAtt({ RoleId: roleId }, { id });
        util.setSuccess('200', 'Role Updated');
        return util.send(res);
      }
      util.setError(400, 'The user doesn\'t exist');
      return util.send(res);
    } catch (error) {
      util.setError(500, error.message);
      return util.send(res);
    }


  }

  static async userLogout(req, res) {
    try {
      const queryResult = await userService.updateAtt(
        { authToken: null },
        { id: res.id },
      );
      util.setSuccess('200', 'Logout successful');
      return util.send(res);
    } catch (error) {
      util.setError(500, error.message);
      return util.send(res);
    }
  }

  static async assignUsers(req, res) {
    try {
      const { lineManagerId } = req.body;
      const { userId } = req.body;
      const lineManager = await userService.findByLineManagerId(lineManagerId);
      if (lineManager) {
        const update = await userService.updateAtt({ lineManager: lineManagerId }, { id: userId });
        util.setSuccess('200', 'user is assigned to the manager');
        return util.send(res);
      }
      util.setError(400, 'The manager doesn\'t exist');
      return util.send(res);
    } catch (error) {
      util.setError(500, error.message);
      return util.send(res);
    }

  }

  static async getUsers(req, res) {
    try {
      const { id } = req.params;
      const users = await userService.getUsers(id);
      if (users.length >= 1) {
        const message = 'the users assigned to that manager are found';
        util.setSuccess(200, message, users);
        return util.send(res);
      }
      util.setError(400, 'The manager doesn\'t have users');
      return util.send(res);
    } catch (error) {
      util.setError(500, error.message);
      return util.send(res);
    }
  }
}
