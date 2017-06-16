'use strict';

const debug = require('debug')('cfgram:auth-routes');
const basicAuth = require('../lib/basic-auth-middleware');
const userController = require('../controller/user-controller');

module.exports = function(router) {

  router.post('/signup', (req, res) => {
    debug('#POST /signup');
    userController.createItem(req, req.body)
    .then(token => res.json(token))
    .catch(err => res.status(err.status).send(err));
  });

  router.get('/signin', basicAuth, (req, res) => {
    debug('#GET /signin');

    userController.fetchItem(req.auth)
    .then(data => res.json(data))
    .catch(err => res.status(err.status).send(err));

  });
  return router;
};
