import {
  signupValidateSchema,
  passwordResetSchema,
  passwordSchema,
} from '../../helpers/validateSchema';
import userService from '../../services/userService';
import Util from '../../helpers/utils';
import {
  joiValidationError,
} from '../../helpers/joiErrorTemplate';
import {
  decodeToken,
} from '../verifications/verifyToken';

const util = new Util();
export default class validator {
  static async signupValidate(req, res, next) {
    try {
      const getEmail = await userService.findByProp({
        email: req.body.email,
      });
      if (getEmail[0]) {
        util.setError(409, 'Email already exists');
        return util.send(res);
      }
      const {
        error,
      } = signupValidateSchema.validate({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
      });
      return joiValidationError(req, res, next, error);
    } catch (error) {
      util.setError(500, error.message.replace('/', '').replace(/"/g, '').replace('WHERE parameter', ''));
      return util.send(res);
    }
  }

  static async verifyEmail(req, res, next) {
    try {
      const data = await decodeToken(req.params.token);
      const userExist = await userService.findByProp({
        id: data.userId,
      });
      if (userExist[0]) {
        const isVerified = await userService.findByProp({
          isVerified: true,
          id: data.userId,
        });
        if (isVerified[0]) {
          util.setError(422, 'Your account is already verified');
          return util.send(res);
        }
        res.id = data.userId;
        next();
      } else {
        util.setError(404, 'Sorry we can\'t find your account');
        return util.send(res);
      }
    } catch (error) {
      util.setError(500, error.message);
      return util.send(res);
    }
  }

  static async validateEmail(req, res, next) {
    try {
      const {
        error,
      } = passwordResetSchema.validate({
        email: req.body.email,
      });
      if (error) {
        const Error = error.details[0].message.replace('/', '').replace(/"/g, '');
        util.setError(400, Error);
        return util.send(res);
      }
      next();
    } catch (error) {
      util.setError(500, error.message);
      return util.send(res);
    }
  }

  static async passwordMatch(req, res, next) {
    try {
      const {
        error,
      } = passwordSchema.validate({
        token: req.params.token,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
      });
      if (error) {
        if (
          error.details[0].message
            .replace('/', '')
            .replace(/"/g, '')
            .includes('confirmPassword')
        ) {
          const Error = {
            error: 'passwords don\'t match',
          };
        }
        const Error = error.details[0].message.replace('/', '').replace(/"/g, '');
        util.setError(400, Error);
        return util.send(res);
      }
      next();
    } catch (error) {
      util.setError(500, error.message);
      return util.send(res);
    }
  }
}
