'use strict';

// Development specific configuration
// ==================================
var port = 8080;

// dashboard for feature toggles: 
// http://ki-fb-dev-276310450.us-east-1.elb.amazonaws.com/#/

module.exports = {
	port: port,
	restUrl: 'your-url/api/v1'
  // MongoDB connection options
  // mongo: {
  //   uri: 'mongodb://localhost/ki-dev'
  // },

  // seedDB: true
};
