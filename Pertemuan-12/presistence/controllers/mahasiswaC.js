const Mahasiswa = require("../models/mahasiswaM");

exports.getAllMahasiswa = async (req, res) => {
  try {
    const data = await Mahasiswa.findAll();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error getAllMahasiswa:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getMahasiswaById = async (req, res) => {
  try {
    const { id } = req.params;
    const mahasiswa = await Mahasiswa.findByPk(id);
    if (!mahasiswa) return res.status(404).json({ message: "Not found" });
    res.status(200).json(mahasiswa);
  } catch (error) {
    console.error("Error getMahasiswaById:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.createMahasiswa = async (req, res) => {
  try {
    const { nama, nim, jurusan } = req.body;
    const mahasiswa = await Mahasiswa.create({ nama, nim, jurusan });
    res.status(201).json(mahasiswa);
  } catch (error) {
    console.error("Error createMahasiswa:", error);
    res.status(500).json({ message: "Failed to create mahasiswa" });
  }
};

exports.updateMahasiswa = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, nim, jurusan } = req.body;
    const mahasiswa = await Mahasiswa.findByPk(id);
    if (!mahasiswa) return res.status(404).json({ message: "Not found" });

    await mahasiswa.update({ nama, nim, jurusan });
    res.status(200).json(mahasiswa);
  } catch (error) {
    console.error("Error updateMahasiswa:", error);
    res.status(500).json({ message: "Failed to update mahasiswa" });
  }
};

exports.deleteMahasiswa = async (req, res) => {
  try {
    const { id } = req.params;
    const mahasiswa = await Mahasiswa.findByPk(id);
    if (!mahasiswa) return res.status(404).json({ message: "Not found" });

    await mahasiswa.destroy();
    res.status(200).json({ message: "Mahasiswa deleted" });
  } catch (error) {
    console.error("Error deleteMahasiswa:", error);
    res.status(500).json({ message: "Failed to delete mahasiswa" });
  }
};
