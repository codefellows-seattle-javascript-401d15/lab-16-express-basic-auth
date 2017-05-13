'use strict';

const debug = require('debug')('cfgram:auth-routes');
const basicAuth = require('../lib/basic-auth-middleware.js');
const User = require('../models/user.js');
const userCtrl = require('../controllers/user-controller.js');

module.exports = function(router){
  router.post('/signup', (req, res) => {
    debug('POST /signup');

    let tempPassword = req.body.password;
    req.body.password = null;
    delete req.body.password;
    userCtrl.createUser(req.body, tempPassword)
    .then(token => res.json(token))
    .catch(err => res.status(404).send(err));
  });

  router.get('/signin', basicAuth, (req, res) => {
    debug('GET /signin');

    return userCtrl.fetchUser(req.auth)
    .then(token => res.json(token))
    .catch(err => res.status(400).send(err));
  });
  return router;
};
