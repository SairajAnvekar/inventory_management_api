const mongoose = require('mongoose'),
      UserModel = require('@InventoryManagerModels/user');
      CategoryModel = require('@InventoryManagerModels/category');
      CategoryDetailsModel = require('@InventoryManagerModels/categoryDetails');
      ProductModel = require('@InventoryManagerModels/product');
const models = {
  User: mongoose.model('User'),
  Category : mongoose.model('Category'),
  Product : mongoose.model('Product'),
  CategoryDetails : mongoose.model('CategoryDetails')
}
module.exports = models;