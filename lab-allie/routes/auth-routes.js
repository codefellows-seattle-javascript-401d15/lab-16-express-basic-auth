'use strict';

const userCtrl = require('../controller/auth-controller.js');

module.exports = function(router) {
  router.post('/signup', (req, res) => {
    userCtrl.signUp(req, res);
  });
  
  router.get('/signin', (req, res) => {
    userCtrl.signIn(req, res);
  });
  
  return router;
};