'use strict';

var Joi     = require('Joi');
var mangaV1 = require('../handlers/v1/manga-handler.js');

module.exports = [
	{
		path    : '/manga-url',
		method  : 'GET',
		handler : mangaV1.get,
		config: {
			description : 'Retrieves all url',
			notes       : 'Retrieves all url',
			tags        : ['api', 'url', 'get']
		}
	},
	{
		path    : '/manga-url/save',
		method  : 'POST',
		handler : mangaV1.post,
		config: {
			description : 'Saves url',
			notes       : 'Saves url',
			tags        : ['api', 'url', 'save'],
			validate    : {
				payload : {
					name : Joi.string().required().max(100)
						.description('Manga name'),
					url : Joi.string().required().max(100)
						.description('Manga url')
				}
			}
		}
	},
	{
		path    : '/manga-url/update',
		method  : 'PUT',
		handler : mangaV1.put,
		config: {
			description : 'Updates url',
			notes       : 'Updates url',
			tags        : ['api', 'url', 'update'],
			validate    : {
				payload : {
					name : Joi.string().required().max(100)
						.description('Manga name'),
					url : Joi.string().required().max(100)
						.description('Manga url')
				}
			}
		}
	},
	{
		path    : '/manga-url/delete',
		method  : 'DELETE',
		handler : mangaV1.delete,
		config: {
			description : 'Deletes a manga url',
			notes       : 'Deletes a manga url',
			tags        : ['api', 'url', 'delete'],
			validate    : {
				payload : {
					name : Joi.string().required().max(100)
						.description('Name of existing manga.')
				}
			}
		}
	}
];