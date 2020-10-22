/* eslint-disable no-undef */
import welcome from './welcome.test';
import manualRegistration from './registration/manualSignUp';
import resetPassword from './registration/resetPassword';

describe('test the first endpoint', welcome);
describe('User Registration and Verification', manualRegistration);
describe('Resetting User Password', resetPassword);
