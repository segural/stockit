// Requires
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const { Op } = require("sequelize");


// Lectura de la DB en formato de Sequelize
const db = require('../database/models');

// Variable para no llamar en las function a db
const role = db.role;

// Métodos del controlador
const rolesController ={

// ABM de roles

    roleList: async (req,res) => {
        if (req.session.userCan.includes("sistema_administrar")) {
            let roles = await db.role.findAll(
                {include: [
                    {association:"permissions"}
                ]}
            );
            res.render("./roles/roleList", {req, roles})
        } else {
            let roles = await db.role.findAll({
                include: [
                    {association:"permissions"}
                ],
                where: {
                    name: {
                      [Op.notLike]: "SysAdmin"
                    }
                  }
            });
            res.render("./roles/roleList", {req, roles})
        }
    },

    roleNew: async (req,res) => {
        let permissions = await db.permission.findAll({});
        res.render("./roles/roleNew", {req, permissions});
    },

    roleStore: async (req,res) => {

        let newRole = await db.role.create ({
            name: req.body.name
            
        });
        await newRole.addPermissions(req.body.permissions);
        res.redirect('./roles/list');
    },

    roleEdit: async (req,res) => {
        let permissions = await db.permission.findAll({});
        let roleToEdit = await db.role.findByPk (req.params.id,
			{include: [
				{association:"permissions"}
				
			]});
        let selectedPermissions =[];
        roleToEdit.permissions.forEach((permission) => {selectedPermissions.push(permission.id)});
        res.render("./roles/roleEdit", {req, roleToEdit, permissions, selectedPermissions})
    },

    roleUpdate: async (req,res) => {
        
        let roleToUpdate = await db.role.findByPk (req.params.id,
			{include: [{association:"permissions"}]}
        );

        await roleToUpdate.update({ name: req.body.name });
		await roleToUpdate.setPermissions(req.body.permissions);
        res.redirect('../roles/list'); 
    },

    roleDestroy: async (req,res) =>{
		let roleToDelete = await db.role.findByPk (req.params.id,
			{include: [
				{association:"permissions"}				
			]});
        await roleToDelete.destroy();
        res.redirect('../roles/list');

    },

};

module.exports = rolesController