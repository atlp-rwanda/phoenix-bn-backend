import fs from 'fs';
import cloudinary from '../config/claudinary';

export const cloudinaryUploader = async (path) => {
  const { url } = await cloudinary.upload(path);
  fs.unlinkSync(path);
  return url;
};
