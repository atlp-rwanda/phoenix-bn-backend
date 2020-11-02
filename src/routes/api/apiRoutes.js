import express from 'express';
import user from './users/userRoutes';
import permission from './permissions/permissionRoutes';
import role from './roles/roleRoutes';
import rolePerm from './rolepermissions/rolepermissions';
import trips from './trips/tripsRoute';

const router = express.Router();
router.use('/users', user);
router.use('/permissions', permission);
router.use('/roles', role);
router.use('/rolesPermissions', rolePerm);
router.use('/trips', trips);
export default router;
