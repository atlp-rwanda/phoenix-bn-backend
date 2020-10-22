import jwt from 'jsonwebtoken';

export const newJwtToken = async (data, expiration) => await jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: expiration });
