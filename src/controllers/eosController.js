// Requires
const { DATE } = require("sequelize");
const db = require("../database/models");
const { Op } = require("sequelize");

const eosController = {
  hardwareList: async (req, res) => {
    let computers = await db.inventory.findAll({
      where: {
        status: 0
      }
    })
    res.render("./eos/eosComputerList.ejs" , {req, computers});
  },

  cellphoneList: async (req, res) => {
    let cellphones = await db.cellphone.findAll({
      where: {
        status: 0
      }
    })
    res.render("./eos/eosCellList.ejs" , {req, cellphones});
  },
};

module.exports = eosController;
