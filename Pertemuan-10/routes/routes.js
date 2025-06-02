const express = require("express");
const router = express.Router();
const mahasiswaController = require("../controller/siswa");

router.get("/", mahasiswaController.get);
router.get("/:id", mahasiswaController.get);
router.post("/", mahasiswaController.post);
router.put("/:id", mahasiswaController.put);
router.delete("/:id", mahasiswaController.delete);

module.exports = router;
