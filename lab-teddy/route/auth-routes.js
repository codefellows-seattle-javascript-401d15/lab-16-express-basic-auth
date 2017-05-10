'use strict';

const debug = require('debug')('cfgram:auth-routes');
const basicAuth = require('../lib/basic-auth-middleware');
const authControl = require('../controller/auth-controller');

module.exports = function(router) {
  router.post('/signup', (req, res) => {
    debug('POST /signup');
    authControl.createNewUser(req, res);
  });

  router.get('/signin', basicAuth, (req, res) => {
    debug('GET /signin');
    authControl.getNewUser(req.auth, res);
  });
  return router;
};
