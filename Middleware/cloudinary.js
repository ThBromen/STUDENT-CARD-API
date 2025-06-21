import multer from "multer";
import path from "path";
import fs from "fs";

// ✅ Ensure 'images' directory exists
const uploadDir = path.resolve("images");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// ✅ Validate file types (images only)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"));
  }
};

// ✅ Create upload instance with limits
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 4 * 1024 * 1024 // Max 2MB per file
  }
});

// ✅ Export reusable middleware for different forms
export const cardRequestImageUpload = upload.single("photo"); // Expecting field name: photo
export const galleryImageUpload = upload.single("backdropImage"); // Expecting field name: backdropImage

// ✅ Optional error handling middleware for multer
export const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError || err.message.includes("Only image")) {
    return res.status(400).json({ error: err.message });
  }
  next(err);
};
