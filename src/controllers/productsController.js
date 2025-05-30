// Requires
const { DATE } = require("sequelize");
const db = require("../database/models");
const { Op } = require("sequelize");

const productController = {
// ABM Productos
  productslist: async (req, res) => {
    let categories = await db.categories.findAll();
    let products = await db.products.findAll({
      where: {enable: 1},
      include: [
        {association:"category"}
      ]
    })
    res.render("./products/productsList.ejs" , {req, products, categories});
  },
  
  itemadd: async (req, res) => {
    let product = await db.products.create({
        brand: req.body.brand,
        description: req.body.description,
        idCategory: req.body.category,
        enable: true
      })
    await db.stock.create({
      quantity: 0,
      idProduct: product.id
    })
    res.redirect("/products/items")
  },

  itemedit: async (req, res) => {
    let productToEdit = await db.products.findByPk(req.params.id);
      productToEdit.update({
        brand: req.body.brand,
        description: req.body.description,
        idCategory: req.body.category
    })
    res.redirect("/products/items")
  },

  productsdisable: async (req, res) => {
    let categories = await db.categories.findAll();
    let products = await db.products.findAll({
      where: {enable: 0},
      include: [
        {association:"category"}
      ]
    })
    res.render("./products/productsDisable.ejs" , {req, products, categories});
  },

  itemdisable: async (req, res) => {
    let itemToDisable = await db.products.findByPk(req.params.id);
    itemToDisable.update({
      enable: false,
    })
    res.redirect("/products/items")
  },

  itemenable: async (req, res) => {
    let itemToDisable = await db.products.findByPk(req.params.id);
    itemToDisable.update({
      enable: true,
    })
    res.redirect("/products/items")
  },



//ABM Categorias
  categorieslist: async (req, res) => {
    let categories = await db.categories.findAll()
    res.render("./products/categoriesList.ejs" , {req, categories});
  },

  categoriesadd: async (req, res) => {
    let category = await db.categories.create({
        name: req.body.name,
        description: req.body.description
      })
    res.redirect("/products/categories")
  },

  categoriesedit: async (req, res) => {
    let categoryToEdit = await db.categories.findByPk(req.params.id);
    categoryToEdit.update({
      name: req.body.name,
      description: req.body.description
    })
    res.redirect("/products/categories")
  },
};

module.exports = productController;
