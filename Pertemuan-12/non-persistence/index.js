const express = require("express");
const sequelize = require("../non-persistence/config/db"); // FIXED
const routes = require("../non-persistence/routes/AllRoutes");

const app = express();
app.use(express.json());
app.use("/api", routes);

const PORT = process.env.PORT || 3000;

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected");
    return sequelize.sync(); // sinkronisasi model
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
