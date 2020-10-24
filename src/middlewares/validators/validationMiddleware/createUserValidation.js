/* eslint-disable consistent-return */
import { UserValidationSchemas } from '../../../helpers/validationSchemas';

const createUserValidation = (req, res, next) => {
  const { validateCreateNewUser } = UserValidationSchemas;
  const { error } = validateCreateNewUser.validate(req.body);
  if (error) {
    return res.status(400).send({
      status: 400,
      message: 'Validation error occurred',
      AllErrors: {
        error,
      },
    });
  }
  next();
};

export default createUserValidation;
