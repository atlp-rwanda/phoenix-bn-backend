import express from 'express';
import locationController from '../../../controllers/locationController';
// import validator from '../../../middlewares/validators/validate';

const router = express.Router();
router.get('/', locationController.allLocation);
router.post('/save', locationController.saveLocation);
router.get('/findByProp/:prop', locationController.findLocationByProp);
router.get('/:id', locationController.findLocation);
router.put('/update/:id', locationController.updateLocation);
router.delete('/delete/:id', locationController.deleteLocation);
export default router;
