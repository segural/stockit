// Requiero los módulos de node que se van ausar:
const express = require("express");
const router = express.Router();
const path = require("path");

// Requiero el controller al que apuntan las rutas que defino maás abajo:
const invController = require("../controllers/invController.js");

// Defino las rutas, es decir que controlador y cuál de sus métodos es el que va a manejar el requerimiento
//Rutas de listados
router.get("/due", invController.duelist);
router.get("/desktop", invController.desktopList);
router.get("/notebook", invController.notebookList);
router.get("/cellphone", invController.cellphoneList);
router.get("/server", invController.serverList);

//Rutas para add
router.get("/addcomputer", invController.addcomputerform);
router.get("/addserver", invController.addserverform);
router.post("/addcomputer/add", invController.storecomputer);
router.post("/addserver/add", invController.storeserver);
router.post("/due/add", invController.dueadd);
router.post("/cellphone/add", invController.celladd);

//Rutas de edit
router.put("/dueedit/:id", invController.dueedit);
router.put("/editcomputer/:id", invController.editcomputer);
router.put("/editserver/:id", invController.editserver);
router.put("/editcell/:id", invController.editcell);

//Rutas para eliminar (no se usa destroy ya que son bajas lógicas)
router.put('/duedestroy/:id', invController.itemDestroy);
router.put('/disablecomputer/:id', invController.computerDestroy);
router.put('/disableserver/:id', invController.serverDestroy);
router.put('/disablecell/:id', invController.cellDestroy);

module.exports = router;