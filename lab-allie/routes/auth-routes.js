'use strict';

const userCtrl = require('../controller/user-controller.js');
const basicAuth = require('../lib/basic-auth-middleware.js');

module.exports = function(router) {
  router.post('/signup', (req, res) => {
    userCtrl.signUp(req, res);
  });
  
  router.get('/signin', basicAuth, (req, res) => {
    userCtrl.signIn(req.auth, res)
    .then(token => res.json(token))
    .catch(err => res.status(err.status).send(err));
  });
  
  return router;
};