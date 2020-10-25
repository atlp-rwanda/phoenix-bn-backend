import express from 'express';
import rolesPermController from '../../../controllers/rolepermissionController';

const router = express.Router();

router.get('/', rolesPermController.allRolePermission);
router.post('/save', rolesPermController.saveRolePerm);
router.get('/findById/:id', rolesPermController.findRolePerm);
router.get('/findByRole/:prop', rolesPermController.findRolePermByRole);
router.get('/findByPermission/:prop', rolesPermController.findRolePermByPermission);
router.put('/update/:id', rolesPermController.updateRolePerm);
router.delete('/delete/:id', rolesPermController.deleteRolePerm);

export default router;
