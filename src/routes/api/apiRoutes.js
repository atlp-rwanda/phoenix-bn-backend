import express from 'express';
import user from './users/userRoutes';
import permission from './permissions/permissionRoutes';
import role from './roles/roleRoutes';
import rolePerm from './rolepermissions/rolepermissions';
import trips from './trips/tripsRoute';
import locations from './locations/locationsRoute';
import accomodations from './accomodations/accomodationsRoutes';
import rooms from './rooms/roomsRoute';
import comments from './comments/commentRouter';

const router = express.Router();
router.use('/users', user);
router.use('/permissions', permission);
router.use('/roles', role);
router.use('/rolesPermissions', rolePerm);
router.use('/trips', trips);
router.use('/locations', locations);
router.use('/accomodations', accomodations);
router.use('/rooms', rooms);
router.use('/request', comments);

export default router;
