import userService from '../services/userService';
import Util from '../helpers/utils';
import 'dotenv/config';

const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
})

const util = new Util();
const upload = async (req, res) => {

    try {
        const { id } = req.userInfo;
        const file = req.files.image;
        await userService.findById(id);
        cloudinary.uploader.upload(file.tempFilePath, function (err, result) {
            const url = result['url']
            userService.updateAtt({ profilePicture: url }, { id });
            const data = { url };
            const message = 'user profile image updated';
            util.setSuccess(200, message, data);
            return util.send(res);
        })

    } catch (error) {
        util.setError(500, error.message);
        return util.send(res);
    }

};

module.exports = {
    upload
};