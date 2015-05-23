'use strict';

var Boom          = require('boom');
var mangaModel = require('../../models/manga-model.js');

var MangaHandler = {
	get : function (request, reply) {
		mangaModel.find(function (err, url) {
			if (!err) {
				reply(url);
			} else {
				reply(Boom.badRequest('An unexpected error has occured. Error log:' + err));
			}

		});
	},
	post : function (request, reply) {
		var newUrl = new mangaModel(request.payload);

		newUrl.save(function (err, url) {
			if (!err) {
				reply(url).created('/url/' + url._id);
			} else {
				if (err.code === 11000 || err.code === 11001){
					reply(Boom.badRequest('Category already exist.'));
				} else {
					reply(Boom.badRequest('Unable to save catergory. Error log: ' + err));
				}
			}
		});
	},
	put : function (request, reply) {
		var existingUrl = { name : request.payload.name };
		var newUrl      = {
			name  : request.payload.name,
			url   : request.payload.url
		};

		mangaModel.findOneAndUpdate(existingUrl, newUrl, {upsert : false}, function (err, url) {
			if (!err) {
				if ( url ) {
					reply('Updated `' + url.name +'` successfully.');
				} else {
					reply(Boom.badRequest('Category doesn\'t exist.'));
				}
			} else {
				reply(Boom.badRequest('An unexpected error has occured. Error log: '+ err));
			}
		} );
	},
	delete : function (request, reply) {
		mangaModel.findOneAndRemove(request.payload, function (err, url) {
			if (!err) {
				if ( url ) {
					reply('Deleted `' + url.name +'` successfully.');
				} else {
					reply(Boom.badRequest('Category doesn\'t exist.'));
				}
			} else {
				reply(Boom.badRequest('An unexpected error has occured. Error log: ' + err));
			}
		});
	}

};

module.exports = MangaHandler;
