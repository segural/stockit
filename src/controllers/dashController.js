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
    res.render("./dashboard/home", {req, stockin, stockout});
},
};

module.exports = dashController;
