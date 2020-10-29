import express from 'express';
import rolesPermController from '../../../controllers/rolepermissionController';
import validator from '../../../middlewares/validators/validate';

const router = express.Router();

router.get('/', validator.verifyAdmin, rolesPermController.allRolePermission);
router.post('/save', validator.verifyAdmin, rolesPermController.saveRolePerm);
router.get('/findById/:id', validator.verifyAdmin, rolesPermController.findRolePerm);
router.get('/findByRole/:prop', validator.verifyAdmin, rolesPermController.findRolePermByRole);
router.get('/findByPermission/:prop', validator.verifyAdmin, rolesPermController.findRolePermByPermission);
router.put('/update/:id', validator.verifyAdmin, rolesPermController.updateRolePerm);
router.delete('/delete/:id', validator.verifyAdmin, rolesPermController.deleteRolePerm);

export default router;
