'use strict';

const debug = require('debug')('cfgram:auth-controller');
const User = require('../model/user');
const createError = require('http-errors');


module.exports = exports = {};

exports.createNewUser = function(req, res, user){
  debug('#createNewUser');

  if(!user) return Promise.reject(createError(400, 'bad request'));

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

exports.getNewUser = function(reqAuth, res){
  debug('#getNewUser');
  if(!reqAuth) return Promise.reject(createError(404, 'not found'));


  return User.findOne({username: reqAuth.username})
  .then(user => user.comparePasswordHash(reqAuth.password))
  .then(user => user.generateToken())
  .then(token => res.json(token))
  .catch(err => res.status(err.status).send(err));
};
