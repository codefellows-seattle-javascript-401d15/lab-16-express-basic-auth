'use strict';

const debug = require('debug')('cfgram: authRoutes');
const basicAuth = require('../lib/auth-middleware');
// const User = require('../model/user');
const authCtrlr = require('../controller/auth-controller');
// const Promise = require('bluebird');

module.exports = function(router){
  router.post('/signup', (req, res) => {
    debug('#POST signup');

    let tempPass = req.body.password;
    req.body.password = null;
    delete req.body.password;

    return authCtrlr.createUser(req.body, tempPass)
    .then(data => res.json(data))
    .catch(err => res.status(err.status).send(err.name));
  });

  router.get('/signin', basicAuth, (req, res) => {
    debug('#GET signin');

    authCtrlr.fetchUser(req.auth)
    .then(data => res.json(data))
    .catch(err => res.status(err.status).send(err.name));
  });

  return router;
};
