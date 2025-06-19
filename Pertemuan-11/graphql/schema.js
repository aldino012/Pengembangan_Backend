const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

const { Mahasiswa, Matakuliah, RPS } = require("../models"); // Ambil dari models/index.js

// Type: Matakuliah
const MatakuliahType = new GraphQLObjectType({
  name: "Matakuliah",
  fields: () => ({
    id: { type: GraphQLInt },
    nama_matkul: { type: GraphQLString },
    kode_matkul: { type: GraphQLString },
  }),
});

// Type: Mahasiswa
const MahasiswaType = new GraphQLObjectType({
  name: "Mahasiswa",
  fields: () => ({
    id: { type: GraphQLInt },
    nim: { type: GraphQLString },
    nama: { type: GraphQLString },
    matakuliahs: {
      type: new GraphQLList(MatakuliahType),
      resolve(parent) {
        return parent.getMatakuliahs();
      },
    },
  }),
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    mahasiswa: {
      type: new GraphQLList(MahasiswaType),
      resolve() {
        return Mahasiswa.findAll();
      },
    },
    matakuliah: {
      type: new GraphQLList(MatakuliahType),
      resolve() {
        return Matakuliah.findAll();
      },
    },
    rps: {
      type: GraphQLString,
      args: {
        mahasiswaId: { type: new GraphQLNonNull(GraphQLInt) },
        matakuliahId: { type: new GraphQLNonNull(GraphQLInt) },
      },
      async resolve(_, { mahasiswaId, matakuliahId }) {
        const rps = await RPS.findOne({
          where: { mahasiswaId, matakuliahId },
        });
        return rps ? rps.rps : null;
      },
    },
  },
});

// Mutation
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addMahasiswa: {
      type: MahasiswaType,
      args: {
        nama: { type: GraphQLNonNull(GraphQLString) },
        nim: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(_, args) {
        return Mahasiswa.create(args);
      },
    },

    addMatakuliah: {
      type: MatakuliahType,
      args: {
        nama_matkul: { type: GraphQLNonNull(GraphQLString) },
        kode_matkul: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(_, args) {
        return Matakuliah.create(args);
      },
    },

    editMatakuliah: {
      type: MatakuliahType,
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
        nama_matkul: { type: GraphQLNonNull(GraphQLString) },
        kode_matkul: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(_, args) {
        await Matakuliah.update(
          {
            nama_matkul: args.nama_matkul,
            kode_matkul: args.kode_matkul,
          },
          { where: { id: args.id } }
        );
        return Matakuliah.findByPk(args.id);
      },
    },

    deleteMatakuliah: {
      type: GraphQLString,
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
      },
      async resolve(_, { id }) {
        const matkul = await Matakuliah.findByPk(id);
        if (!matkul) throw new Error("Matakuliah not found");
        await matkul.destroy();
        return "Matakuliah deleted";
      },
    },

    addRps: {
      type: GraphQLString,
      args: {
        mahasiswaId: { type: GraphQLNonNull(GraphQLInt) },
        matakuliahId: { type: GraphQLNonNull(GraphQLInt) },
        rps: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(_, { mahasiswaId, matakuliahId, rps }) {
        const mahasiswa = await Mahasiswa.findByPk(mahasiswaId);
        const matakuliah = await Matakuliah.findByPk(matakuliahId);
        if (!mahasiswa) throw new Error("Mahasiswa not found");
        if (!matakuliah) throw new Error("Matakuliah not found");

        const [rpsRecord] = await RPS.upsert({
          mahasiswaId,
          matakuliahId,
          rps,
        });
        return rpsRecord.rps || rps;
      },
    },

    editRps: {
      type: GraphQLString,
      args: {
        mahasiswaId: { type: GraphQLNonNull(GraphQLInt) },
        matakuliahId: { type: GraphQLNonNull(GraphQLInt) },
        rps: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(_, { mahasiswaId, matakuliahId, rps }) {
        const rpsRecord = await RPS.findOne({
          where: { mahasiswaId, matakuliahId },
        });
        if (!rpsRecord) throw new Error("RPS not found");
        rpsRecord.rps = rps;
        await rpsRecord.save();
        return rps;
      },
    },

    deleteRps: {
      type: GraphQLString,
      args: {
        mahasiswaId: { type: GraphQLNonNull(GraphQLInt) },
        matakuliahId: { type: GraphQLNonNull(GraphQLInt) },
      },
      async resolve(_, { mahasiswaId, matakuliahId }) {
        const rpsRecord = await RPS.findOne({
          where: { mahasiswaId, matakuliahId },
        });
        if (!rpsRecord) throw new Error("RPS not found");
        await rpsRecord.destroy();
        return "RPS deleted successfully";
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
