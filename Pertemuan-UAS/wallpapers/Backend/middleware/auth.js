const jwt = require("jsonwebtoken");

// hanya untuk user yang sudah login
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res
      .status(401)
      .json({ message: "Akses ditolak. Token tidak ditemukan." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    console.error(err);
    res.status(403).json({ message: "Token tidak valid." });
  }
};

// hanya untuk admin
exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Akses hanya untuk admin." });
  }
  next();
};

// contoh kalau nanti mau buat uploader role juga
exports.isUploader = (req, res, next) => {
  if (req.user.role !== "uploader") {
    return res.status(403).json({ message: "Akses hanya untuk uploader." });
  }
  next();
};
