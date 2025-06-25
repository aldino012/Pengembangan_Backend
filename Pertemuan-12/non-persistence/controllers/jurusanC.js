const Jurusan = require("../models/jurusanM");

exports.getAllJurusan = async (req, res) => {
  try {
    const data = await Jurusan.findAll();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error getAllJurusan:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.createJurusan = async (req, res) => {
  try {
    const { kode, nama_jurusan } = req.body;
    const jurusan = await Jurusan.create({ kode, nama_jurusan });
    res.status(201).json(jurusan);
  } catch (error) {
    console.error("Error createJurusan:", error);
    res.status(500).json({ message: "Failed to create jurusan" });
  }
};

exports.updateJurusan = async (req, res) => {
  try {
    const { id } = req.params;
    const { kode, nama_jurusan } = req.body;
    const jurusan = await Jurusan.findByPk(id);
    if (!jurusan) return res.status(404).json({ message: "Jurusan not found" });

    await jurusan.update({ kode, nama_jurusan });
    res.status(200).json(jurusan);
  } catch (error) {
    console.error("Error updateJurusan:", error);
    res.status(500).json({ message: "Failed to update jurusan" });
  }
};

exports.deleteJurusan = async (req, res) => {
  try {
    const { id } = req.params;
    const jurusan = await Jurusan.findByPk(id);
    if (!jurusan) return res.status(404).json({ message: "Jurusan not found" });

    await jurusan.destroy();
    res.status(200).json({ message: "Jurusan deleted" });
  } catch (error) {
    console.error("Error deleteJurusan:", error);
    res.status(500).json({ message: "Failed to delete jurusan" });
  }
};
