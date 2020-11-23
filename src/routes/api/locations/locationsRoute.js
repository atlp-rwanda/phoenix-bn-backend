import express from 'express';
import { isAuthenticated, allowedRoles } from '../../../middlewares/authorization';
import validate from '../../../middlewares/validators/validate';
import locatinContoller from '../../../controllers/locationController';

const {
  createLocation, updateLocation, deleteLocation, getLocations,
} = locatinContoller;
const router = express.Router();
router.get('/', getLocations);
router.post('/', isAuthenticated, allowedRoles([2]), validate.location, createLocation);
router.put('/update/:id', isAuthenticated, allowedRoles([2]), validate.location, updateLocation);
router.delete('/:id', isAuthenticated, allowedRoles([2]), deleteLocation);
export default router;
