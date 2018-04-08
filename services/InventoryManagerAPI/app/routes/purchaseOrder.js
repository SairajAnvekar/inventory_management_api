const passport = require('passport'),
      config = require('@config'),
      models = require('@InventoryManager/app/setup');
module.exports = (app) => {
  const api = app.InventoryManagerAPI.app.api.purchaseOrder;
 
  app.route('/api/v1/purchaseOrder/')
     .post(passport.authenticate('jwt', config.session),api.store(models.Stock,models.PurchaseOrder,app.get('budgetsecret')))
  app.route('/api/v1/purchaseOrder/')
     .get(passport.authenticate('jwt', config.session), api.getAll(models.User,models.PurchaseOrder, app.get('budgetsecret')))
  app.route('/api/v1/purchaseOrder/:porderId')
     .put(passport.authenticate('jwt', config.session), api.edit(models.User,models.PurchaseOrder, app.get('budgetsecret')))
  app.route('/api/v1/purchaseOrder/Supplier')
     .get(passport.authenticate('jwt', config.session), api.getWithSupplier(models.Supplier,models.PurchaseOrder, app.get('budgetsecret')))
}