import express from 'express';
import permissionsController from '../../../controllers/permissionsController';
import validator from '../../../middlewares/validators/validate';

const router = express.Router();
router.get('/', validator.verifyAdmin, permissionsController.allPermission);
router.post('/save', validator.verifyAdmin, permissionsController.savePermission);
router.get('/findByName/:name', validator.verifyAdmin, permissionsController.findPermissionByName);
router.get('/findById/:id', validator.verifyAdmin, permissionsController.findPermission);
router.put('/update/:id', validator.verifyAdmin, permissionsController.updatePermission);
router.delete('/delete/:id', validator.verifyAdmin, permissionsController.deletePermission);
export default router;
