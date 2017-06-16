'use strict';

const debug = require('debug')('pokegram:auth-routes');
const basicAuth = require('../lib/basic-auth-middleware');
const authController = require('../controllers/auth-controller');

module.exports = function(router) {
  router.post('/signup', (req, res) => {
    debug('POST /signup');

    return authController.createNewUser(req.body)
    .then(token => res.json(token))
    .catch(err => res.status(400).send(err));
  });

  router.get('/signin', basicAuth, (req, res) => {
    debug('GET /signin');

    return authController.authenticateUser(req.auth)
    .then(token => res.json(token))
    .catch(err => res.status(err.status).send(err));
  });

  return router;
};
