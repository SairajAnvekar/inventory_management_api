const passport = require('passport'),
      config = require('@config'),
      models = require('@InventoryManager/app/setup');
module.exports = (app) => {
  const api = app.InventoryManagerAPI.app.api.product;
 
  app.route('/api/v1/product/:prodId')
     .delete(passport.authenticate('jwt', config.session), api.remove(models.CategoryDetails,models.Product, app.get('budgetsecret')));
  app.route('/api/v1/product/')
     .post(passport.authenticate('jwt', config.session),api.store(models.User,models.Product,app.get('budgetsecret')))
     .get(passport.authenticate('jwt', config.session), api.getAll(models.User,models.Product, app.get('budgetsecret')))
     .put(passport.authenticate('jwt', config.session), api.edit(models.User,models.Product, app.get('budgetsecret')));

app.route('/api/v1/product/category').get(passport.authenticate('jwt', config.session), api.getAllWithCategory(models.Category,models.Product, app.get('budgetsecret')))


}