'use strict';

const debug = require('debug')('cfgram:auth-routes');
const basicAuth = require('../lib/basic-auth-middleware');
const authCont = require('../controller/controller');

module.exports = function(router) {
  router.post('/signup', (req, res) => {
    debug('POST /signup');

    if(!req.body.username) return res.status(400).send('Username required');
    if(!req.body.password) return res.status(400).send('Password required');
    if(!req.body.email) return res.status(400).send('Email required');

    let tempPassword = req.body.password;
    req.body.password = null;
    delete req.body.password;

    return authCont.createUser(req.body, tempPassword)
    .then(token => res.json(token))
    // .then(token => res.send(token))
    .catch(err => res.status(err.status).send(err.message));
  });

  router.get('/signin', basicAuth, (req, res) => {
    debug('GET /signin');

    return authCont.fetchUser(req.auth)
    .then(data => res.json(data))
    .catch(err => res.status(400).send(err.message));
  });
  return router;
};
