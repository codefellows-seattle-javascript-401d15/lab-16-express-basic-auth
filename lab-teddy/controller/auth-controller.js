'use strict';

const debug = require('debug')('cfgram:auth-controller');
const User = require('../module/user');

module.exports = exports = {};

exports.module.createNewUser = function(req, res){
  debug('#createNewUser');

  let tempPassword = req.body.password;
  req.body.password = null;
  delete req.body.password;

  let newUser = new User(req.body);

  return newUser.generatePasswordHash(tempPassword)
  .then(user => user.save())
  .then(user => user.generateToken())
  .then(token => res.json(token))
  .catch(err => res.status(err.status).send(err));
};

exports.module.getNewUser = function(req, res){
  debug('#getNewUser');

  return User.findOne({username: req.auth.username})
  .then(user => user.comparePasswordHash(req.auth.password))
  .then(user => user.generateToken())
  .then(token => res.json(token))
  .catch(err => res.status(err.status).send(err));
};
