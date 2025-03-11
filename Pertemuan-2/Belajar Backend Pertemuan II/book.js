const express = require("express");
const router = express.Router();

//routing

router.get("/", (req, res) => {
    res.send('book');
})

router.get("/:id", (req, res) => {
    res.send('book' + req.params.id);
});

router.post("/", (req, res) => {
    res.send('post book');
});

router.post("/:id", (req, res) => {
    res.send('post book' + req.params.id);
});

router.put("/", (req, res) => {
    res.send('put book');
});

router.put("/:id", (req, res) => {
    res.send('put book' + req.params.id);
});

router.patch("/", (req, res) => {
    res.send('patch book'); 
});

router.patch("/:id", (req, res) => {        
    res.send('patch book' + req.params.id);
});

router.delete("/", (req, res) => {
    res.send('delete book');
});

router.delete("/:id", (req, res) => {
    res.send('delete book' + req.params.id);
});

module.exports = router;