const passport = require('passport'),
      config = require('@config'),
      models = require('@InventoryManager/app/setup');
module.exports = (app) => {
  const api = app.InventoryManagerAPI.app.api.supplier;
 
  app.route('/api/v1/supplier/:supplierId')
     .delete(passport.authenticate('jwt', config.session), api.remove(models.Supplier, app.get('budgetsecret')));
  app.route('/api/v1/supplier/')
     .post(passport.authenticate('jwt', config.session),api.store(models.Supplier,app.get('budgetsecret')))
     .get(passport.authenticate('jwt', config.session), api.getAll(models.Supplier, app.get('budgetsecret')))
     .put(passport.authenticate('jwt', config.session), api.edit(models.Supplier, app.get('budgetsecret')));

}