import express from 'express';
import { isAuthenticated, allowedRoles } from '../../../middlewares/authorization';
import validate from '../../../middlewares/validators/validate';
import verify from '../../../middlewares/verifications/verification';
import accomodationController from '../../../controllers/accomodationsController';
import { fileUploader } from '../../../helpers/fileUploader';

const {
  createAccomodation, getAccomodationsBylocation, updatableFields, deleteAccomodations, getAccomodations, updateAccomodation,
} = accomodationController;
const router = express.Router();
router.post('/', isAuthenticated, allowedRoles([2]), fileUploader.any(), validate.accomodation, verify.location, createAccomodation);
router.get('/:location_id', verify.location, getAccomodationsBylocation);
router.get('/', isAuthenticated, allowedRoles([2]), getAccomodations);
router.delete('/:accomodation', isAuthenticated, allowedRoles([2]), validate.Acommodation, deleteAccomodations);
router.patch('/:accomodation', isAuthenticated, allowedRoles([2]), fileUploader.any(), validate.accomodationUpdate, validate.Acommodation, updatableFields, updateAccomodation);
export default router;
