'use strict';

var Hapi    = require('hapi');
var routes  = require('./routes');
var plugins = require('./plugins');

var server = new Hapi.Server({
	debug : {
		log : ['info', 'error']
	}
});

server.connection({
	port : 3000,
	routes : {
		cors : true
	}
});

server.register(plugins, function (err) {
    if (err) {throw err;}

    for (var route in routes) {
    	server.route(routes[route]);
    }

	server.start(function(err) {
	    if (err) {throw err;}
	    server.log('info', 'Server running at: ' + server.info.uri);
	});
});

module.exports = server;
