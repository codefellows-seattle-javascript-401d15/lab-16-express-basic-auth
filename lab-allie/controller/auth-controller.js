'use strict';

const createError = require('http-errors');
const Promise = require('bluebird');
const User = require('../models/user.js');

module.exports = exports = {};

exports.signUp = function(req, res) {
  let tempPassword = req.body.password;
  req.body.password = null;
  delete req.body.password;
  
  // console.log('req.body', req.body);
  let newUser = new User(req.body);

  return newUser.generatePasswordHash(tempPassword)
  .then(user => user.save())
  .then(user => {
    // console.log('user', user);
    return user.generateToken();
  })
  .then(token => {
    // console.log('made it to token');
    res.json(token);
  })
  .catch(err => {
    console.error(err);
    res.status(err.status).send(err);
  });
};

exports.signIn = function(reqAuth, res) {
  return User.findOne({username: reqAuth.username})
  .then(user => user.comparePasswordHash(reqAuth.password))
  .then(user => user.generateToken())
  .then(token => res.json(token))
  .catch(err => res.status(err.status).send(err));
};