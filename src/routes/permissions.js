// Requiero los módulos de node que se van ausar:
const express = require("express");
const router = express.Router();

// Middleware que sólo permite acceder a ciertas rutas si se está loggeado:
const authMiddleware = require("../middlewares/authMiddleware");

// Requiero el controller al que apuntan las rutas que defino maás abajo:
const permissionsController = require("../controllers/permissionsController.js")

// Defino las rutas, es decir que controlador y cuál de sus métodos es el que va a manejar el requerimiento

// Rutas para: Proceso de permisos
router.post("/", authMiddleware, permissionsController.permissionStore);
router.get("/list", authMiddleware, permissionsController.permissionList);
router.get("/new", authMiddleware, permissionsController.permissionNew);

//  Rutas para: Edición de permisos
router.get('/:id/edit', authMiddleware, permissionsController.permissionEdit);
router.put('/:id', authMiddleware, permissionsController.permissionUpdate);

//  Rutas para: Eliminar roles
router.delete('/:id', authMiddleware, permissionsController.permissionDestroy);

module.exports = router;