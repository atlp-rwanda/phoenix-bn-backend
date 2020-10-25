import express from 'express';
import rolesController from '../../../controllers/rolesController';

const router = express.Router();
router.get('/', rolesController.allRole);
router.post('/save', rolesController.saveRole);
router.get('/findById/:id', rolesController.findRole);
router.get('/findByName/:name', rolesController.findRoleByName);
router.put('/update/:id', rolesController.updateRole);
router.delete('/delete/:id', rolesController.deleteRole);
export default router;
