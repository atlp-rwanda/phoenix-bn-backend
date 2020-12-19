/* eslint-disable consistent-return */
import { pick } from 'lodash';
import AuthTokenHelper from '../../helpers/AuthTokenHelper';
import userService from '../../services/userService';
import usersController from '../../controllers/usersController';

const googleAuth = async (req, res) => {
  const { emails } = req.user;
  const currentUser = await userService.findByEmail(emails[0].value);
  if (currentUser !== null) {
    if (currentUser.isVerified === false) {
      res.redirect(`${process.env.FRONT_END_URL}/'socialAuth/failed:/auth'`);
    }
    const displayData = pick(currentUser.dataValues, ['id', 'firstName', 'lastName', 'email', 'socialId', 'provider']);
    const authToken = AuthTokenHelper.generateToken(displayData);
    userService.updateAtt({ authToken }, { email: displayData.email });
    const encodedToken = Buffer.from(authToken).toString('base64');
    res.redirect(`${process.env.FRONT_END_URL}/socialAuth/success/${encodedToken}`);
  }
  if (currentUser === null) {
    return usersController.socialSignup(req.user, res);
  }
};

export default googleAuth;
