import dotenv from 'dotenv';
import Util from '../helpers/utils';
import { newJwtToken } from '../helpers/tokenGenerator';
import { transporter } from '../helpers/mailHelper';

dotenv.config();

const util = new Util();
export const sendLink = async (res, userInfo) => {
  try {
    const { email, id } = userInfo;
    const payload = { userEmail: email, userId: id };
    const tokenLink = await newJwtToken(payload, '72h');
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Account Verification',
      html: `Hello! <br> click  <a href='https://phoenix-bn-staging.herokuapp.com/users/verify/${tokenLink}'>here</a> to verify your email</br> or paste this link into your browser
      <a href='https://phoenix-bn-staging.herokuapp.com/users/verify/${tokenLink}'>https://phoenix-bn-staging.herokuapp.com/users/verify/${tokenLink}</a> `,
    };
    const emailsent = await transporter.sendMail(mailOptions);
    if (emailsent) {
      const message = 'A verification email has been sent to you email please go and confirm that email';
      const data = { token: tokenLink };
      util.setSuccess(201, message, data);
	  return util.send(res);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
