const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config(); // baca .env
const sequelize = require("./configs/db"); // koneksi Sequelize

const app = express();

// ✅ Pastikan folder 'uploads' ada
const uploadPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
  console.log("📁 Folder 'uploads' dibuat di:", uploadPath);
} else {
  console.log("📁 Folder 'uploads' sudah ada:", uploadPath);
}

// ✅ Pastikan folder 'profile' ada
const profilePath = path.join(__dirname, "profile");
if (!fs.existsSync(profilePath)) {
  fs.mkdirSync(profilePath, { recursive: true });
  console.log("📁 Folder 'profile' dibuat di:", profilePath);
} else {
  console.log("📁 Folder 'profile' sudah ada:", profilePath);
}

// ✅ Log semua request yang masuk
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

// ✅ Middleware utama
app.use(cors());
app.use(express.json()); // untuk JSON
app.use(express.urlencoded({ extended: true })); // untuk form-urlencoded

// ✅ Serve file statis
app.use("/uploads", express.static(uploadPath));
console.log("🌐 Static route '/uploads' diarahkan ke:", uploadPath);

app.use("/profile", express.static(profilePath));
console.log("🌐 Static route '/profile' diarahkan ke:", profilePath);

// ✅ Daftarkan route API
const wallpaperRoutes = require("./routes/wallpapers");
const downloadRoutes = require("./routes/download");
const authRoutes = require("./routes/auth"); // login & register

app.use("/api/wallpapers", wallpaperRoutes);
app.use("/download", downloadRoutes);
app.use("/api/auth", authRoutes);

// ✅ Error handler
app.use((err, req, res, next) => {
  console.error("❌ Error middleware:", err.message);
  res.status(500).json({ error: err.message || "Terjadi kesalahan server." });
});

// ✅ Sync DB & mulai server
const PORT = process.env.PORT || 5000;

sequelize
  .sync()
  .then(() => {
    console.log("✅ Database tersambung & model sinkron.");
    app.listen(PORT, () => {
      console.log(`🚀 Server berjalan di → http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Gagal koneksi DB:", err.message);
    process.exit(1);
  });
