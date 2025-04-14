const express = require('express');
const router = express.Router();
const userController = require('./userController'); // ← path diperbaiki

// Route GET semua user
router.get('/', userController.getAllUsers);

// Route GET user berdasarkan ID
router.get('/:id', userController.getUserById);

// Route POST tambah user
router.post('/', userController.createUser);

// Route PUT update user
router.put('/:id', userController.updateUser);

// Route DELETE hapus user
router.delete('/:id', userController.deleteUser);

module.exports = router;
