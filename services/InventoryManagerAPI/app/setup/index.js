const mongoose = require('mongoose'),
      UserModel = require('@InventoryManagerModels/user'),
      CategoryModel = require('@InventoryManagerModels/category'),
      CategoryDetailsModel = require('@InventoryManagerModels/categoryDetails'),
      ProductModel = require('@InventoryManagerModels/product'),
      SupplierModel = require('@InventoryManagerModels/supplier'),
      CustomerModel = require('@InventoryManagerModels/customer');
const models = {
  User: mongoose.model('User'),
  Category : mongoose.model('Category'),
  Product : mongoose.model('Product'),
  CategoryDetails : mongoose.model('CategoryDetails'),
  Customer : mongoose.model('Customer'),
  Supplier : mongoose.model('Supplier'),
  
}
module.exports = models;