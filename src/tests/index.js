/* eslint-disable no-undef */
import welcome from './welcome.test';
import manualRegistration from './registration/manualSignUp';
import socialSignUpTest from './socialSignUpTest/socialSignUpTest.test.js';
import facebookLoginTest from './signinTest/facebookLogin.test';
import googleLoginTest from './signinTest/googleLogin.test';
import manualLogintest from './signinTest/manualLogin.test';
import resetPassword from './registration/resetPassword';
import logoutTest from './logoutTest/logout.test';
import permissionTest from './permissions/permissions';
import roleTest from './roles/roles';
import rolePermissionTest from './rolePermissions/rolePermissions';

describe('test the first endpoint', welcome);
describe('test the manual login endpoint', manualLogintest);
describe('User Registration and Verification', manualRegistration);
describe('test for social signup api', socialSignUpTest);
describe('test the facebook login api', facebookLoginTest);
describe('test the google login endpoint', googleLoginTest);
describe('Resetting User Password', resetPassword);
describe('Test the user logout endpoints',logoutTest);
describe('test for accessing permission endpoint', permissionTest);
describe('test for accessing role endpoint', roleTest);
describe('test for accessing rolePermission endpoint', rolePermissionTest);
