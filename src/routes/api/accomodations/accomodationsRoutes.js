import express from 'express';
import { isAuthenticated, allowedRoles } from '../../../middlewares/authorization';
import validate from '../../../middlewares/validators/validate';
import verify from '../../../middlewares/verifications/verification';
import accomodationController from '../../../controllers/accomodationsController';
import { fileUploader } from '../../../helpers/fileUploader';
import bookController from '../../../controllers/bookController';
import reviewController from '../../../controllers/reviewsController';

const {
  createAccomodation, oneAccomodation, getAccomodationsBylocation, updatableFields, deleteAccomodations, getAccomodations, updateAccomodation,
} = accomodationController;
const router = express.Router();
router.post('/', isAuthenticated,fileUploader.any(), allowedRoles([2]), validate.accomodation, verify.location, createAccomodation);
router.get('/:location_id', verify.location, getAccomodationsBylocation);
router.get('/', isAuthenticated, allowedRoles([2]), getAccomodations);
router.delete('/:accomodation', isAuthenticated, allowedRoles([2]), validate.Acommodation, deleteAccomodations);
router.patch('/:accomodation', isAuthenticated, allowedRoles([2]), fileUploader.any(), validate.accomodationUpdate, validate.Acommodation, updatableFields, updateAccomodation);

router.post('/book', isAuthenticated, allowedRoles([5, 3, 2]), bookController.bookAccomodation);
router.get('/book/check', isAuthenticated, allowedRoles([5, 3]), bookController.checkAvailability);
router.get('/book/find', isAuthenticated, allowedRoles([5, 3]), bookController.findBookings);
router.post('/review/:accomodation', isAuthenticated, allowedRoles([5, 3]), validate.Acommodation, validate.hasBooked, validate.review, reviewController.addReview);
router.get('/view/:accomodation', isAuthenticated, validate.Acommodation, oneAccomodation);
export default router;
