import express from 'express';
import user from './users/userRoutes';
import permission from './permissions/permissionRoutes';
import role from './roles/roleRoutes';
import rolePerm from './rolepermissions/rolepermissions';
import trips from './trips/tripsRoute';
import locations from './locations/locationsRoute';
import accomodations from './accomodations/accomodationsRoutes';
import comments from './comments/commentRouter';
import notifications from './notifications/index';

const router = express.Router();
router.use('/users', user);
router.use('/permissions', permission);
router.use('/roles', role);
router.use('/rolesPermissions', rolePerm);
router.use('/trips', trips);
router.use('/locations', locations);
router.use('/accomodations', accomodations);
router.use('/request', comments);
router.use('/notifications', notifications);

export default router;
