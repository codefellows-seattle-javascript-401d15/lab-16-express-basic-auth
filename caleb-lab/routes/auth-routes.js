'use strict';

const debug = require('debug')('cfgram:auth-routes');
const basicAuth = require('../lib/basic-auth-middleware.js');
const User = require('../models/user.js');

module.exports = function(router){
  router.post('/signup', (req, res) => {
    debug('POST /signup');

    let tempPassword = req.body.password;
    req.body.password = null; //this is an extra option to destroy the req.body.password data
    delete req.body.password;

    let user = new User(req.body);

    user.generatePasswordHash(tempPassword)
    .then(user => user.save())
    .then(user => user.generateToken())
    .then(token => res.json(token))
    .catch(err => res.status(err.status).send(err));
  });

  router.get('/signin', basicAuth, (req, res) => {
    debug('GET /signin');

    User.findOne({username: req.auth.username})
    .then(user => user.comparePasswordHash(req.auth.password))
    .then(user => user.generateToken())
    .then(token => res.json(token))
    .catch(err => res.status(400).send(err));
  });
  return router;
};
