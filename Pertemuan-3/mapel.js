const express = require("express");
const router = express.Router();

//routing

router.get("/", (req, res) => {
    res.send('Get Mapel');
})

router.get("/:id", (req, res) => {
    res.send('Get Mapel By ID' + req.params.id);
});

router.post("/", (req, res) => {
    res.send('post Mapel');
});

router.post("/:id", (req, res) => {
    res.send('post Mapel By ID' + req.params.id);
});

router.put("/", (req, res) => {
    res.send('put Mapel');
});

router.put("/:id", (req, res) => {
    res.send('put Mapel By ID' + req.params.id);
});

router.patch("/", (req, res) => {
    res.send('patch Mapel'); 
});

router.patch("/:id", (req, res) => {        
    res.send('patch Mapel By ID' + req.params.id);
});

router.delete("/", (req, res) => {
    res.send('delete Mapel');
});

router.delete("/:id", (req, res) => {
    res.send('delete Mapel By ID' + req.params.id);
});

module.exports = router;