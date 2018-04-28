const passport = require('passport'),
      config = require('@config'),
      models = require('@InventoryManager/app/setup');
module.exports = (app) => {
  const api = app.InventoryManagerAPI.app.api.companyTax;
 
  app.route('/api/v1/companyTax/:companyTaxId')
     .post(passport.authenticate('jwt', config.session),api.store(models.User,models.CompanyTax,app.get('budgetsecret')))
     .delete(passport.authenticate('jwt', config.session),api.remove(models.User,models.CompanyTax,app.get('budgetsecret')))
  app.route('/api/v1/companyTax/')
     .post(passport.authenticate('jwt', config.session),api.store(models.User,models.CompanyTax,app.get('budgetsecret')))
  app.route('/api/v1/companyTax/')
     .get(passport.authenticate('jwt', config.session), api.getAll(models.User,models.CompanyTax, app.get('budgetsecret')))
     .put(passport.authenticate('jwt', config.session), api.edit(models.User,models.CompanyTax, app.get('budgetsecret')));
 app.route('/api/v1/companyTax/update')
     .get(passport.authenticate('jwt', config.session), api.edit(models.User,models.CompanyTax, app.get('budgetsecret')))
}