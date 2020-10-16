import { welcome } from './welcome.swagger';
import { manualSignup } from './manualSignup';

const paths = { ...welcome, ...manualSignup };
const config = {
  swagger: '2.0',
  info: {
    description: '',
    version: '1.0.0',
    title: 'Barefoot Nomad',
  },
  host: 'localhost:5000',
  basePath: '/',
  schemes: [
    'http',
    'https',
  ],
  paths,
};
export default config;
