const {check} = require("express-validator");
const path = require("path");
const { nextTick } = require("process");

let validateUserUpdate = [
    
    check("email")
        .notEmpty().withMessage("Debes introducir un email").bail()
        .isEmail().withMessage("Email invalido. Ingresa un email con formato válido: user@dominio.com"),

    check("firstName")
        .notEmpty().withMessage("Debes introducir un nombre").bail()
        .isLength({min: 2}).withMessage("El nombre debe tener al menos 2 caracteres"),

    check("lastName")
        .notEmpty().withMessage("Debes introducir un apellido").bail()
        .isLength({min: 2}).withMessage("El apellido debe tener al menos 2 caracteres"),
    
    check("user")
        .notEmpty().withMessage("Debes introducir un usuario").bail()
        .isLength({min: 3}).withMessage("El apellido debe tener al menos 3 caracteres"),

    check("roles")
        .notEmpty().withMessage("Debes seleccionar al menos un rol").bail(),

    check("image").custom((value, {req}) =>{
        if (req.file != undefined){
        switch(path.extname(req.file.originalname)){
            case ".jpg": return ".jpg";
            break;
            case ".jpeg": return ".jpeg";
            break;
            case ".png": return ".png";
            break;
            case ".gif": return ".gif";
            break;
            default: return false
        }} else {
            return true
        }
    }).withMessage("Solo se admiten imágenes .jpg, .jpeg, .png, .gif")
];

module.exports = validateUserUpdate;