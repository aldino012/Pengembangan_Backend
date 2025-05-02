const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/data.json');

const readBarangData = () => {
    const barangData = fs.readFileSync(dataPath);
    return JSON.parse(barangData);
};

const writeBarangData = (data) => {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

exports.getAllBarang = (req, res) => {
    const barangData = readBarangData();
    res.status(200).json(barangData);
};

exports.getBarangById = (req, res) => {
    const barangData = readBarangData();
    const id = parseInt(req.params.id, 10);
    const barang = barangData.find(item => item.id === id);

    if (!barang) {
        return res.status(404).json({ message: 'Barang not found' });
    }

    res.status(200).json(barang);
};

exports.createBarang = (req, res) => {
    const barangData = readBarangData();
    const newBarang = req.body;
    barangData.push(newBarang);
    writeBarangData(barangData);
    res.status(201).json({ message: 'Barang created successfully', barang: newBarang });
};

exports.updateBarang = (req, res) => {
    const barangData = readBarangData();
    const id = parseInt(req.params.id, 10);
    const index = barangData.findIndex(item => item.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Barang not found' });
    }

    const updatedBarang = { ...barangData[index], ...req.body };
    barangData[index] = updatedBarang;
    writeBarangData(barangData);
    res.status(200).json({ message: 'Barang updated successfully', barang: updatedBarang });
};

exports.deleteBarang = (req, res) => {
    const barangData = readBarangData();
    const id = parseInt(req.params.id, 10);
    const index = barangData.findIndex(item => item.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Barang not found' });
    }

    barangData.splice(index, 1);
    writeBarangData(barangData);
    res.status(200).json({ message: 'Barang deleted successfully' });
};