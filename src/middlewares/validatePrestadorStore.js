const { check } = require("express-validator");
const path = require("path");
const { nextTick } = require("process");

let validatePrestadorStore = [
  check("prestadorName").notEmpty().withMessage("Debes introducir un nombre para el prestador").bail().isLength({ min: 2 }).withMessage("El prestador debe tener al menos 2 caracteres"),

  check("planName").notEmpty().withMessage("Debes introducir al mnenos un nombre para el plan").bail().isLength({ min: 2 }).withMessage("El plan debe tener al menos 2 caracteres"),
];

module.exports = validatePrestadorStore;
