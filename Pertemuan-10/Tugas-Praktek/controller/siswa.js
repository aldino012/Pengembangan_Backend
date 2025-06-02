const express = require("express");
const router = express.Router();
const Siswa = require("../models/siswa");

// Get all siswa
router.get("/", async (req, res) => {
  try {
    const siswa = await Siswa.findAll();
    res.json(siswa);
  } catch (error) {
    res.status(500).json({ message: "Error fetching siswa", error });
  }
});

// Get siswa by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const siswa = await Siswa.findByPk(id);
    if (siswa) {
      res.json(siswa);
    } else {
      res.status(404).json({ message: "Siswa not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching siswa", error });
  }
});

// Create new siswa
router.post("/", async (req, res) => {
  const { nama, nisn, alamat } = req.body;
  try {
    const siswa = await Siswa.create({ nama, nisn, alamat });
    res.status(201).json(siswa);
  } catch (error) {
    res.status(400).json({ message: "Error creating siswa", error });
  }
});

// Update siswa by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nama, nisn, alamat } = req.body;
  try {
    const siswa = await Siswa.findByPk(id);
    if (siswa) {
      siswa.nama = nama;
      siswa.nisn = nisn;
      siswa.alamat = alamat;
      await siswa.save();
      res.json(siswa);
    } else {
      res.status(404).json({ message: "Siswa not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error updating siswa", error });
  }
});

// Delete siswa by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Siswa.destroy({ where: { id } });
    if (deleted) {
      res.json({ message: "Siswa deleted" });
    } else {
      res.status(404).json({ message: "Siswa not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
