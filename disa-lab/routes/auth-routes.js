'use strict';//Some parts of this need to go into auth-controller, but I don't know what. still figuring it out.
//routes in router, what it does goes in the controller.
const debug = require('debug')('cfgram:auth-routes');
const basicAuth = require('../lib/basic-auth-middleware');
const User = require('../models/user');

module.exports = function(router) {
  router.post('/signup', (req, res) => {
    debug('POST /signup');//debug is "superdope" =D
      //hashtag is just a flag saying you're inside the thing
//stuff goes here
    return authController.createNewUser(req.body)
    .then(token => res.json(token))
    .catch(err => res.status(400).send(err));
  });

  router.get('/signin', basicAuth, (req, res) => {
    debug('GET /signin');

    return authController.authenticateUser(req.auth)
    .then(token => res.json(token))
    .catch(err => res.status(401).send(err));
  });
  return router;
};
