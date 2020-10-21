import bcrypt from 'bcrypt';
import { sendLink } from '../utils/sendVerificationLink';
import { newJwtToken } from '../helpers/tokenGenerator';
import Util from '../helpers/utils';
import userService from '../services/userService';

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
      await userService.updateAtt({ isVerified: true }, { id: res.id });
      const {
        id, isVerified, roleId, email,
      } = await userService.findById(res.id);
      const token = await newJwtToken({ userId: id, role: roleId }, '1h');
      const data = { userId: id, email, token };
      const message = 'your account was verified!';
      util.setSuccess(200, message, data);
      return util.send(res);
    } catch (error) {
      util.setError(500, error.message, null);
      return util.send(res);
    }
  }
}
