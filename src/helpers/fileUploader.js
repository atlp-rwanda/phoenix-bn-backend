import multer from 'multer';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, `${__dirname}/../public/images`);
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const fileUploader = multer({ storage });
