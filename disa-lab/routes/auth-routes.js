'use strict';//Some parts of this need to go into auth-controller, but I don't know what. still figuring it out.
//routes in router, what it does goes in the controller.
const debug = require('debug')('cfgram:auth-routes');
const basicAuth = require('../lib/basic-auth-middleware');
const User = require('../models/user');

module.exports = function(router) {
  router.post('/signup', (req, res) => {
    debug('POST /signup');//debug is "superdope" =D
      //hashtag is just a flag saying you're inside the thing
    let tempPassword = req.body.password; //storing temp password
    req.body.password = null; //
    delete req.body.password;//

    let newUser = new User(req.body);

    return newUser.generatePasswordHash(tempPassword)
    .then(user => user.save())
    .then(user => user.generateToken())
    .then(token => res.json(token))//changes to json format
    .catch(err => res.status(err.status).send(err));
  });

  router.get('/signin', basicAuth, (req, res) => {
    debug('GET /signin');

    return User.findOne({username: req.auth.username})
    .then(user => user.comparePasswordHash(req.auth.password))
    .then(user => user.generateToken())
    .then(token => res.json(token))
    .catch(err => res.status(err.status).send(err));
  });
  return router;
};
