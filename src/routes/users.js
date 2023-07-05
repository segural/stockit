// Requiero los módulos de node que se van ausar:
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// Middleware que sólo permite acceder a ciertas rutas si NO se está loggeado:
const guestMiddleware = require("../middlewares/guestMiddleware");

// Middleware que sólo permite acceder a ciertas rutas si se está loggeado:
const authMiddleware = require("../middlewares/authMiddleware");


//Middlewares para validacion de formularios del Backend:
const validateUserStore = require ("../middlewares/validateUserStore");
const validateUserUpdate = require ("../middlewares/validateUserUpdate");
const validateUserLogin = require ("../middlewares/validateUserLogin");
const validateUserReset = require ("../middlewares/validateUserReset");



// Requiero el controller al que apuntan las rutas que defino maás abajo:
const usersController = require("../controllers/usersController.js")

// Defino las rutas, es decir que controlador y cuál de sus métodos es el que va a manejar el requerimiento

// Rutas para: Proceso de formulario de Login
router.post("/login", validateUserLogin, usersController.loginProcess);
router.get("/logout", usersController.userLogout);

//Rutas para: index
router.get("/index", usersController.index);

// Rutas para: reseteo de password
router.post("/reset", validateUserReset, usersController.userReset);

// Rutas para: Proceso de usuarios
router.get("/list", authMiddleware, usersController.userList);
router.get("/new", authMiddleware, usersController.userNew);
router.post("/", validateUserStore, usersController.userStore);

//  Rutas para: Edición de usuarios
router.get('/:id/edit', authMiddleware, usersController.userEdit);
router.get('/:id/toggle', usersController.userToggle); 
router.put('/:id', usersController.userUpdate);

//  Rutas para: Borrar usuarios
router.delete('/:id', usersController.userDestroy);

module.exports = router;