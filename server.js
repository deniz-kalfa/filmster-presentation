#!/usr/bin/env node

/**
 * Server module exports method returning new instance of app.
 *
 * @param {Object} params - compound/express webserver initialization params.
 * @returns CompoundJS powered express webserver
 */
var applicationName = process.env.APPLICATION_NAME || 'filmster-presentation'
require('strong-agent').profile(
  '7f9f6a34-84d9-46f9-b3d1-7e4c3dd77512',
  [applicationName,'Heroku']
);

var app = module.exports = function getServerInstance(params) {
  params = params || {};
  // specify current dir as default root of server
  params.root = params.root || __dirname;
  return require('compound').createServer(params);
};

if (!module.parent) {
  var port = process.env.VCAP_APP_PORT || process.env.PORT || 5000;
  var host = process.env.HOST || '0.0.0.0';

  var server = app();
  server.listen(port, host, function () {
    console.log(
      'Compound server listening on %s:%d within %s environment',
      host, port, server.set('env')
    );
  });
}