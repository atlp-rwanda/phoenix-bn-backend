import joi, { string } from 'joi';

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
export const tripSchema = joi.object({
  destination: joi.array().min(1).required(),
  origin: joi.string().required(),
  travelDate: joi.date().iso().required(),
  returnDate: joi.date().iso(),
  accomodation: joi.number().required(),
  reason: joi.string().required(),
});
export const locationSchema = joi.object({
  name: joi.string().required().min(4),
});
export const accomodationSchema = joi.object({
  name: joi.string().min(4).required(),
  description: joi.string().min(10).required(),
  location_id: joi.number().required(),
  amenities: joi.array().min(1).required(),
  image: joi.string(),
  roomsAvailable: joi.number().required().min(0),
  numberOfRooms: joi.number().required().min(0),

});
export const accomodationUpdateSchema = joi.object({
  name: joi.string().min(4),
  description: joi.string().min(10),
  location_id: joi.number(),
  amenities: joi.string().min(1),
  image: joi.string(),
});
export const rooms = joi.object({
  price: joi.string().min(4).required(),
  accomodation_id: joi.number().required(),
  details: joi.string().required(),
  roomNumber: joi.string().required(),
});
export const reviewSchema = joi.object({
  rate: joi.number().min(1).max(5).required(),
  comment: joi.string().required(),
});
