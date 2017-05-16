'use strict';

const debug = require('debug')('cfgram:auth-routes');
const basicAuth = require('../lib/basic-auth-middleware');
const userCtrl = require('../controllers/user-controller');

module.exports = function(router) {
  router.post('/signup', (req, res) => {
    debug('POST /signup');

    userCtrl.createUser(req.headers)
    .then(user => user.save())
    .then(user => user.generateToken())
    .then(token => res.json(token))
    .catch(err => res.status(err.status).send(err));
  });

  router.get('/signin', basicAuth, (req, res) => {
    debug('GET /signin');

    console.log('req obj: ', req.auth);

    userCtrl.userSignin(req.auth)
    .then(user => user.comparePasswordHash(req.auth.password))
    .then(user => user.generateToken())
    .then(token => res.json(token))
    .catch(err => res.status(err.status).send(err));
  });
  return router;
};
