const Mahasiswa = require('../models/mahasiswa');

// GET semua atau satu Mahasiswa
const get = async (req, res) => {
    if (req.params.id) {
        const mahasiswa = await Mahasiswa.findByPk(req.params.id);
        if (mahasiswa) {
            res.json(mahasiswa);
        } else {
            res.status(404).json({ message: 'Mahasiswa not found' });
        }
    } else {
        const mahasiswa = await Mahasiswa.findAll();
        res.json(mahasiswa);
    }
};

// POST - buat Mahasiswa baru
const post = async (req, res) => {
    const { nama, nim, jurusan } = req.body;
    try {
        const mahasiswa = await Mahasiswa.create({ nama, nim, jurusan });
        res.status(201).json(mahasiswa);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// PUT - update Mahasiswa berdasarkan ID
const put = async (req, res) => {
    const { id } = req.params;
    const { nama, nim, jurusan } = req.body;
    try {
        const updated = await Mahasiswa.update({ nama, nim, jurusan }, { where: { id } });
        res.json({ message: 'Mahasiswa updated successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// DELETE - hapus Mahasiswa berdasarkan ID
const del = async (req, res) => {
    const mahasiswa = await Mahasiswa.findByPk(req.params.id);
    if (mahasiswa) {
        await mahasiswa.destroy();
        res.json({ message: 'Mahasiswa deleted successfully' });
    } else {
        res.status(404).json({ message: 'Mahasiswa not found' });
    }
};

module.exports = { get, post, put, delete: del };
