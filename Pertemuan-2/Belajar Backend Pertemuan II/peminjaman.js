const express = require("express");
const router = express.Router();

//routing

router.get("/", (req, res) => {
    res.send('peminjaman');
})

router.get("/:id", (req, res) => {
    res.send('peminjaman' + req.params.id);
});

router.post("/", (req, res) => {
    res.send('post peminjaman');
});

router.post("/:id", (req, res) => {
    res.send('post peminjaman' + req.params.id);
});

router.put("/", (req, res) => {
    res.send('put peminjaman');
});

router.put("/:id", (req, res) => {
    res.send('put peminjaman' + req.params.id);
});

router.patch("/", (req, res) => {
    res.send('patch peminjaman'); 
});

router.patch("/:id", (req, res) => {        
    res.send('patch peminjaman' + req.params.id);
});

router.delete("/", (req, res) => {
    res.send('delete peminjaman');
});

router.delete("/:id", (req, res) => {
    res.send('delete peminjaman' + req.params.id);
});

module.exports = router;