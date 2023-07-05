// Requires
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const { Op } = require("sequelize");

// Lectura de la DB en formato de Sequelize
const db = require('../database/models');

// Variable para no llamar en las function a db
const users = db.user;

// Métodos del controlador
const usersController ={

    index: (req, res) => {
        res.render("./dashboard/home", {req});
    },

    loginProcess: async (req, res) => {
        let errors = validationResult(req);        
        let userToLogin = undefined;
        
        if (errors.isEmpty()) {
            let user = await db.user.findOne({
                where: {
                    user: req.body.user
                    },
                include: {
                    model: db.role,
                    as: "roles",
                    include: [
                        {
                            model: db.permission,
                            as: "permissions",
                        }
                    ],
                }
            });
            if (user != null) {
                if (user.active) {
                    if (bcrypt.compareSync(req.body.password, user.password)) {
                        if (user.resetFlag) {
                            return res.render ('./users/userReset', { errors:{ resetPass:
                                {msg: "Debe ingresar una nueva contraseña"}
                            }, old: req.body });
                        } else {
                            userToLogin = user;
                        };
                    };
                    } else {
                        return res.render ('./users/login', { errors:{ userInactive:
                            {msg: "Su usuario fue deshabilitado, comuníquese con el administrador"}
                        }, old: req.body });
                    };
            };              
        } else {
            return res.render ('./users/login', {errors:errors.mapped(), old: req.body});
        };

        if (userToLogin == undefined){
            return res.render ('./users/login', {errors:{ noUser:
                {msg: "Credenciales inválidas"}
            }, old: req.body});
        };

        let userCan =[];
        for (const role of userToLogin.roles) {
            for (const permission of role.permissions) {
                if (!userCan.includes(permission.name)) {
                    userCan.push(permission.name);
                };                
            };            
        };
        req.session.userLogged = userToLogin;
        req.session.userCan = userCan;

        if (req.body.rememberMe != undefined){
            res.cookie("rememberMe", userToLogin.user, {maxAge: 120000})
        };
        res.redirect("/users/index");

    },
    userList: async (req,res) => {
        let roles=await db.role.findAll({});
        if (req.session.userCan.includes("sistema_administrar")) {
            let users = await db.user.findAll({
                include: {
                    model: db.role,
                    as: "roles",
                    include: [
                        {
                            model: db.permission,
                            as: "permissions",
                        },
                    ]
                }
            });
            res.render("./users/userList", {req, users, roles});
        } else {
            let usersToFilter = await db.user.findAll({
                include: {
                    model: db.role,
                    as: "roles",
                    include: [
                        {
                            model: db.permission,
                            as: "permissions",
                        },
                    ]
                }
            });
            let users =[];
            for (const user of usersToFilter) {
                let currentUserRoles =[];
                user.roles.forEach((role)=>{currentUserRoles.push(role.name);});
                if (!currentUserRoles.includes("SysAdmin")) {
                    users.push(user)
                };
            }
            res.render("./users/userList", {req, users, roles});
        };        
    },
    userNew: async (req,res) => {
        let roles=await db.role.findAll({});
        res.render("./users/userNew", {req, roles})
    },
    userToggle: async (req,res) => {
        let userToEdit = await db.user.findByPk (req.params.id);
        if (userToEdit.active) {
            await userToEdit.update({ active: false});
        } else {
            await userToEdit.update({ active: true});
        }
        res.redirect('/users/list')
    },
    userStore: async (req,res) =>{
        let errors = validationResult(req);
        if(errors.isEmpty()){
            let image        
            if(req.file != undefined){
                image = req.file.filename
            } else {
                image = 'default-avatar.jpg'
            };
            let reset        
            if(req.body.changePass != undefined){
                reset = req.body.changePass
            } else {
                reset = 'false'
            };
            let existingUser = await db.user.findOne({
                where: {
                    user: req.body.user
                    }
                });
            if (existingUser == undefined) {
                let newUser = await db.user.create ({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    user: req.body.user,
                    password: bcrypt.hashSync(req.body.password, 10),
                    resetFlag: reset,
                    active: true,
                    image: image
                });
                await newUser.addRoles(req.body.roles);

                res.redirect('/users/list');
            } else {
                let roles = await db.role.findAll();
                return res.render (
                    './users/userNew',
                    {req, roles, errors:{ user: {msg: "Ya existe alguien registrado con ese user"}},
                    old: req.body}
                );
            };
            
        } else{
            let roles=await db.role.findAll({});
            console.log(req.body.roles)
            return res.render ('./users/userNew', {req, roles, errors:errors.mapped(), old: req.body});
        };        
    },
    userEdit: async (req,res) => {
        let roles = await db.role.findAll();
        let userToEdit = await db.user.findByPk (req.params.id,
			{include: [
				{association:"roles"}				
			]});
        let selectedRoles =[];
        userToEdit.roles.forEach((role) => {selectedRoles.push(role.id)});
        res.render("./users/userEdit", {req, userToEdit, roles, selectedRoles})
    },
    userUpdate: async (req,res) => {
        let errors = validationResult(req);
        let roles = await db.role.findAll();
        let userToEdit = await db.user.findByPk (req.params.id,
			{include: [
				{association:"roles"}				
			]});
        let selectedRoles =[];
        userToEdit.roles.forEach((role) => {selectedRoles.push(role.id)});
        if(errors.isEmpty()){
            let image        
            if(req.file != undefined){
                image = req.file.filename;
            } else {
                image = userToEdit.image;
            };
            let reset;
            let newpass;
            let pass;       
            if(req.body.changePass != undefined){
                reset = req.body.changePass
                newpass = 'Ab123456$'
                pass = bcrypt.hashSync(newpass, 10)
            } else {
                reset = 'false'
                pass = userToEdit.password
            };
            await userToEdit.update (
                {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                user: req.body.user,
                resetFlag: reset,
                active: true,
                image: image,
                password: pass,
                }
            );
			await userToEdit.setRoles(req.body.roles);

            res.redirect('/users/list');
            
        } else{
            return res.render ('./users/userEdit', {req, errors:errors.mapped(), userToEdit, roles, selectedRoles});
        };
    },
    userDestroy: async (req,res) => {
        let userToDelete = await db.user.findByPk (req.params.id,
			{include: [
				{association:"roles"}				
			]});
        await userToDelete.destroy();
        res.redirect('/users/list');
    },
    userReset: async (req, res) => {
        let errors = validationResult(req);        
        if(errors.isEmpty()){
            let userToReset = await db.user.findOne({
                where: {user: req.body.user}
            });

            if (req.body.password == req.body.password1) {
                await userToReset.update(
                    {
                        password: bcrypt.hashSync(req.body.password, 10),
                        resetFlag: false,
                    }
                );
            } else {
                return res.render ('./users/userReset', { errors:{ resetPass:
                    {msg: "Las contraseñas no coinciden"}
                }, old: req.body });
            };
            res.render("./users/login")           
        } else{
            return res.render ('./users/userReset', {errors:errors.mapped(), old: req.body});
        }
    },
    userLogout: (req, res) => {        
        req.session.destroy();
        res.cookie("rememberMe", "", {maxAge: -1});
        res.redirect ('/');
    },
};

module.exports = usersController