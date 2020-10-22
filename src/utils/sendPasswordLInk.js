import dotenv from 'dotenv';
import Util from '../helpers/utils';
import {
  transporter,
} from '../helpers/mailHelper';
import { resetPasswordTemplate } from '../services/templates/resetPassword';

dotenv.config();
const util = new Util();
export const sendPasswordResetLink = async (res, info) => {
  try {
    const {
      email,
      token,
      name,
    } = info;
    const emailTemplate = resetPasswordTemplate({ token, name });
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Password Reset',
      html: emailTemplate,
    };
    const emailsent = await transporter.sendMail(mailOptions);
    if (emailsent) {
      const message = 'Password reset  email has been sent to you email please go and confirm that email';
      const data = {
        token,
      };
      return {
        message,
        data,
      };
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
