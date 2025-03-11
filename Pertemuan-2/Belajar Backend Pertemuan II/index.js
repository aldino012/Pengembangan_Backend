const express = require('express');
const app = express();
const port = 3000;
const user = require('./user');
const book = require('./book');
const peminjaman = require('./peminjaman');

//routing halaman utama
app.use('/peminjaman', peminjaman);
app.use('/user', user);
app.use('/book', book);


app.get('/', (req, res) => {
    res.send('kirim data');
});

app.put('/', (req, res) => {
    res.send('update puth data');
});

app.patch('/', (req, res) => {
    res.send('update patch data');
});

app.delete('/', (req, res) => {
    res.send('delete data');
});

app.listen(port, () => {
    console.log(`Testing Aplikasi ${port}`);
});


