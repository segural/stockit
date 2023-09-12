// Requires
const { DATE } = require("sequelize");
const db = require("../database/models");
const { Op } = require("sequelize");
const { QueryTypes } = require("sequelize");

const invController = {
//Vencimientos
    duelist: async (req,res) => {
        const fechaActual = new Date();
        let number = fechaActual.getTime();
        let items = await db.due.findAll({
            where: {status: 1}
        });
        res.render("./inventory/dueitems.ejs" , {req, items, number});
    },

    dueadd: async (req,res) => {
        let fecha = new Date (req.body.duedate);
        let number = fecha.getTime();
        let itemToAdd = await db.due.create({
            branch: req.body.branch,
            who: req.body.who,
            duedate: req.body.duedate,
            datenumber: number,
            description: req.body.description,
            status: 1,
            user: req.session.userLogged.user
        });
        res.redirect("/inventory/due")
    },

    dueedit: async (req,res) => {
        let fecha = new Date (req.body.duedate);
        let number = fecha.getTime();
        let itemtoEdit = await db.due.findByPk(req.params.id)
        await itemtoEdit.update({
            branch: req.body.branch,
            who: req.body.who,
            duedate: req.body.duedate,
            datenumber: number,
            description: req.body.description,
            user: req.session.userLogged.user
        });
        res.redirect("/inventory/due")
    },

    itemDestroy: async (req,res) => {
        let itemToDelete = await db.due.findByPk(req.params.id)
        await itemToDelete.update({status: 0, user: req.session.userLogged.user});
        res.redirect("/inventory/due")
    },
//Inventario Desktops, Notebooks, Servers y celulares
    desktopList: async (req,res) => {
        branchs = await db.branch.findAll()
        type = "Desktops"
        let computers = await db.inventory.findAll({
            where: {
                [Op.and]: 
                    [{type: "desktop"}, {status: 1}]
                },
        });
        res.render("./inventory/computersList.ejs" , {req, computers, type, branchs});
    },

    notebookList: async (req,res) => {
        branchs = await db.branch.findAll()
        type = "Notebooks"
        let computers = await db.inventory.findAll({
            where: {
                [Op.and]: 
                    [{type: "notebook"}, {status: 1}]
                },
        });
        res.render("./inventory/computersList.ejs" , {req, computers, type, branchs});
    },

    serverList: async (req,res) => {
        branchs = await db.branch.findAll()
        type = "Servers"
        let computers = await db.inventory.findAll({
            where: {
                [Op.and]: 
                    [{type: "server"}, {status: 1}]
                },
        });
        res.render("./inventory/serversList.ejs" , {req, computers, type, branchs});
    },

    cellphoneList: async (req,res) => {
        type = "Celulares"
        let cellphones = await db.cellphone.findAll({
            where: {
                status: 1
            }
        });
        res.render("./inventory/cellList.ejs" , {req, cellphones, type});
    },

    addcomputerform: async (req,res) => {
        branchs = await db.branch.findAll()
        res.render("./inventory/addcomputer.ejs" , {req, branchs});
    },

    addserverform: async (req,res) => {
        branchs = await db.branch.findAll()
        res.render("./inventory/addserver.ejs" , {req, branchs});
    },

    storecomputer: async (req,res) => {
        let cputoadd = await db.inventory.create({
            type: req.body.type,
            name: req.body.name,
            branch: req.body.branch,
            sector: req.body.sector,
            serialnumber: req.body.serialnumber,
            properties: req.body.properties,
            user: req.session.userLogged.user,
            status: 1,
        })
        res.redirect("/inventory/"+cputoadd.type)
    },

    storeserver: async (req,res) => {
        await db.inventory.create({
            type: "server",
            name: req.body.name,
            branch: req.body.branch,
            properties: req.body.properties,
            servertype: req.body.servertype,
            serverenv: req.body.serverenv,
            ip: req.body.ip,
            user: req.session.userLogged.user,
            status: 1,
        })
        res.redirect("/inventory/server")
    },

    editcomputer: async (req,res) => {
        let cputoedit = await db.inventory.findByPk(req.params.id);
        await cputoedit.update({
            name: req.body.name,
            branch: req.body.branch,
            sector: req.body.sector,
            serialnumber: req.body.serialnumber,
            properties: req.body.properties,
            user: req.session.userLogged.user
        })
        res.redirect("/inventory/"+cputoedit.type)
    },

    editserver: async (req,res) => {
        let servertoedit = await db.inventory.findByPk(req.params.id);
        await servertoedit.update({
            name: req.body.name,
            branch: req.body.branch,
            properties: req.body.properties,
            servertype: req.body.servertype,
            serverenv: req.body.serverenv,
            ip: req.body.ip,
            user: req.session.userLogged.user,
        })
        res.redirect("/inventory/server")
    },

    editcell: async (req,res) => {
        let celltoedit = await db.cellphone.findByPk(req.params.id);
        await celltoedit.update({
            phonenumber: req.body.phonenumber,
            brand: req.body.brand,
            model: req.body.model,
            sector: req.body.sector,
            imei: req.body.imei,
            deliverydate: req.body.deliverydate,
            user: req.session.userLogged.user
        })
        res.redirect("/inventory/cellphone")
    },

    computerDestroy: async (req,res) => {
        let itemToDelete = await db.inventory.findByPk(req.params.id)
        await itemToDelete.update({status: 0, user: req.session.userLogged.user});
        res.redirect("/inventory/"+itemToDelete.type)
    },

    serverDestroy: async (req,res) => {
        let itemToDelete = await db.inventory.findByPk(req.params.id)
        await itemToDelete.update({status: 0, user: req.session.userLogged.user});
        res.redirect("/inventory/server")
    },

    cellDestroy: async (req,res) => {
        let celToDelete = await db.cellphone.findByPk(req.params.id)
        await celToDelete.update({status: 0, user: req.session.userLogged.user});
        res.redirect("/inventory/cellphone")
    },
};

module.exports = invController;