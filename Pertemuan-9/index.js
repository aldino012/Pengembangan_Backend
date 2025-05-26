const express = require('express');
const cookieParser = require('cookie-parser');
const helmet  = require('helmet');
const {sequelize} = require('./config/db.js');
const authRoutes = require('./routes/auth.js');
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(helmet());

app.use('/api/auth', authRoutes);

sequelize.sync().then(() =>  console.log('Database synced'))
.catch(err => console.error('Error syncing database:', err));

app.listen(3000, () => {
    console.log('Server started on port 3000');
});