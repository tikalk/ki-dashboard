var login = require('../index.js');
var sinon = require('sinon');
var auth = sinon.stub(login, 'init', function (app) {
  console.log('MOCKED Login');
  return app;
});

module.exports = auth;



// // mocking passport
// var util = require('util');

// passport.use('local', new StrategyMock({ passAuthentication : true}, function(){
// 	return true;
// }));
// function StrategyMock(options, verify) {
//   this.name = 'mock';
//   this.passAuthentication = options.passAuthentication || true;
//   this.userId = options.userId || 1;
//   this.verify = verify;
// }
 
// util.inherits(StrategyMock, passport.Strategy);
 
// StrategyMock.prototype.authenticate = function authenticate(req) {
//   if (this.passAuthentication) {
//     var user = {
//         id: this.userId
//       }
//       , self = this;
//     this.verify(user, function(err, resident) {
//       if(err) {
//         self.fail(err);
//       } else {
//         self.success(resident);
//       }
//     });
//   } else {
//     this.fail('Unauthorized');
//   }
// }
// // // use this to remove specific handlers
// // removeHandler(app, '/api/*');
// function removeHandler(app, handler) {
// 	var ind = false;
// 	var routes = app._router.stack;
// 	routes.some(function(stack, index){
// 		if (stack.regexp && stack.handle.name === 'ensureAuthenticated') {
// 			ind = index;
// 			return true;
// 		}
// 	});
// 	if (ind >= 0) {
// 		routes.splice(ind, 1);
// 	}
// 	return ind;
// }