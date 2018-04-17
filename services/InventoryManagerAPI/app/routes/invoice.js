const passport = require('passport'),
      config = require('@config'),
      models = require('@InventoryManager/app/setup');
module.exports = (app) => {
  const api = app.InventoryManagerAPI.app.api.invoice;
 
  app.route('/api/v1/invoice/')
     .post(passport.authenticate('jwt', config.session),api.store(models.Stock,models.Invoice,app.get('budgetsecret')))
  app.route('/api/v1/invoice/')
     .get(passport.authenticate('jwt', config.session), api.getAll(models.User,models.Invoice, app.get('budgetsecret')))
  app.route('/api/v1/invoice/:porderId')
     .put(passport.authenticate('jwt', config.session), api.edit(models.User,models.Invoice, app.get('budgetsecret')))
  app.route('/api/v1/invoice/Supplier')
     .get(passport.authenticate('jwt', config.session), api.getWithSupplier(models.Supplier,models.Invoice, app.get('budgetsecret')))
}