const express = require("express");
const router = express.Router();

//routing

router.get("/", (req, res) => {
    res.send('Get Nilai');
})

router.get("/:id", (req, res) => {
    res.send('Get Nilai By ID' + req.params.id);
});

router.post("/", (req, res) => {
    res.send('post Nilai');
});

router.post("/:id", (req, res) => {
    res.send('post Nilai By ID' + req.params.id);
});

router.put("/", (req, res) => {
    res.send('put Nilai');
});

router.put("/:id", (req, res) => {
    res.send('put Nila By ID' + req.params.id);
});

router.patch("/", (req, res) => {
    res.send('patch Nilai'); 
});

router.patch("/:id", (req, res) => {        
    res.send('patch Nilai By ID' + req.params.id);
});

router.delete("/", (req, res) => {
    res.send('delete Nilai');
});

router.delete("/:id", (req, res) => {
    res.send('delete Nilai By ID' + req.params.id);
});

module.exports = router;