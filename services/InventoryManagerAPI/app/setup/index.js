const mongoose = require('mongoose'),
      UserModel = require('@InventoryManagerModels/user'),
      CategoryModel = require('@InventoryManagerModels/category'),
      CategoryDetailsModel = require('@InventoryManagerModels/categoryDetails'),
      ProductModel = require('@InventoryManagerModels/product'),
      SupplierModel = require('@InventoryManagerModels/supplier'),
      CustomerModel = require('@InventoryManagerModels/customer'),
      PurchaseOrderModel = require('@InventoryManagerModels/purchaseOrder'),
      StockModel = require('@InventoryManagerModels/stock'),
      InvoiceModel = require('@InventoryManagerModels/invoice'),
      profileModel = require('@InventoryManagerModels/companyProfile'),
      CompanyTaxModel = require('@InventoryManagerModels/companyTax')
      
const models = {
  User: mongoose.model('User'),
  Category : mongoose.model('Category'),
  Product : mongoose.model('Product'),
  CategoryDetails : mongoose.model('CategoryDetails'),
  Customer : mongoose.model('Customer'),
  Supplier : mongoose.model('Supplier'),
  PurchaseOrder : mongoose.model("PurchaseOrder"),
  Stock : mongoose.model("Stock"),
  Invoice : mongoose.model("Invoice"),
  Profile : mongoose.model("CompanyProfile"),
  CompanyTax : mongoose.model("CompanyTax")
}
module.exports = models;