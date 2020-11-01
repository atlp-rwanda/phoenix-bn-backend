import express from 'express';
import accomodationController from '../../../controllers/accomodationController';
// import validator from '../../../middlewares/validators/validate';

const router = express.Router();
router.get('/', accomodationController.allAccomodation);
router.post('/save', accomodationController.saveAccomodation);
router.get('/findByProp/:prop', accomodationController.findAccomodationByProp);
router.get('/:id', accomodationController.findAccomodation);
router.put('/update/:id', accomodationController.updateAccomodation);
router.delete('/delete/:id', accomodationController.deleteAccomodation);
export default router;
