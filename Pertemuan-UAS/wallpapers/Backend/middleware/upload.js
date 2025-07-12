const multer = require("multer");
const path = require("path");
const fs = require("fs");

// 📁 Folder tujuan: profile (berdiri sendiri di root backend)
const uploadDir = path.join(__dirname, "..", "profile");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("📁 Folder profile dibuat di:", uploadDir);
} else {
  console.log("📁 Folder profile sudah ada di:", uploadDir);
}

// 📦 Konfigurasi penyimpanan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const filename = `${file.fieldname}-${Date.now()}${ext}`;
    cb(null, filename);
  },
});

// 🎯 Filter file: hanya JPG/JPEG
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Hanya file JPG atau JPEG yang diperbolehkan"), false);
  }
};

module.exports = multer({ storage, fileFilter });
