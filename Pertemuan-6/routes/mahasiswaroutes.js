const express = require('express');
const router = express.Router();
const userController = require('../controller/mahasiswacontroller'); // ← path diperbaiki

// Route GET semua user
router.get('/', userController.getMahasiswa);

// Route GET user berdasarkan ID
router.get('/:id', userController.getMahasiswaById);

// Route POST tambah user
router.post('/', userController.createMahasiswa);

// Route PUT update user
router.put('/:id', userController.updateMahasiswa);

// Route DELETE hapus user
router.delete('/:id', userController.deleteMahasiswa);

module.exports = router;
