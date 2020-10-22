import userService from '../../services/userService';
import Util from '../../helpers/utils';
import { newJwtToken } from '../../helpers/tokenGenerator';
import { decodeToken } from './verifyToken';
import { tokenValid } from '../../helpers/validateSchema';

const util = new Util();
export default class verifications {
  static async email(req, res, next) {
    try {
      const user = await userService.findByProp({ email: req.body.email });
      if (user[0]) {
        const payload = {
          userId: user[0].id,
          email: user[0].email,
          resetpassword: true,
        };
        const token = await newJwtToken(payload, '1h');
        res.token = token;
        res.userInfo = user[0];
        next();
      } else {
        util.setError(404, 'User with that  email doesn\'t exist');
        return util.send(res);
      }
    } catch (error) {
      util.setError(500, error.message);
      return util.send(res);
    }
  }

  static async tokenValid(req, res, next) {
    try {
      const decoded = await decodeToken(req.params.token);
      const { error } = tokenValid.validate(decoded);
      if (error) {
        const Error = 'Invalid link';
        util.setError(400, Error);
        return util.send(res);
      }
      res.info = decoded;
      next();
    } catch (error) {
      util.setError(500, error.message.replace('jwt expired', 'Link Expired'));
      return util.send(res);
    }
  }
}
