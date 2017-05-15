'use strict';

const debug = require('debug')('doggram:auth-routes');
const basicAuth = require('../lib/basic-auth-middleware');
const userCtrl = require('../controllers/user-controller');

module.exports = function(router) {
  router.post('/signup', (req, res) => {
    debug('POST /signup');
    return userCtrl.createUser(req.body)
    .then(userToken => res.json(userToken))
    .catch(err => res.status(400).send(err.message));
  });

  router.get('/signin', basicAuth, (req, res) => {
    debug('GET /signin');
    return userCtrl.fetchUser(req.auth)
    .then(userToken => res.json(userToken))
    .catch(err => res.status(err.status).send(err.message));
  });
  return router;
};
