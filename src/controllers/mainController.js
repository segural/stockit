// Requires
const { DATE } = require("sequelize");
const db = require("../database/models");
const { Op } = require("sequelize");

const mainController = {
  login: (req, res) => {
    res.render("./users/login");
  },
};

module.exports = mainController;
