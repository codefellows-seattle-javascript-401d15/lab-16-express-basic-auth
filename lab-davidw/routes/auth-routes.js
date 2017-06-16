'use strict';

const debug = require('debug')('cfgram:auth-routes');
const basicAuth = require('../lib/basic-auth-middleware');
const userCtrl = require('../controllers/auth-controller');

module.exports = function(router) {

  router.post('/signup', (req, res) => {
    debug('#POST /signup');
    userCtrl.createUser(req)
    .then((token) => res.json(token))
    .catch((err) => res.status(err.status).send(err.message));

  });

  router.get('/signin', basicAuth, (req, res) => {
    debug('#GET /signin');
    userCtrl.fetchUser(req.auth)
    .then((data) => res.json(data))
    .catch((err) => res.status(err.status).send(err.message));
  });

  return router;
};
