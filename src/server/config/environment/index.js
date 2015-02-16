'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../..'),

  // Directory to load the client sources from
  clientDir: 'client',

  // Server port - taken form production.js or development.js
  // port: process.env.PORT || 8080,
  // port: port,

  // Should we populate the DB with sample data?
  // seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'touch-beam-secret',
    jwt : 'P8VhBsixmZwJmcQhfTOZiFhol1nENqOwAR3cmWGRkoOL7EL60pe05ZFxisveXemQME3X9O2SvvJSyi6buoc3OoWqcDV8nYPwzA01QnZXPXb3vVtyak3MVyw057huvZU1afM8ZUSNDtG6zvZVMpfgbkf6kjj6QVecsOly07xZVPvNx3N3FsUxPIon0iKNyl36N0yNaiZwyKOJNH14HU7Qy8NvPyMVtmHbqaoe827szUhJsg0DmYHHkwCZGeshi8Gi'
  },

  // List of user roles
  userRoles: ['guest', 'user', 'admin'],

};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});
