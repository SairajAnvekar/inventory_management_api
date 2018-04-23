const passport = require('passport'),
      config = require('@config'),
      models = require('@InventoryManager/app/setup');
module.exports = (app) => {
  const api = app.InventoryManagerAPI.app.api.profile;
  app.route('/api/v1/profile')
     .post(passport.authenticate('jwt', config.session),api.store(models.Profile,app.get('budgetsecret')))
     .get(passport.authenticate('jwt', config.session),api.getAll(models.Profile,app.get('budgetsecret')))
     .put(passport.authenticate('jwt', config.session),api.edit(models.Profile,app.get('budgetsecret')))
}