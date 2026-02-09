import multer from 'multer';
import fs from 'fs';
import crypto from 'crypto';
import path from 'path';

const uploadsDir = process.env.UPLOADS_DIR || '/mnt/files-mev';
fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const hash = crypto.randomBytes(8).toString('hex');
    const ext = path.extname(file.originalname) || '.jpg';
    cb(null, `${Date.now()}-${hash}${ext}`);
  }
});

export const upload = multer({
  storage,
  limits: {
    fieldSize: 50 * 1024 * 1024, // 50MB for audioBase64
    fileSize: 20 * 1024 * 1024 // 20MB for image file
  }
});
