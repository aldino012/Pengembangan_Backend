const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// REGISTER
exports.register = async (req, res) => {
  try {
    console.log("🔷 [REGISTER] req.body:", req.body);
    console.log("🔷 [REGISTER] req.file:", req.file);

    const { username, email, password, confirmPassword, role } = req.body;

    // Cek semua field
    if (!username || !email || !password || !confirmPassword || !role) {
      console.warn("⚠️ Field tidak lengkap:", req.body);
      return res.status(400).json({ message: "Semua field wajib diisi." });
    }

    // Cek panjang password
    if (password.length < 6 || password.length > 8) {
      console.warn("⚠️ Password tidak memenuhi panjang minimum/maksimum.");
      return res.status(400).json({ message: "Password harus 6-8 karakter." });
    }

    if (password !== confirmPassword) {
      console.warn("⚠️ Password & Konfirmasi tidak sama.");
      return res
        .status(400)
        .json({ message: "Password dan konfirmasi tidak sama." });
    }

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      console.warn("⚠️ Email sudah terdaftar:", email);
      return res.status(400).json({ message: "Email sudah terdaftar." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
      photo: req.file?.filename || null,
    });

    console.log("✅ User berhasil dibuat:", user.id);

    return res.status(201).json({
      message: "Registrasi berhasil",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        photo: user.photo,
      },
    });
  } catch (err) {
    console.error("❌ REGISTER ERROR:", err);
    return res
      .status(500)
      .json({ message: "Terjadi kesalahan saat registrasi." });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    console.log("🔷 [LOGIN] req.body:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      console.warn("⚠️ Email/Password kosong:", req.body);
      return res.status(400).json({ message: "Email & password wajib diisi." });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.warn("⚠️ Email tidak ditemukan:", email);
      return res.status(404).json({ message: "Email tidak ditemukan." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.warn("⚠️ Password salah.");
      return res.status(401).json({ message: "Password salah." });
    }

    const secret = process.env.JWT_SECRET || "default_secret_key";
    if (secret === "default_secret_key") {
      console.warn("⚠️ JWT_SECRET tidak diset. Gunakan env untuk produksi!");
    }

    const token = jwt.sign({ id: user.id, role: user.role }, secret, {
      expiresIn: "1h",
    });

    console.log("✅ Login sukses:", user.id);

    return res.json({
      message: "Login berhasil",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        photo: user.photo,
      },
    });
  } catch (err) {
    console.error("❌ LOGIN ERROR:", err);
    return res.status(500).json({ message: "Terjadi kesalahan saat login." });
  }
};

// GET ME
exports.getMe = async (req, res) => {
  try {
    console.log("🔷 [GET ME] req.user:", req.user);

    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      console.warn("⚠️ User tidak ditemukan:", req.user.id);
      return res.status(404).json({ message: "User tidak ditemukan." });
    }

    return res.json({ user });
  } catch (err) {
    console.error("❌ GET ME ERROR:", err);
    return res
      .status(500)
      .json({ message: "Terjadi kesalahan saat mengambil data user." });
  }
};

// LOGOUT
exports.logout = (req, res) => {
  console.log("✅ Logout dipanggil");
  return res.json({ message: "Logout berhasil" });
};
