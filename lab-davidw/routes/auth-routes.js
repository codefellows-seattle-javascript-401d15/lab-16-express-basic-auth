'use strict';

const debug = require('debug')('cfgram:auth-routes');
const basicAuth = require('basic-auth-middleware');
const user = require('./user');

module.exports = function(router) {
  router.post('/signup', (req, res) => {
    debug('#POST /signup');

    let tempPassword = req.body.password;
    req.body.password = null;
    delete req.body.password;

    let newUser = new User(req.body);

    newUser.generatePasswordhash(tempPassword)
    .then(user => user.save())
    .then(user => user.generateToken())
    .then(token => res.json(token))
    .catch(err => res.send(err));
  });

  router.get('/signin', (req, res) => {
    debug('#GET /signin');

    User.findOne({username: req.auth.username})
    .then(user => user.comparePasswordHash(req.auth.password))
    .then(user => user.generateToken())
    .then(token => res.jon(token))
    .catch(err => res.status(err.status).send(err));
  });
  return router;
};
