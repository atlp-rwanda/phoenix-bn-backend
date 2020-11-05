import dotenv from 'dotenv';
import { welcome } from './welcome.swagger';
import { manualSignup } from './manualSignup.swagger';
import { assignUsers } from './assignUsers.swagger';
import { resetPassword } from './passwordReset.swagger';
import { logout } from './userLogout.swagger';
import { sendTripRequest } from './sendTripRequest.swagger';

dotenv.config();
const paths = {
  ...welcome,
  ...manualSignup,
  ...resetPassword,
  ...logout,
  ...sendTripRequest,
  ...assignUsers,
};

const config = {
  swagger: '2.0',
  info: {
    description: 'barefoot NOmad',
    version: '1.0.0',
    title: 'Barefoot Nomad',
  },
  host: process.env.HOST.replace('http://', '') || process.env.HOST.replace('https://', ''),
  basePath: '/',
  schemes: [
    'http',
    'https',
  ],
  paths,
};
export default config;
