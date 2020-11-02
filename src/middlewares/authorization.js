import { decodeToken } from './verifications/verifyToken';
import Util from '../helpers/utils';
import userService from '../services/userService';

const util = new Util();

export const isAuthenticated = async (req, res, next) => {
  try {
    const authToken = req.headers.authorization;
    const decoded = await decodeToken(authToken);
    const loggedIn = await userService.findByProp({ authToken });
    if (!loggedIn[0]) {
      const Error = 'Login first To continue';
      util.setError(401, Error);
      return util.send(res);
    }
    req.userInfo = decoded;
    next();
  } catch (error) {
    util.setError(500, error.message);
    return util.send(res);
  }
};

export const allowedRoles = (roles) => {
  const allow = (req, res, next) => {
    try {
      const { RoleId } = req.userInfo;
      if (roles.indexOf(RoleId) < 0) {
        util.setError(403, 'You are not allowed to permform this task');
        return util.send(res);
      }
      next();
    } catch (error) {
      util.setError(500, error.message);
      return util.send(res);
    }
  };
  return allow;
};

export const hasManager = async (req, res, next) => {
  try {
    const { id } = req.userInfo;
    const getManager = await userService.findById(id);
    const { lineManager } = getManager;
    const chk = await userService.findById(lineManager);
    if (chk === null) {
      util.setError(403, 'sorry  you don\'t  have manager assigned to you ');
      return util.send(res);
    }
    req.lineManager = chk.id;
    next();
  } catch (error) {
    util.setError(500, error.message);
    return util.send(res);
  }
};
