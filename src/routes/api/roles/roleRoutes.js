import express from 'express';
import rolesController from '../../../controllers/rolesController';
import validator from '../../../middlewares/validators/validate';

const router = express.Router();
router.get('/', validator.verifyAdmin, rolesController.allRole);
router.post('/save', validator.verifyAdmin, rolesController.saveRole);
router.get('/findById/:id', validator.verifyAdmin, rolesController.findRole);
router.get('/findByName/:name', validator.verifyAdmin, rolesController.findRoleByName);
router.put('/update/:id', validator.verifyAdmin, rolesController.updateRole);
router.delete('/delete/:id', validator.verifyAdmin, rolesController.deleteRole);
export default router;
