// Requires
const { DATE } = require("sequelize");
const db = require("../database/models");
const { Op } = require("sequelize");

const productController = {
// ABM Productos
  productslist: async (req, res) => {
    let categories = await db.categories.findAll();
    let products = await db.products.findAll({
      include: [
        {association:"category"}
      ]
    })
    res.render("./products/productsList" , {req, products, categories});
  },
  
  itemadd: async (req, res) => {
    let product = await db.products.create({
        brand: req.body.brand,
        description: req.body.description,
        idCategory: req.body.category
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

  itemdestroy: async (req, res) => {
    let productToDelete = await db.products.findByPk(req.params.id);
    await productToDelete.destroy();
    res.redirect("/products/items");
  },

//ABM Categorias
  categorieslist: async (req, res) => {
    let categories = await db.categories.findAll()
    res.render("./products/categoriesList" , {req, categories});
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

  categoriesdestroy: async (req, res) => {
    let categoryToDelete = await db.categories.findByPk(req.params.id);
    await categoryToDelete.destroy();
    res.redirect("/products/categories");
  },
};

module.exports = productController;
