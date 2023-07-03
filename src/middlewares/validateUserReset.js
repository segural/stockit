const {check} = require("express-validator");
let validateUserLogin = [
    check("user")
        .notEmpty().withMessage("Debes introducir un usuario").bail()
        .isLength({min: 3}).withMessage("El usuario debe tener al menos 3 caracteres"),
        
    check("password")
        .isLength({min: 8}).withMessage("La contraseña debe tener entre 8 y 15 caracteres").bail()
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/).withMessage("La contraseña debe incluir al menos una minúscula, una mayúscula, un número y un caracter especial"),
    
    check("password1")
        .isLength({min: 8}).withMessage("La contraseña debe tener entre 8 y 15 caracteres").bail()
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/).withMessage("La contraseña debe incluir al menos una minúscula, una mayúscula, un número y un caracter especial")
];

module.exports = validateUserLogin;