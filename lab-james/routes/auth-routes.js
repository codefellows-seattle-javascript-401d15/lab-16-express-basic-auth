'use strict';

const debug = require('debug')('cfgram:auth-routes');
const basicAuth = require('basic-auth-middleware');
const User = require('../models/user.js');
const userController = require('../controllers/user-controller.js');

module.exports = function(router) {
  router.post('/signup', (req, res) => {
    debug('POST /signup');

    return userController.createUser(req.body)
    .then(token => {
      res.json(token);
    })
    .catch(err => {
      res.status(400).send(err);
    });
  });

  router.get('/signin', (req, res) => {
    debug('GET /signin');

    return userController.fetchUser(req.Auth)
    .then(token => {
      res.json(token);
    })
    .catch(err => {
      res.status(err.status).send(err);
    });
  });

  return router;
};
