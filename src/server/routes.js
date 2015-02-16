/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var passport = require('passport');
var jwt = require('jwt-simple');

module.exports = function(app) {
  var login = require('./api/login');
  login.init(app);

  // Insert routes below

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });

  // Simple route middleware to ensure user is authenticated.
  //   Use this route middleware on any resource that needs to be protected.  If
  //   the request is authenticated (typically via a persistent login session),
  //   the request will proceed.  Otherwise, the user will be redirected to the
  //   login page.
  function ensureAuthenticated(req, res, next) {
    passport.authenticate('bearer', { session: false }, function(err, user, info) {
      if (err) { return next(err) }
      if (!user) {
        return res.json(401, { error: 'Unknown token' });
      }
      return next();

    })(req, res, next);
  }
};
