const express = require("express");
const router = express.Router();

//routing

router.get("/", (req, res) => {
    res.send('ini get halaman guru');
})

router.get("/:id", (req, res) => {
    res.send('ini halaman Get guru By ID' + req.params.id);
});

router.post("/", (req, res) => {
    res.send('ini halaman post guru');
});

router.post("/:id", (req, res) => {
    res.send('ini halaman post guru By ID' + req.params.id);
});

router.put("/", (req, res) => {
    res.send('ini halaman put guru');
});

router.put("/:id", (req, res) => {
    res.send('ini halaman put guru By ID' + req.params.id);
});

router.patch("/", (req, res) => {
    res.send('ini halaman patch guru'); 
});

router.patch("/:id", (req, res) => {        
    res.send('ini halaman patch guru By ID' + req.params.id);
});

router.delete("/", (req, res) => {
    res.send('ini halaman delete guru ');
});

router.delete("/:id", (req, res) => {
    res.send('ini halaman delete guru By ID' + req.params.id);
});

module.exports = router;