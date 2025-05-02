const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Barangroute = require('./routes/BarangR');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/Barang', Barangroute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});