import express from 'express';
import roomController from '../../../controllers/roomController';
// import validator from '../../../middlewares/validators/validate';

const router = express.Router();
router.get('/', roomController.allRoom);
router.post('/save', roomController.saveRoom);
router.get('/findByProp/:prop', roomController.findRoomByProp);
router.get('/:id', roomController.findRoom);
router.put('/update/:id', roomController.updateRoom);
router.delete('/delete/:id', roomController.deleteRoom);
export default router;