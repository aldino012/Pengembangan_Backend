const express = require("express");
const router = express.Router();

// ✅ Import multer dan langsung gunakan `.single("image")`
const uploadMiddleware = require("../middleware/upload");

const {
  addWallpaper,
  updateWallpaper,
  deleteWallpaper,
} = require("../controllers/wallpaperController");

const Wallpaper = require("../models/wallpaper");

// ✅ Ambil semua wallpaper
router.get("/", async (req, res) => {
  try {
    const wallpapers = await Wallpaper.findAll({
      order: [["id", "DESC"]],
    });
    res.json(wallpapers);
  } catch (err) {
    res.status(500).json({ error: "Gagal mengambil data" });
  }
});

// ✅ Ambil wallpaper berdasarkan ID
router.get("/:id", async (req, res) => {
  try {
    const wallpaper = await Wallpaper.findByPk(req.params.id);
    if (!wallpaper) {
      return res.status(404).json({ error: "Wallpaper tidak ditemukan" });
    }
    res.json(wallpaper);
  } catch (err) {
    res.status(500).json({ error: "Gagal mengambil data wallpaper" });
  }
});

// ✅ POST tambah wallpaper — file field harus bernama `image`
router.post("/", uploadMiddleware.single("image"), addWallpaper);

// ✅ PUT update wallpaper
router.put("/:id", uploadMiddleware.single("image"), updateWallpaper);

// ✅ DELETE wallpaper
router.delete("/:id", deleteWallpaper);

module.exports = router;
