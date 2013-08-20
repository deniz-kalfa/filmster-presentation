#!/usr/bin/env node
var sys = require('sys')
  , q = require('q')
  , YAML = require('yamljs')
  , writeFile = q.denodeify(require('fs').writeFile)
  , exec = q.denodeify(require('child_process').exec);


var properties = {};

exec("git rev-parse HEAD")
  .then(function(args){
    properties.gitCommitHash = args[0].trim();
  })
  .then(function(){
    return YAML.stringify(properties);
  })
  .then(function(data){
    writeFile('./application_properties.yaml', data)
      .fail(function(){ console.log('failed writing...'); })
  });
