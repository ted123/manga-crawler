'use strict';

module.exports = [
	{
	    register : require('./mongodb-plugin.js'),
	    options  : {
	       mongo : {
	       	uri :'mongodb://ted123:password123@ds031902.mongolab.com:31902/manga-url'//process.env.MONGO_URI
	       }
	    }
	},
	{
		register : require('hapi-swagger'),
		options  : {
			apiVersion  : 'v1',
			payloadType : 'form'
		}
	}
]