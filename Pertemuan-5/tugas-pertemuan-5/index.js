const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const userRouter = require('./BarangRoot'); // fix path dan nama

const app = express();
const port = 30001;

app.use(cors());
app.use(bodyParser.json());
app.use('/Barang', userRouter);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
