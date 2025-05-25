const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const mahasiswaroutes = require('../routes/mahasiswaR'); // fix path dan nama

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/mahasiswa', mahasiswaroutes);


sequelize.sync()
    .then(() => {
        console.log('Database connected and synchronized.');
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });
