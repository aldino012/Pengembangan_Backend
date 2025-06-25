const Jurusan = require("../models/jurusanM");
const redisClient = require("../config/redis"); // Pastikan kamu pakai client dari satu tempat

// GET semua jurusan, pakai cache
exports.getAllJurusan = async (req, res) => {
  try {
    const cached = await redisClient.get("all_jurusan");

    if (cached) {
      console.log("🟢 Cache HIT");
      return res.status(200).json(JSON.parse(cached));
    }

    console.log("🔴 Cache MISS");
    const data = await Jurusan.findAll();

    await redisClient.set("all_jurusan", JSON.stringify(data), { EX: 3600 }); // TTL: 1 jam

    res.status(200).json(data);
  } catch (error) {
    console.error("Error getAllJurusan:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// CREATE jurusan dan hapus cache
exports.createJurusan = async (req, res) => {
  try {
    const { kode, nama_jurusan } = req.body;
    const jurusan = await Jurusan.create({ kode, nama_jurusan });

    await redisClient.del("all_jurusan"); // hapus cache setelah create
    res.status(201).json(jurusan);
  } catch (error) {
    console.error("Error createJurusan:", error);
    res.status(500).json({ message: "Failed to create jurusan" });
  }
};

// UPDATE jurusan dan hapus cache
exports.updateJurusan = async (req, res) => {
  try {
    const { id } = req.params;
    const { kode, nama_jurusan } = req.body;

    const jurusan = await Jurusan.findByPk(id);
    if (!jurusan) return res.status(404).json({ message: "Jurusan not found" });

    await jurusan.update({ kode, nama_jurusan });

    await redisClient.del("all_jurusan"); // hapus cache setelah update
    res.status(200).json(jurusan);
  } catch (error) {
    console.error("Error updateJurusan:", error);
    res.status(500).json({ message: "Failed to update jurusan" });
  }
};

// DELETE jurusan dan hapus cache
exports.deleteJurusan = async (req, res) => {
  try {
    const { id } = req.params;

    const jurusan = await Jurusan.findByPk(id);
    if (!jurusan) return res.status(404).json({ message: "Jurusan not found" });

    await jurusan.destroy();

    await redisClient.del("all_jurusan"); // hapus cache setelah delete
    res.status(200).json({ message: "Jurusan deleted" });
  } catch (error) {
    console.error("Error deleteJurusan:", error);
    res.status(500).json({ message: "Failed to delete jurusan" });
  }
};
