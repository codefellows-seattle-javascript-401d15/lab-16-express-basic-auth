'use strict';

const userCtrl = require('../controller/auth-controller.js');
const basicAuth = require('../lib/basic-auth-middleware.js');

module.exports = function(router) {
  router.post('/signup', (req, res) => {
    userCtrl.signUp(req, res);
  });
  
  router.get('/signin', basicAuth, (req, res) => {
    userCtrl.signIn(req.auth, res);
  });
  
  return router;
};