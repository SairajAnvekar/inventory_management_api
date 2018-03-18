const mongoose = require('mongoose'),
      UserModel = require('@InventoryManagerModels/user');
const models = {
  User: mongoose.model('User')
}
module.exports = models;