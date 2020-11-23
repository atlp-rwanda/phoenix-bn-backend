import userService from '../services/userService';
import Util from '../helpers/utils';
import { cloudinaryUploader } from '../helpers/cloudinaryUploader';

const util = new Util();
const upload = async (req, res) => {
  try {
    const { id } = req.userInfo;
    await userService.findById(id);
    const { path } = req.files[0];
    const url = await cloudinaryUploader(path);
    await userService.updateAtt({ profilePicture: url }, { id });
    const message = 'user profile image updated';
    util.setSuccess(200, message, url);
    return util.send(res);
  } catch (error) {
    util.setError(500, error.message);
    return util.send(res);
  }
};

module.exports = {
  upload,
};
