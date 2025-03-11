const express = require("express");
const router = express.Router();

//routing

router.get("/", (req, res) => {
    res.send('user');
})

router.get("/:id", (req, res) => {
    res.send('user' + req.params.id);
});

router.post("/", (req, res) => {
    res.send('post user');
});

router.post("/:id", (req, res) => {
    res.send('post user' + req.params.id);
});

router.put("/", (req, res) => {
    res.send('put user');
});

router.put("/:id", (req, res) => {
    res.send('put user' + req.params.id);
});

router.patch("/", (req, res) => {
    res.send('patch user'); 
});

router.patch("/:id", (req, res) => {        
    res.send('patch user' + req.params.id);
});

router.delete("/", (req, res) => {
    res.send('delete user');
});

router.delete("/:id", (req, res) => {
    res.send('delete user' + req.params.id);
});

module.exports = router;