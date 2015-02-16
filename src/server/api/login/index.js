'use strict';

var express = require('express');
// var controller = require('./segments.controller');
var passport = require('passport');
var jwt = require('jwt-simple');
var _app;
// var mockController = require('./mocks/segments.controller');
// var apiHandler = require('../../components/apiHandler').handle(mockController, controller);

// var router = express.Router();

// router.post('/', login);
// router.use('/*', ensureAuthenticated);
module.exports.init = init;
module.exports.login = login;
module.exports.authenticate = ensureAuthenticated;
// module.exports.authenticate = function (a,b,c) {
// 	return ensureAuthenticated(a,b,c);
// };
function init (app) {
	_app = app;
	app.post('/api/login', login);
	app.use('/api/*', ensureAuthenticated);
}

function login(req, res, next) {
	// console.log(req.body);
	passport.authenticate('local', { session: false }, function(err, user, info) {
	  if (err) { return next(err) }
	  if (!user) {
	    return res.json(400, { error: 'Wrong username/password' });
	  }
	  // console.log(info);
	  //user has authenticated correctly thus we create a JWT token
	  var token = jwt.encode({
	          iss: user.id,
	          exp: Date.now() + 7*24*60*60*1000,
	        }, _app.get('jwtTokenSecret'));
	  user.token = token;
	  // console.log(jwt.decode(token, app.get('jwtTokenSecret')));
	  res.json({ token : token , user : { name : user.username, email : user.email}});

	})(req, res, next);
}

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
	// if (req.isAuthenticated()) { return next(); }
	// res.status(401).end();
	// console.log(req.user);
	// return next();
	passport.authenticate('bearer', { session: false }, function(err, user, info) {
	  if (err) { return next(err) }
	  if (!user) {
	    return res.json(401, { error: 'Unknown token' });
	  }
	  // console.log(user);
	  //user has authenticated correctly thus we create a JWT token
	  // console.log(jwt.decode(user.token, app.get('jwtTokenSecret')));
	  // res.json()
	  return next();

	})(req, res, next);
}