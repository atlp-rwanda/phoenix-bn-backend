import joi from 'joi';

export const signupValidateSchema = joi.object({
  email: joi.string().required().email(),
  password: joi.string().required().min(6)
    .max(32),
  confirmPassword: joi.string().valid(joi.ref('password')).required(),
  firstName: joi.string().required().min(4).max(16),
  lastName: joi.string().required().min(4).max(16),

});

export const passwordResetSchema = joi.object({
  email: joi.string().required().email(),
});
export const passwordSchema = joi.object({
  token: joi.string().required(),
  password: joi.string().min(6).required(),
  confirmPassword: joi.valid(joi.ref('password')).required(),
});

export const tokenValid = joi.object({
  userId: joi.number().required(),
  email: joi.string().email().required(),
  resetpassword: joi.boolean().valid(true).required(),
  iat: joi.number().required(),
  exp: joi.number().required(),
});
