import joi from 'joi';

const signupValidateSchema = joi.object({
  email: joi.string().required().email(),
  password: joi.string().required().min(6)
    .max(32),
  confirmPassword: joi.string().valid(joi.ref('password')).required(),
  firstName: joi.string().required().min(4).max(16),
  lastName: joi.string().required().min(4).max(16),

});

export default signupValidateSchema;
