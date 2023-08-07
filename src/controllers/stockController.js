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
        res.render("./stock/stockDetail" , {req, categories, products});
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
            })
        } else {
            await stock.update({
                quantity: req.body.quantity
            })
        }
        res.redirect('/stock/list');
    },
};

module.exports = stockController;