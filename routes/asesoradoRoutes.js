const express = require("express");
const router = express.Router();
const asesoradoController = require("../controllers/asesoradoController");
const verificarToken = require("../middlewares/auth");

// POST /api/asesorados
router.post("/registrar", verificarToken, asesoradoController.registrarAsesorado);

// GET /api/asesorados/
router.get("/", verificarToken, asesoradoController.obtenerAsesorados);

module.exports = router;
