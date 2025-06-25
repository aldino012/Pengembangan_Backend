const express = require("express");
const sequelize = require("../non-persistence/config/db");
const redisClient = require ("../presistence/config/redis");
const routes = require("./routes/AllRoutes");


const app = express();
app.use(express.json());
app.use("/api", routes);

const PORT = process.env.PORT || 3000;

// Mulai koneksi Redis dulu
redisClient
  .connect()
  .then(() => {
    console.log("Redis connected");

    // Lanjut koneksi ke database
    return sequelize.authenticate();
  })
  .then(() => {
    console.log("Database connected");
    return sequelize.sync(); // Buat tabel dari model
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Startup error:", err);
  });
