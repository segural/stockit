// Requires
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

// Lectura de la DB en formato de Sequelize
const db = require('../database/models');

// Variable para no llamar en las function a db
const permission = db.permission;

// Métodos del controlador
const permissionsController ={

    // ABM de permisos

    permissionList: async (req,res) => {
        let permissions = await db.permission.findAll(
            {include: [
				{association:"roles"}
			]}
        );        
        res.render("./permissions/permissionList.ejs", {req, permissions})
    },    

    permissionNew: async (req,res) => {
        let roles = await db.role.findAll({});
        res.render("./permissions/permissionNew.ejs", {req, roles});
    },

    permissionStore: async (req,res) => {

        let newPermission = await db.permission.create ({
            name: req.body.name
            
        });
        await newPermission.addRoles(req.body.roles);
        res.redirect('./permissions/list');
    },

    permissionEdit: async (req,res) => {
        let roles = await db.role.findAll({});
        let permissionToEdit = await db.permission.findByPk (req.params.id,
			{include: [ {association:"roles"} ] }
        );
        let selectedRoles =[];
        permissionToEdit.roles.forEach((role) => {selectedRoles.push(role.id)});
        res.render("./permissions/permissionEdit.ejs", {req, permissionToEdit, roles, selectedRoles})
    },

    permissionUpdate: async (req,res) => {

        let permissionToUpdate = await db.permission.findByPk (req.params.id,
			{include: [{association:"roles"}]}
        );

        await permissionToUpdate.update({ name: req.body.name });
		await permissionToUpdate.setRoles(req.body.roles);

        res.redirect('../permissions/list');
    },
    
    permissionDestroy: async (req,res) =>{
		let permissionToDelete = await db.permission.findByPk (req.params.id,
			{include: [{association:"roles"}]}
        );
        await permissionToDelete.destroy();
        res.redirect('../permissions/list');
    }
    
};

module.exports = permissionsController