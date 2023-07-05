// Requiero los módulos de node que se van ausar:
const express = require("express");
const router = express.Router();

// Middleware que sólo permite acceder a ciertas rutas si se está loggeado:
const authMiddleware = require("../middlewares/authMiddleware");

// Requiero el controller al que apuntan las rutas que defino maás abajo:
const rolesController = require("../controllers/rolesController.js")

// Defino las rutas, es decir que controlador y cuál de sus métodos es el que va a manejar el requerimiento

// Rutas para: Listado y creación de roles
router.get("/list", authMiddleware, rolesController.roleList);
router.get("/new", authMiddleware, rolesController.roleNew);
router.post("/", authMiddleware, rolesController.roleStore);

//  Rutas para: Edición de roles
router.get('/:id/edit', authMiddleware, rolesController.roleEdit);
router.put('/:id', authMiddleware, rolesController.roleUpdate);

//  Rutas para: Eliminar roles
router.delete('/:id', authMiddleware, rolesController.roleDestroy);



module.exports = router;