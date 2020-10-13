import {welcome} from './welcome.swagger';
const paths = {...welcome}
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
  paths
};
export default config;
