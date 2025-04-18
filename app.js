﻿//Requiero paquetes y genero las variables(espress,path):
const express = require("express");
require("dotenv").config();
const app = express();
const path = require("path");
const methodOverride = require("method-override"); // Para poder usar los métodos PUT y DELETE
const publicPath = path.resolve("./public");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const userLoggedMiddleware = require("./src/middlewares/userLoggedMiddleware");

//Defino el/los middlewares que se usarán de forma global:
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride("_method")); // Para poder pisar el method="POST" en el formulario por PUT y DELETE
app.use(session({ secret: "afiliaciones", resave: false, saveUninitialized: false })); // Establece la sesion
app.use(userLoggedMiddleware);
// Requiero dotenv para usar .env en la confoguracion de
require("dotenv").config();

// Establezco Engine de Vistas
app.set("view engine", "ejs");
app.set("views", "./src/views/");

//Requiero el/los archivo/s de rutas que se usarán para dirigir las paticiones:
const mainRoutes = require("./src/routes/main.js");
const dashRoutes = require("./src/routes/dash.js");
const usersRoutes = require("./src/routes/users.js");
const rolesRoutes = require("./src/routes/roles.js");
const permissionsRoutes = require("./src/routes/permissions.js");
const productsRoutes = require("./src/routes/products.js");
const stockRoutes = require("./src/routes/stock.js");
const inventoryRoutes = require("./src/routes/inventory.js");
const eosRoutes = require("./src/routes/eos.js");
const cron = require('node-cron');
const AutoMails = require("./src/controllers/AutoMails");
const DueAutoMails = require("./src/controllers/DueAutoMails");
const DueAutoMailsAlert = require("./src/controllers/DueAutoMailsAlert");
const DueAutoMailsWarning = require("./src/controllers/DueAutoMailsWarning");

//Indico para cada petición, el archivo de rutas que lo manejará:
app.use("/", mainRoutes);
app.use("/dashboard", dashRoutes);
app.use("/users", usersRoutes);
app.use("/roles", rolesRoutes);
app.use("/permissions", permissionsRoutes);
app.use("/products", productsRoutes);
app.use("/stock", stockRoutes);
app.use("/inventory", inventoryRoutes);
app.use("/eos", eosRoutes);

//Scheduled Job
cron.schedule("0 0 8 * * 1,4", function() {
  AutoMails();
},{timezone: "America/Argentina/Buenos_Aires"}
);
cron.schedule("0 50 7 * * 2,5", function() {
  DueAutoMails();
},{timezone: "America/Argentina/Buenos_Aires"}
);
cron.schedule("0 55 7 * * 2,5", function() {
  DueAutoMailsAlert();
},{timezone: "America/Argentina/Buenos_Aires"}
);
cron.schedule("0 0 8 * * 2,5", function() {
  DueAutoMailsWarning();
},{timezone: "America/Argentina/Buenos_Aires"}
);

//Inicio servidor en puerto 3000
app.listen(process.env.PORT || 8000, function () {
  console.log(`Servidor corriendo en puerto ${process.env.PORT || 8000}`);
});
