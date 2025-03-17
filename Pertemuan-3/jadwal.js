const express = require("express");
const router = express.Router();

//routing

router.get("/", (req, res) => {
    res.send('Get Jadwal');
})

router.get("/:id", (req, res) => {
    res.send('Jadwal Get By ID' + req.params.id);
});

router.post("/", (req, res) => {
    res.send('Post Jadwal');
});

router.post("/:id", (req, res) => {
    res.send('Post Jadwal By ID' + req.params.id);
});

router.put("/", (req, res) => {
    res.send('Put Jadwal');
});

router.put("/:id", (req, res) => {
    res.send('Put Jadwal By ID' + req.params.id);
});

router.patch("/", (req, res) => {
    res.send('Patch Jadwal'); 
});

router.patch("/:id", (req, res) => {        
    res.send('Patch Jadwal By ID' + req.params.id);
});

router.delete("/", (req, res) => {
    res.send('Delete Jadwal');
});

router.delete("/:id", (req, res) => {
    res.send('Delete Jadwal By ID' + req.params.id);
});

module.exports = router;