const express = require("express");
const router = express.Router();

//routing

router.get("/", (req, res) => {
    res.send('Get Presensi');
})

router.get("/:id", (req, res) => {
    res.send('Presensi By ID' + req.params.id);
});

router.post("/", (req, res) => {
    res.send('post Presensi');
});

router.post("/:id", (req, res) => {
    res.send('post Presensi By ID' + req.params.id);
});

router.put("/", (req, res) => {
    res.send('put Presensi');
});

router.put("/:id", (req, res) => {
    res.send('put Presensi By ID' + req.params.id);
});

router.patch("/", (req, res) => {
    res.send('patch Presensi'); 
});

router.patch("/:id", (req, res) => {        
    res.send('patch Presensi By ID' + req.params.id);
});

router.delete("/", (req, res) => {
    res.send('delete Presensi');
});

router.delete("/:id", (req, res) => {
    res.send('delete Presensi By ID' + req.params.id);
});

module.exports = router;