const express = require('express');
const router = express.Router();
const {Mahasiswa,Matakuliah } = require('../models');
const req = require('express/lib/request');

router.get('/',async(req,res)=>{
    const data = await Mahasiswa.findAll({
        include: Matakuliah  
    })
});

router.get('get/:id',async(req,res)=>{
    const mahasiswa =  await Mahasiswa.findByPk(req.params.id,{
        include: Matakuliah
    })

    if (!mahasiswa) {
        return res.status(404).json({message:'mahasiswa not found'})   
    }
    res.json(mahasiswa)
});

router.post('/',async(req,res)=>{
    const mahasiswa = await Mahasiswa.create(req.body);
    res.json(mahasiswa)
});

router .put('/:id',async(req,res)=>{
    const mahasiswa = await Mahasiswa.findByPk(req.params.id);
    if (!mahasiswa) {
        return res.status(404).json({message:'mahasiswa not found'})
        
    }
    await mahasiswa.update(req.body);
    res.json(mahasiswa)
});


router.delete('/:id',async(req,res)=>{
    const mahasiswa = await Mahasiswa.findByPk(req.params.id);
    if (!mahasiswa) {
        return res.status(404).json({message:'mahasiswa not found'})
        
    }
    await mahasiswa.destroy();
    res.json({message:'mahasiswa deleted'})
});

router.put("/:id/matakuliah/:matakuliahId", async (req, res) => {
  const mahasiswa = await Mahasiswa.findByPk(req.params.id);
  const matakuliah = await Matakuliah.findByPk(req.params.matakuliahId);
  if (!mahasiswa || !matakuliah) {
    return res
      .status(404)
      .json({ message: "Mahasiswa or Matakuliah not found" });
  }
  await mahasiswa.setMatakuliah(matakuliah);
  res.json({ message: "RPS updated" });
});
router.delete("/:id/matakuliah/:matakuliahId", async (req, res) => {
  const mahasiswa = await Mahasiswa.findByPk(req.params.id);
  if (!mahasiswa) {
    return res.status(404).json({ message: "Mahasiswa not found" });
  }
  await mahasiswa.removeMatakuliah(req.params.matakuliahId);
  res.json({ message: "RPS deleted" });
});
module.exports = router;
