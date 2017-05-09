'use strict';

const debug = require('debug')('cfgram:auth-routes');
const basicAuth = require('../lib/basic-auth-middleware');
const userController = require('../controller/user-controller');

module.exports = function(router) {

  router.post('/signup', (req, res) => {
    userController.createItem(req, res, req.body);
    debug('POST /signup');
  });

  router.get('/signin', basicAuth, (req, res) => {

    userController.fetchItem(res, req.auth);
    debug('GET /signin');

  });
  return router;
};
