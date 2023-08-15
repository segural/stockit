// Requires
const { DATE } = require("sequelize");
const db = require("../database/models");
const { Op } = require("sequelize");
const { QueryTypes } = require("sequelize");

const stockController = {
// Stock
    stocklist: async (req, res) => {
        let stocks = await db.sequelize.query("SELECT c.name as 'category',SUM(s.quantity) as 'quantity' FROM stockit.stocks s INNER JOIN stockit.products p on s.idProduct = p.id INNER JOIN stockit.categories c on p.idCategory = c.id GROUP BY c.name", {
            type: QueryTypes.SELECT
        });
        res.render("./stock/stockList" , {req, stocks});
    },

    stocklistin: async (req, res) => {
        let stockin = await db.movements.findAll({
            where:{type: 1},
            include:[{association:"product"}],
            order: [['id','DESC']]
          })
        res.render("./stock/inboundstock", {req, stockin});
    },

    stocklistout: async (req, res) => {
        let stockout = await db.movements.findAll({
            where:{type: 0},
            include:[{association:"product"},{association:"oc"}],
            order: [['id','DESC']]
          })
        res.render("./stock/outboundStock", {req, stockout});
    },
    
    stockdetail: async (req, res) => {
        let categories = await db.categories.findOne({
            where: {
                name: req.params.name
            }
        });
        let products = await db.products.findAll({
            where: {
                idCategory: categories.id
            },
            include: [
                {association:"stock"}
            ]
        });
        let companies = await db.companies.findAll();
        let providers = await db.provider.findAll();
        let branchs = await db.branch.findAll();
        res.render("./stock/stockDetail" , {req, categories, products, companies, providers, branchs});
    },

    stockadd: async (req, res) => {
        let stock = await db.stock.findOne({
            where:
            {idProduct: req.body.product}
        });
        if (stock == undefined){
            await db.stock.create({
                idProduct: req.body.product,
                quantity: req.body.quantity
            });
        } else {
            let stockQuantity = Number(stock.quantity) + Number(req.body.quantity);
            await stock.update({
                quantity: stockQuantity
            })
        }
        await db.movements.create({
            type: 1,
            provider: req.body.provider,
            branch: null,
            idProduct: req.body.product,
            quantity: req.body.quantity,
            companyname: req.body.company,
        })
        res.redirect('/stock/list');
    },
    
    stockdeduct: async (req, res) => {
        let stock = await db.stock.findOne({
            where:
            {idProduct: req.body.product}
        });
        let stockQuantity = Number(stock.quantity) - Number(req.body.quantity);
        await stock.update({
            quantity: stockQuantity
        })
        await db.movements.create({
            type: 0,
            provider: null,
            branch: req.body.branch,
            idProduct: req.body.product,
            quantity: req.body.quantity,
            companyname: null,
            notes: req.body.sector,
        })
        res.redirect('/stock/list');
    },

    ocadd: async (req, res) => {
        let oc = await db.ocs.create({
            number: req.body.number,
            recibed: 0
        });
        let movement = await db.movements.findByPk(req.params.id);
        await movement.update({
            idOC: oc.id
        })
        res.redirect('/stock/out');
    },
};

module.exports = stockController;