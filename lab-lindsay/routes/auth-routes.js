'use strict';

const debug = require('debug')('cfgram:auth-routes');
const basicAuth = require('../lib/basic-auth-middleware');
const User = require('../models/user');
const userController = require('../controllers/user-controller');

module.exports = function(router) {
  router.post('/signup', (req, res) => {
    debug('POST /signup');

    return userController.createNewUserProf(req.body)
    .then(token => res.json(token))
    .catch(err => res.status(400).send(err));
  });

  router.get('/signin', basicAuth, (req, res) => {
    debug('GET /signin');

    return userController.authenticateUserProf(req.auth)
    .then(token => res.json(token))
    .catch(err => res.status(401).send(err));

  });
  return router;
};
