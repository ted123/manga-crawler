'use strict';

var mongoose = require('mongoose');

var MangaSchema = new mongoose.Schema({
  name : { type : String, unique : true },
  url  : { type : String }
});

module.exports = mongoose.model('Manga', MangaSchema);
