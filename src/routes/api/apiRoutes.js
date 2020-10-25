import express from 'express';
import user from './users/userRoutes';
import permission from './permissions/permissionRoutes';
import role from './roles/roleRoutes';
import rolePerm from './rolepermissions/rolepermissions';

const router = express.Router();
router.use('/users', user);
router.use('/permissions', permission);
router.use('/roles', role);
router.use('/rolesPermissions', rolePerm);
export default router;
