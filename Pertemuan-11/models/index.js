const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("akademik", "root", "root123", {
  host: "localhost",
  dialect: "mysql",
});

const Mahasiswa = require("./mahasiswa")(sequelize);
const Matakuliah = require("./matakuliah")(sequelize);

const RPS = sequelize.define("rps", {}, { timestamps: false }); // bisa sesuaikan

Mahasiswa.belongsToMany(Matakuliah, { through: RPS });
Matakuliah.belongsToMany(Mahasiswa, { through: RPS });

module.exports = { sequelize, Mahasiswa, Matakuliah, RPS };
