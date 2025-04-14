const express = require('express');
const router = express.Router();
const BarangController = require('./BarangController');

// Route GET semua barang
router.get('/', BarangController.getAllBarang);

// Route GET barang berdasarkan ID
router.get('/:id', BarangController.getBarangById);

// Route POST tambah barang
router.post('/', BarangController.createBarang);

// Route PUT update barang
router.put('/:id', BarangController.updateBarang);

// Route DELETE hapus barang
router.delete('/:id', BarangController.deleteBarang);

module.exports = router;
