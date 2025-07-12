const path = require("path");
const sharp = require("sharp");
const fs = require("fs");
const Wallpaper = require("../models/wallpaper");

// ✅ Pastikan controller termuat
console.log("✅ wallpaperController.js TERLOAD");

// ✅ Tambah Wallpaper
exports.addWallpaper = async (req, res) => {
  console.log("🚀 Controller addWallpaper dipanggil");

  try {
    const { uploader, name, description } = req.body;
    const file = req.file;

    // 🔍 Log detail file
    console.log("📦 File diterima:", file);

    if (!file) {
      console.warn("⚠️ Tidak ada file dikirim!");
      return res.status(400).json({ error: "File gambar wajib diupload" });
    }

    // Cek apakah file ada secara fisik
    if (!fs.existsSync(file.path)) {
      console.error("❌ File tidak ditemukan:", file.path);
      return res.status(500).json({ error: "File upload gagal disimpan" });
    }

    // Path hasil resize
    const resizedFilename = "resized-" + file.filename;
    const resizedPath = path.join(__dirname, "..", "uploads", resizedFilename);
    console.log("📂 Simpan resize ke:", resizedPath);

    // Resize gambar ke 1920x1080
    await sharp(file.path).resize(1920, 1080).toFile(resizedPath);
    console.log("✅ Gambar di-resize");

    // Hapus file asli
    fs.unlinkSync(file.path);
    console.log("🗑️ File asli dihapus:", file.path);

    // Simpan ke DB
    const imageUrl = "/uploads/" + resizedFilename;
    const resolution = "1920x1080";

    const wallpaper = await Wallpaper.create({
      uploader,
      name,
      description,
      resolution,
      image_url: imageUrl,
    });

    console.log("✅ Wallpaper berhasil ditambahkan ke DB:", imageUrl);
    return res.status(201).json({
      message: "Wallpaper berhasil ditambahkan",
      wallpaper,
    });
  } catch (error) {
    console.error("❌ Error addWallpaper:", error);
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Update Wallpaper
exports.updateWallpaper = async (req, res) => {
  console.log("✏️ Controller updateWallpaper dipanggil");

  try {
    const id = req.params.id;
    const { uploader, name, description } = req.body;
    const file = req.file;

    const wallpaper = await Wallpaper.findByPk(id);
    if (!wallpaper) {
      return res.status(404).json({ error: "Wallpaper tidak ditemukan" });
    }

    let imageUrl = wallpaper.image_url;

    if (file) {
      const ext = path.extname(file.originalname).toLowerCase();
      if (ext !== ".jpg" && ext !== ".jpeg") {
        return res
          .status(400)
          .json({ error: "File harus berformat .jpg atau .jpeg" });
      }

      const resizedFilename = "resized-" + file.filename;
      const resizedPath = path.join(
        __dirname,
        "..",
        "uploads",
        resizedFilename
      );

      await sharp(file.path).resize(1920, 1080).toFile(resizedPath);
      fs.unlinkSync(file.path);
      console.log("🖼️ Gambar baru disimpan:", resizedPath);

      // Hapus gambar lama
      const oldPath = path.join(
        __dirname,
        "..",
        "uploads",
        path.basename(wallpaper.image_url)
      );
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
        console.log("🗑️ Gambar lama dihapus:", oldPath);
      }

      imageUrl = "/uploads/" + resizedFilename;
    }

    await wallpaper.update({
      uploader,
      name,
      description,
      image_url: imageUrl,
    });

    console.log("✅ Wallpaper berhasil diperbarui:", imageUrl);
    res.json({ message: "Wallpaper berhasil diupdate", wallpaper });
  } catch (error) {
    console.error("❌ Error updateWallpaper:", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete Wallpaper
exports.deleteWallpaper = async (req, res) => {
  console.log("🗑️ Controller deleteWallpaper dipanggil");

  try {
    const id = req.params.id;
    const wallpaper = await Wallpaper.findByPk(id);

    if (!wallpaper) {
      console.warn("⚠️ Wallpaper tidak ditemukan:", id);
      return res.status(404).json({ error: "Wallpaper tidak ditemukan" });
    }

    const filePath = path.join(
      __dirname,
      "..",
      "uploads",
      path.basename(wallpaper.image_url)
    );
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log("🗑️ File dihapus:", filePath);
    } else {
      console.warn("⚠️ File tidak ditemukan:", filePath);
    }

    await wallpaper.destroy();
    console.log("✅ Wallpaper dihapus dari DB:", id);
    res.json({ message: "Wallpaper berhasil dihapus" });
  } catch (error) {
    console.error("❌ Error deleteWallpaper:", error);
    res.status(500).json({ error: error.message });
  }
};
