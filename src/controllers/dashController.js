// Requires
const { DATE } = require("sequelize");
const db = require("../database/models");
const { Op } = require("sequelize");

const dashController = {

  index: async (req, res) => {
    let stockin = await db.movements.findAll({
      where:{type: 1},
      include:[{association:"product"}],
      limit: 5,
      order: [['id','DESC']]
    })
    let stockout = await db.movements.findAll({
      where:{type: 0},
      include:[{association:"product"}],
      limit: 5,
      order: [['id','DESC']]
    })
    let inventories = await db.inventory.findAll({
      where:{status: 1},
      limit: 5,
      order: [['id','DESC']]
    })
    let dues = await db.due.findAll({
      limit: 5,
      order: [['datenumber','ASC']]
    })
    res.render("./dashboard/home.ejs", {req, stockin, stockout, inventories, dues});
},
};

module.exports = dashController;
