/* eslint-disable camelcase */
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
        id,
        isVerified,
        roleId,
        email,
      } = await userService.findById(res.id);
      const token = await newJwtToken({
        userId: id,
        role: roleId,
      }, '1h');
      const data = {
        userId: id,
        email,
        token,
      };
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
      if (email === process.env.EMAIL && password !== process.env.ADMIN_PASSWORD) {
        util.type = 'error';
        util.statusCode = 400;
        util.message = 'Incorrect password';
        return util.send(res);
      }
      if (password === process.env.ADMIN_PASSWORD && email === process.env.EMAIL) {
        const displayData = pick(currentUser.dataValues, ['id', 'firstName', 'lastName', 'email']);
        const authToken = AuthTokenHelper.generateToken(displayData);
        userService.updateAtt({ authToken }, { email: displayData.email });
        util.statusCode = 200;
        util.message = 'User Logged in Successfully';
        util.data = { displayData, authToken };
        util.type = 'success';
        return util.send(res);
      }
      const isMatch = await bcrypt.compare(password, currentUser.password);
      if (isMatch) {
        const displayData = pick(currentUser.dataValues, ['firstName', 'lastName', 'email', 'id']);
        const authToken = AuthTokenHelper.generateToken(displayData);
        userService.updateAtt({ authToken }, { email: displayData.email });
        util.statusCode = 200;
        util.type = 'success';
        util.message = 'User Logged in Successfully';
        util.data = { displayData, authToken };
        return util.send(res);
      }
    } catch (err) {
      util.type = 'error';
      util.statusCode = 400;
      util.message = 'Incorrect password';
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

  static async socialSignup(userInfo, res) {
    try {
      const {
        given_name, family_name, email, provider, id,
      } = userInfo;
      const userData = {
        firstName: given_name,
        lastName: family_name,
        socialId: id,
        provider,
        email,
        isVerified: true,
      };
      const newUser = await userService.createuser(userData);
      if (newUser) {
        const payload = {
          email: newUser.email,
          userId: newUser.id,
          roleId: newUser.roleId,
        };
        const token = await newJwtToken(payload, '1h');
        await userService.updateAtt({ authToken: token }, { id: newUser.id });

        util.setSuccess(200, 'Account created', {
          email: newUser.email,
          userId: newUser.id,
          roleId: newUser.roleId,
          token,
        });
        return util.send(res);
      }
      util.setError(500, 'Failed to create your account');
      return util.send(res);
    } catch (error) {
      util.setError(500, error.message);
      return util.send(res);
    }
  }
}
