import express from 'express';
import { isAuthenticated, allowedRoles, hasManager } from '../../../middlewares/authorization';
import validate from '../../../middlewares/validators/validate';
import tripsController from '../../../controllers/tripsController';

const router = express.Router();
router.post('/request', isAuthenticated, allowedRoles([3, 4, 5]),
  hasManager, validate.tripRequest, validate.checkDates,
  validate.checkAcommodation, tripsController.createTrip);
router.get('/mine', isAuthenticated, allowedRoles([5, 3, 4]), tripsController.myTrips);
router.get('/report', isAuthenticated, allowedRoles([4, 3]), tripsController.reports);
export default router;
