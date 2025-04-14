const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.json');

// Fungsi untuk membaca data dari JSON
const readData = () => {
    const data = fs.readFileSync(dataPath);
    return JSON.parse(data);
};

// Fungsi untuk menulis data ke JSON
const writeData = (data) => {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// GET: Ambil semua user
exports.getAllBarang = (req, res) => {
    const Barang = readData();
    res.json(Barang);
};

// GET: Ambil user berdasarkan ID
exports.getBarangById = (req, res) => {
    const Barang = readData();
    const barang = Barang.find(u => u.id == req.params.id);

    if (!barang) {
        return res.status(404).json({ message: 'barang not found' });
    }

    res.json(barang);
};

// POST: Tambah user baru
exports.createBarang = (req, res) => {
    const Barang = readData();
    const Newbarang = { id: Barang.length + 1, ...req.body };
    Barang.push(Newbarang);
    writeData(Barang);
    res.status(201).json({ message: 'User created successfully', Newbarang });
};

// PUT: Update user
exports.updateBarang = (req, res) => {
    let Barang = readData();
    const index = Barang.findIndex(u => u.id == req.params.id);

    if (index === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    Barang[index] = { ...Barang[index], ...req.body };
    writeData(Barang);
    res.json({ message: 'User updated successfully', barang: Barang[index] });
};

// DELETE: Hapus user
exports.deleteBarang = (req, res) => {
    let Barang = readData();
    const newUserList = Barang.filter(u => u.id != req.params.id);

    if (Barang.length === newUserList.length) {
        return res.status(404).json({ message: 'User not found' });
    }

    writeData(newUserList);
    res.json({ message: 'User successfully deleted' });
};
