'use strict';

var bluebird = require('bluebird');
var mongoose = bluebird.promisifyAll(require('mongoose'));

exports.register = function (plugin, options, next) {

  mongoose.connect(options.mongo.uri,  function (e) {
    if (e) {
      plugin.log(['error', 'database', 'mongodb'], 'Unable to connect to MongoDB: ' + e.message);
      process.exit();
    }

    mongoose.connection.once('open', function () {
      plugin.log(['info', 'database', 'mongodb'], 'Connected to MongoDB @ ' +  options.mongo.uri);
    });

    mongoose.connection.on('connected', function () {
      plugin.log(['info', 'database', 'mongodb'], 'Connected to MongoDB @ ' +  options.mongo.uri);
    });

    mongoose.connection.on('error', function (e) {
      plugin.log([ 'error', 'database', 'mongodb'], 'MongoDB ' + e.message);
    });

    mongoose.connection.on('disconnected', function () {
      plugin.log(['warn', 'database', 'mongodb'], 'MongoDB was disconnected');
    });
  });

  return next();
};

exports.register.attributes = {
  name    : 'mongoose',
  version : '1.0.0'
};
