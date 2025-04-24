const db  = require('../configs/db.js');

exports.getMahasiswa = (req, res) => {
    db.query('SELECT * FROM mahasiswa', (err, results) => {
        if(err) throw err;
        res.json(results);
    });
};

exports.getMahasiswaById = (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM mahasiswa WHERE id = ?', [id], (err, results) => {
        if(err) throw err;
        res.json(results);
    });
};

exports.createMahasiswa = (req, res) => {
    const {nama, nim, jurusan} = req.body;
    db.query('INSERT INTO mahasiswa (nama, nim, jurusan) VALUES (?, ?, ?)', [nama, nim, jurusan], (err, results) => {
        if(err) throw err;
        res.json({id: results.insertId, nama, nim, jurusan});
    });
};


exports.updateMahasiswa = (req, res) => {
    const {nama, nim, jurusan} = req.body;
    const id = req.params.id;
    db.query('UPDATE mahasiswa SET nama = ?, nim = ?, jurusan = ? WHERE id = ?', [nama, nim, jurusan, id], (err, results) => {
        if(err) throw err;
        res.json({id, nama, nim, jurusan});
    });
};

exports.deleteMahasiswa = (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM mahasiswa WHERE id = ?', [id], (err, results) => {
        if(err) throw err;
        res.json({message: 'Mahasiswa deleted successfully'});
    });
}
