'use strict';

const debug = require('debug')('cfgram:auth-routes');
const basicAuth = require('../lib/basic-auth-middleware');
const userCtrl = require('../controllers/user-controller');

module.exports = function(router) {

  router.post('/signup', (req, res) => {
    debug('#POST /signup');
    userCtrl.createUser(req, res)
    .then((user) => res.send('user created', user))
    .catch((err) => res.send(err.message));
  });

  router.get('/signin', basicAuth, (req, res) => {
    debug('#GET /signin');

    userCtrl.fetchUser(res, req.auth)
    .then;

  });

  return router;
};
