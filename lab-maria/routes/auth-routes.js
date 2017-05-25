'use strict';

const debug = require('debug')('cfgram:auth-routes');
const basicAuth = require('../lib/basic-auth-middleware');
const createError = require('http-errors');
const Promise = require('bluebird');
const Controller = require('../controller/auth-control');

module.exports = function(router) {

  router.post('/user', (req, res) => {
    debug('#POST /signup');
    if(!req) return Promise.reject(createError(400, 'Bad Request'));
    Controller.createUser(req)
      .then(token => res.status(201).json(token))
      .catch(err => res.status(err.status).send(err.name));
  });


  router.get('/user', basicAuth, (req, res) => {
    debug('#GET /login');
    if(!req.auth) return Promise.reject(createError(400, 'Bad Request'));
    Controller.authorize(req)
      .then(token => res.status(200).json(token))
      .catch(err => res.status(err.status).send(err.name));
  });
  return router;
};
