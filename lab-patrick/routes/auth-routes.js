
'use strict';

const basicAuth = require('../lib/basic-auth-middleware');
const User = require('../models/user');

module.exports = function(router) {
  router.post('/signup', (req, res) => {

    let tempPassword = req.body.password;
    req.body.password = null;
    delete req.body.password;

    let newUser = new User(req.body);

    return newUser.generatePasswordHash(tempPassword)
    .then(user => user.save())
    .then(user => user.generateToken())
    .then(token => res.json(token))
    .catch(err => console.error(err));
  });

  router.get('/signin', basicAuth, (req, res) => {

    return User.findOne({username: req.auth.username})
    .then(user => user.comparePasswordHash(req.auth.password))
    .then(user => user.generateToken())
    .then(token => res.json(token))
    .catch(err => console.error(err));
  });
  return router;
};
