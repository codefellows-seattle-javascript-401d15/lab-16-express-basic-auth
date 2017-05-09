'use strict';

const debug = require('debug')('cfgram:auth-routes');
const basicAuth = require('../lib/basic-auth-middleware');
const authController = require('../controller/auth-controller');
// const User = require('../model/user');

module.exports = function(router) {

  router.post('/signup', (req, res) => {
    debug('#POST /signup');

    let tempPassword = req.body.password;
    req.body.password = null;
    delete req.body.password;

    authController.createAccount(req.body, tempPassword)
    .then(token => res.json(token))
    .catch(err => res.status(err.status).send(err));
  });

  router.get('/signin', basicAuth, (req, res) => {
    debug('GET /signin');

    authController.fetchAccount(req.auth)
    .then(token => res.json(token))
    .catch(err => res.status(err.status).send(err));
  });
  return router;
};
