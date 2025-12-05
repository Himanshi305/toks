import multer from "multer";
import path from "path";

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/avatars"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ""))
});

// Validate only images
const fileFilter = (req, file, cb) => {
  const allowed = ["image/png", "image/jpeg", "image/jpg"];
  if (!allowed.includes(file.mimetype))
    return cb(new Error("Only JPG, JPEG, PNG allowed"), false);
  cb(null, true);
};

export const uploadAvatar = multer({ storage, fileFilter });