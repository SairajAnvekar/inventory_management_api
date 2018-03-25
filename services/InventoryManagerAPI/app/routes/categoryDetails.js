const passport = require('passport'),
      config = require('@config'),
      models = require('@InventoryManager/app/setup');
module.exports = (app) => {
  const api = app.InventoryManagerAPI.app.api.categoryDetails;
 
  app.route('/api/v1/categoryDetails')
     .post(passport.authenticate('jwt', config.session),api.store(models.User,models.CategoryDetails,app.get('budgetsecret')))
  app.route('/api/v1/categoryDetails')
     .get(passport.authenticate('jwt', config.session), api.getAll(models.User,models.CategoryDetails, app.get('budgetsecret')))
     .put(passport.authenticate('jwt', config.session), api.edit(models.User,models.CategoryDetails, app.get('budgetsecret')));
 app.route('/api/v1/categoryDetails/update')
     .get(passport.authenticate('jwt', config.session), api.edit(models.User,models.CategoryDetails, app.get('budgetsecret')))
}