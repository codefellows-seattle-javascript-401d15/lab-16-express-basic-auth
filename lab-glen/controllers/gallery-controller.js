'use strict';

const Gallery = require('../models/gallery');
const debug = require('debug')('cfgram:gallery-controller');
const createError = require('http-errors');

const galleryCtrl = module.exports = {};

galleryCtrl.create = function(body, user) {
  debug('#create');

  body.userId = user._id;
  return new Gallery(body).save()
  .then(gallery => gallery)
  .catch(err => createError(400, 'Bad request yo'));
};

galleryCtrl.fetchGallery = function(id) {
  debug('#fetchGallery');

  return Gallery.findById(id)
  .then(gallery => gallery)
  .catch(err => createError(404, 'Not found'));
};
