'use strict';

const debug = require('debug')('cfgram:auth-routes');
const basicAuth = require('../lib/basic-auth-middleware');
const authCntrl = require('../controller/auth-controller');

module.exports = function(router) {

  router.post('/signup', (req, res) => {
    debug('POST /signup');

    return authCntrl.createUser(req.body)
    .then(token => res.json(token))
    .catch(err => res.status(400).send(err));
  });

  router.get('/signin', basicAuth, (req, res) => {
    debug('GET /signin');

    return authCntrl.fetchUser(req.auth)
    .then(token => res.json(token))
    .catch(err => res.status(400).send(err));
  });
  return router;
};
