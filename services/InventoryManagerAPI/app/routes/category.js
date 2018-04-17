const passport = require('passport'),
      config = require('@config'),
      models = require('@InventoryManager/app/setup');
module.exports = (app) => {
  const api = app.InventoryManagerAPI.app.api.category;
 
  app.route('/api/v1/category/:categoryId')
     .post(passport.authenticate('jwt', config.session),api.store(models.User,models.Category,app.get('budgetsecret')))
     .delete(passport.authenticate('jwt', config.session),api.remove(models.User,models.Category,app.get('budgetsecret')))
  app.route('/api/v1/category/')
     .post(passport.authenticate('jwt', config.session),api.store(models.User,models.Category,app.get('budgetsecret')))
  app.route('/api/v1/category/')
     .get(passport.authenticate('jwt', config.session), api.getAll(models.User,models.Category, app.get('budgetsecret')))
     .put(passport.authenticate('jwt', config.session), api.edit(models.User,models.Category, app.get('budgetsecret')));
 app.route('/api/v1/category/update')
     .get(passport.authenticate('jwt', config.session), api.edit(models.User,models.Category, app.get('budgetsecret')))
}