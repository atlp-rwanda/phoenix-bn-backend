import express from 'express';
import { isAuthenticated, allowedRoles } from '../../../middlewares/authorization';
import validate from '../../../middlewares/validators/validate';
import verify from '../../../middlewares/verifications/verification';
import { fileUploader } from '../../../helpers/fileUploader';
import roomsController from '../../../controllers/roomsController';

const {
  createRoom, viewRooms, deleteRoom, updatable, updateRoom,
} = roomsController;
const router = express.Router();
router.post('/', isAuthenticated, allowedRoles([2]), fileUploader.any(), validate.roomImages,
  validate.room, verify.accomodation, createRoom);
router.get('/:accomodation', isAuthenticated, allowedRoles([2, 2, 3, 4]), verify.accomodation, viewRooms);
router.delete('/:room', isAuthenticated, allowedRoles([2]), deleteRoom);
router.patch('/:room', isAuthenticated, allowedRoles([2]), fileUploader.any(), updatable, updateRoom);
export default router;
