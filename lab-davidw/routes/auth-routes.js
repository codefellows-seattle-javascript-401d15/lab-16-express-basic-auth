'use strict';

const debug = require('debug')('cfgram:auth-routes');
const basicAuth = require('../lib/basic-auth-middleware');
const userCtrl = require('../controllers/user-controller');

module.exports = function(router) {

  router.post('/signup', (req, res) => {
    debug('#POST /signup');
    console.log('in signup route');
    userCtrl.createUser(req, res, req.body);

  });

  router.get('/signin', basicAuth, (req, res) => {
    debug('#GET /signin');

    userCtrl.fetchUser(res, req.auth);

  });
  return router;
};
