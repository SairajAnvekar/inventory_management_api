const passport = require('passport'),
      config = require('@config'),
      models = require('@InventoryManager/app/setup');
module.exports = (app) => {
  const api = app.InventoryManagerAPI.app.api.stock;
 
  app.route('/api/v1/stock/:stockId')
     .delete(passport.authenticate('jwt', config.session), api.remove(models.CategoryDetails,models.Stock, app.get('budgetsecret')));
  app.route('/api/v1/stock/')
     .post(passport.authenticate('jwt', config.session),api.store(models.User,models.Stock,app.get('budgetsecret')))
     .get(passport.authenticate('jwt', config.session), api.getAll(models.User,models.Stock, app.get('budgetsecret')))
     .put(passport.authenticate('jwt', config.session), api.edit(models.User,models.Stock, app.get('budgetsecret')));
  app.route('/api/v1/stock/all')
     .post(passport.authenticate('jwt', config.session),api.saveAll(models.User,models.Stock,app.get('budgetsecret')))   
  app.route('/api/v1/stock/products')
  .get(passport.authenticate('jwt', config.session), api.getAllWithProduct(models.Product,models.Stock, app.get('budgetsecret')))


}