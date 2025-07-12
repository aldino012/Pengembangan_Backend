const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/:filename", (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, "..", "uploads", filename);

  res.download(filepath, filename, (err) => {
    if (err) {
      console.error("Download error:", err);
      res.status(404).send("File tidak ditemukan");
    }
  });
});

module.exports = router;
