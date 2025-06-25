const express = require('express');
const router = express.Router();
const JurusanC = require('../controllers/jurusanC');
const MahasiswaC = require('../controllers/mahasiswaC');

router.get("/jurusan", JurusanC.getAllJurusan);
router.post('/jurusan', JurusanC.createJurusan);
router.put('/jurusan/:id', JurusanC.updateJurusan);
router.delete('/jurusan/:id', JurusanC.deleteJurusan);

router.get('/mahasiswa', MahasiswaC.getAllMahasiswa);
router.get('/mahasiswa/:id', MahasiswaC.getMahasiswaById);
router.post('/mahasiswa', MahasiswaC.createMahasiswa);
router.put('/mahasiswa/:id', MahasiswaC.updateMahasiswa);
router.delete('/mahasiswa/:id', MahasiswaC.deleteMahasiswa);

module.exports = router;
