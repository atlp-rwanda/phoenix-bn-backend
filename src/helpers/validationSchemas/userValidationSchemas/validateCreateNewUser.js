import joi from 'joi';

const validateCreateNewUser = joi.object().keys({
  email: joi.string().email().required(),
  password: joi.string().required().min(6)
    .max(32),
});

export default validateCreateNewUser;
