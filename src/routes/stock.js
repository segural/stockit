// Requiero los módulos de node que se van ausar:
const express = require("express");
const router = express.Router();
const path = require("path");

// Requiero el controller al que apuntan las rutas que defino maás abajo:
const stockController = require("../controllers/stockController.js");

// Defino las rutas, es decir que controlador y cuál de sus métodos es el que va a manejar el requerimiento
//Rutas de listados
router.get("/list", stockController.stocklist);
router.get("/detail/:name", stockController.stockdetail);

//Rutas para add
router.post("/addstock/", stockController.stockadd);
//router.post("/additem/", stockController.itemadd);

//Rutas de edit
//router.put("/editcategory/:id", stockController.categoriesedit);
//router.put("/edititem/:id", stockController.itemedit);

//Rutas para eliminar
//router.delete("/destroycategory/:id", stockController.categoriesdestroy);
//router.delete("/destroyitem/:id", stockController.itemdestroy);

module.exports = router;
