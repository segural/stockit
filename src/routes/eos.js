// Requiero los módulos de node que se van ausar:
const express = require("express");
const router = express.Router();
const path = require("path");

// Requiero el controller al que apuntan las rutas que defino maás abajo:
const eosController = require("../controllers/eosController.js");

// Defino las rutas, es decir que controlador y cuál de sus métodos es el que va a manejar el requerimiento
router.get("/hardware", eosController.hardwareList);
router.get("/cellphone", eosController.cellphoneList);

module.exports = router;
