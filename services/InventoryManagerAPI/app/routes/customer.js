const passport = require('passport'),
      config = require('@config'),
      models = require('@InventoryManager/app/setup');
module.exports = (app) => {
  const api = app.InventoryManagerAPI.app.api.customer;
  app.route('/api/v1/customer/:customerId')
     .delete(passport.authenticate('jwt', config.session), api.remove(models.Customer, app.get('budgetsecret')));
  app.route('/api/v1/customer/')
     .post(passport.authenticate('jwt', config.session),api.store(models.Customer,app.get('budgetsecret')))
     .get(passport.authenticate('jwt', config.session), api.getAll(models.Customer, app.get('budgetsecret')))
     .put(passport.authenticate('jwt', config.session), api.edit(models.Customer, app.get('budgetsecret')));

}