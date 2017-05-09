'use strict';

const debug = require('debug')('cfgram:auth-controller');
const User = require('../model/user');
const Promise = require('bluebird');


module.exports = exports = {};

exports.createNewUser = function(req, res){
  debug('#createNewUser');

  let tempPassword = req.body.password;
  req.body.password = null;
  delete req.body.password;

  let newUser = new User(req.body);

  return newUser.generatePasswordHash(tempPassword)
  .then(user => user.save())
  .then(user => user.generateToken())
  .then(token => res.json(token))
  .catch(err => Promise.reject(err));
};

exports.getNewUser = function(reqAuth, res){
  debug('#getNewUser');


  return User.findOne({username: reqAuth.username})
  .then(user => user.comparePasswordHash(reqAuth.password))
  .then(user => user.generateToken())
  .then(token => res.json(token))
  .catch(err => Promise.reject(err));
};
