import express from 'express';
import user from './users/userRoutes';
import permission from './permissions/permissionRoutes';
import role from './roles/roleRoutes';
import rolePerm from './rolepermissions/rolepermissions';
import request from './requests/requestRoutes';
import accomodation from './accomodations/accomodationRoutes';
import location from './locations/locationRoutes';
import room from './rooms/roomRoutes';

const router = express.Router();
router.use('/users', user);
router.use('/permissions', permission);
router.use('/roles', role);
router.use('/rolesPermissions', rolePerm);
router.use('/request', request);
router.use('/accomodation', accomodation);
router.use('/location', location);
router.use('/room', room);
export default router;
