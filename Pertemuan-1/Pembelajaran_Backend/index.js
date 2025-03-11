const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('ini get data!');
});

app.post('/', (req, res) => {
    res.send('ini post data');
});


app.put('/', (req, res) => {
    res.send('ini edit data');
});

app.delete('/', (req, res) => {
    res.send('ini hapus  data bro');
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

app.listen