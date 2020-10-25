import express from 'express';
import validator from '../../../middlewares/validators/validate';

const router = express.Router();

const getRequest = (req, res)=>{
    res.send('you can create a Request');
};

router.get('/', validator.verifyRole, getRequest);
export default router;
