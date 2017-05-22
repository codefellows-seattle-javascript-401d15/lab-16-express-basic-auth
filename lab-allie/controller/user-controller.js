'use strict';

const createError = require('http-errors');
const User = require('../models/user.js');

module.exports = exports = {};

exports.signUp = function(req, res) {
  let tempPassword = null;
  tempPassword = req.body.password;
  req.body.password = null;
  delete req.body.password;
  
  let newUser = new User(req.body);

  return newUser.generatePasswordHash(tempPassword)
  .then(user => user.save())
  .then(user => {
    return user.generateToken();
  })
  .then(token => {
    res.json(token);
  })
  .catch(err => createError(404, err.message));
};

exports.signIn = function(reqAuth, res) {
  return User.findOne({username: reqAuth.username})
  .then(user => user.comparePasswordHash(reqAuth.password))
  .then(user => user.generateToken())
  .then(token => token)
  .catch(err => createError(404, err.message));
};