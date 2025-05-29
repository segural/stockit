// Requiero los módulos de node que se van ausar:
const express = require("express");
const router = express.Router();
const path = require("path");

// Requiero el controller al que apuntan las rutas que defino maás abajo:
const productsController = require("../controllers/productsController.js");

// Defino las rutas, es decir que controlador y cuál de sus métodos es el que va a manejar el requerimiento
//Rutas de listados
router.get("/items", productsController.productslist);
router.get("/categories", productsController.categorieslist);
router.get("/disable", productsController.productsdisable);

//Rutas para add
router.post("/addcategory/", productsController.categoriesadd);
router.post("/additem/", productsController.itemadd);

//Rutas de edit
router.put("/editcategory/:id", productsController.categoriesedit);
router.put("/edititem/:id", productsController.itemedit);

//Rutas de enable/disable
router.put("/disableitem/:id", productsController.itemdisable);
router.put("/enableitem/:id", productsController.itemenable);

//Rutas para eliminar
//router.delete("/destroycategory/:id", productsController.categoriesdestroy);
//router.delete("/destroyitem/:id", productsController.itemdestroy);

module.exports = router;
