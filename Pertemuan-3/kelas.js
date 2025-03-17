const express = require("express");
const router = express.Router();
// nodemon index.js
//routing

router.get("/", (req, res) => {
    res.send('kelas');
})

router.get("/:id", (req, res) => {
    res.send(' Get kelas By ID ' + req.params.id);
});

router.post("/", (req, res) => {
    res.send('post kelas');
});

router.post("/:id", (req, res) => {
    res.send('post kelas By ID' + req.params.id);
});

router.put("/", (req, res) => {
    res.send('put kelas');
});

router.put("/:id", (req, res) => {
    res.send('put kelas By ID' + req.params.id);
});

router.patch("/", (req, res) => {
    res.send('patch kelas'); 
});

router.patch("/:id", (req, res) => {        
    res.send('patch kelas By ID' + req.params.id);
});

router.delete("/", (req, res) => {
    res.send('delete kelas');
});

router.delete("/:id", (req, res) => {
    res.send('delete kelas By ID' + req.params.id);
});

module.exports = router;