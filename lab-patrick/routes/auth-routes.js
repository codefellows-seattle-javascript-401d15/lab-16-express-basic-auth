
'use strict';

const basicAuth = require('../lib/basic-auth-middleware');
const authController = require('../controller/auth-controller');

module.exports = function(router) {
  router.post('/signup', (req, res) => {
    authController.createItem(req, res, req.body);

  });

  router.get('/signin', basicAuth, (req, res) => {
    authController.fetchItem(res, req.auth);

  });
  return router;
};
