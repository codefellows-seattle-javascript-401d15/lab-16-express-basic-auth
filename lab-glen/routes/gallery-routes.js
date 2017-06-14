'use strict';

const createError = require('http-errors');
const debug = require('debug')('cfgram:gallery-routes');
const Gallery = require('../models/gallery');
const bearerAuth = require('../lib/bearer-auth-middleware');
const galleryCtrl = require('../controllers/gallery-controller');

module.exports = function(router) {
  router.post('/gallery', bearerAuth, (req, res) => {
    debug('#POST /api/gallery');

    galleryCtrl.create(req.body, req.user)
    .then(gallery => res.json(gallery))
    .catch(err => res.status(err.status).send(err.message));
  });

  router.get('/gallery/:id', bearerAuth, (req, res) => {
    debug('#GET /api/gallery');

    galleryCtrl.fetchGallery(req.params.id)
    .then(gallery => {
      if(gallery.userId.toString() !== req.user._id.toString()) {
        return createError(401, 'Invalid User');
      }
      res.json(gallery);
    })
    .catch(err => res.status(err.status).send(err.message));
  });

  router.put('/gallery/:id', bearerAuth, (req, res) => {
    debug('#PUT /api/gallery');

    return Gallery.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(gallery => res.json(gallery))
    .then(res.status = 200, console.log('Gallery Update Success'))
    .catch(err => (createError(404, err.message)));
  });

  router.delete('/gallery/:id', bearerAuth, (req, res) => {
    debug('#DELETE /api/gallery');

    Gallery.findByIdAndRemove(req.params.id)
    .then(() => res.sendStatus(204), console.log('Gallery Delete successful'))
    .catch(err => res.status(err.status).send(err.message));
  });
  return router;
};
