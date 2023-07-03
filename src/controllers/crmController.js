// Requires
const { DATE } = require("sequelize");
const db = require("../database/models");
const { Op } = require("sequelize");

const crmController = {
  login: (req, res) => {
    res.render("./crm/users/login");
  },

  index: async (req, res) => {
    let conrec = await db.client.count({
      where: { called: 0, paycheck: true },
    });
    let sinrec = await db.client.count({
      where: { called: 0, paycheck: false },
    });
    let total = conrec + sinrec;

    res.render("./crm/dashboard/home", { req, conrec, sinrec, total });
  },

  clientsList: async (req, res) => {
    if (req.params.filter == 0) {
      let prep = "con";
      let status = "no contactados";
      let clients = await db.client.findAll({
        where: { called: 0, paycheck: true },
      });
      res.render("./crm/clients/clientList", { req, status, clients, prep });
    } else if (req.params.filter == 1) {
      let prep = "con";
      let status = "contactados";
      let clients = await db.client.findAll({
        where: { called: 1, paycheck: true },
      });
      res.render("./crm/clients/clientList", { req, status, clients, prep });
    } else if (req.params.filter == 2) {
      let prep = "sin";
      let status = "no contactados";
      let clients = await db.client.findAll({
        where: { called: 0, paycheck: false },
      });
      res.render("./crm/clients/clientList", { req, status, clients, prep });
    } else {
      let prep = "sin";
      let status = "contactados";
      let clients = await db.client.findAll({
        where: { called: 1, paycheck: false },
      });
      res.render("./crm/clients/clientList", { req, status, clients, prep });
    }
  },

  clientUpdate: async (req, res) => {
    let clientToEdit = await db.client.findByPk(req.params.id);
    await clientToEdit.update({
      called: 1,
    });

    if (req.body.paycheck === "1") {
      res.redirect("/crm/clients/0");
    } else {
      res.redirect("/crm/clients/2");
    }
  },
};

module.exports = crmController;
