/* eslint-disable no-undef */
import welcome from './welcome.test';
import manualRegistration from './registration/manualSignUp';
import facebookLoginTest from './signinTest/facebookLogin.test';
import googleLoginTest from './signinTest/googleLogin.test';
import manualLogintest from './signinTest/manualLogin.test';
import resetPassword from './registration/resetPassword';
import logoutTest from './logoutTest/logout.test';

describe('test the first endpoint', welcome);
describe('test the manual login endpoint', manualLogintest);
describe('User Registration and Verification', manualRegistration);
describe('test the facebook login api', facebookLoginTest);
describe('test the google login endpoint', googleLoginTest);
describe('Resetting User Password', resetPassword);
describe('Test the user logout endpoints',logoutTest);
