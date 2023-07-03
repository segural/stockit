// Requiero los módulos de node que se van ausar:
const express = require("express");
const router = express.Router();
const path = require("path");

// Middleware que sólo permite acceder a ciertas rutas si NO se está loggeado:
const guestMiddleware = require("../middlewares/guestMiddleware");

// Middleware que sólo permite acceder a ciertas rutas si se está loggeado:
const authMiddleware = require("../middlewares/authMiddleware");

// Requiero el controller al que apuntan las rutas que defino maás abajo:
const crmController = require("../controllers/crmController.js");

// Defino las rutas, es decir que controlador y cuál de sus métodos es el que va a manejar el requerimiento
router.get("/", guestMiddleware, crmController.login);
router.get("/index", authMiddleware, crmController.index);

router.get("/clients/:filter", authMiddleware, crmController.clientsList);
router.put("/clients/:id", authMiddleware, crmController.clientUpdate);

module.exports = router;
