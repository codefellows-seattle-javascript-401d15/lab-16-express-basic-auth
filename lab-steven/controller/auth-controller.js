'use strict';

const debug = require('debug')('cfgram: auth-controller');
const User = require('../model/user');

module.exports = exports = {};

exports.createUser = function(reqBody, tempPw){
  debug('#createUser');

  let newUser = new User(reqBody);
  return newUser.genPassHash(tempPw)
  .then(user => user.save())
  .then(user => user.genToken())
  .catch(err => Promise.reject(err));
};

exports.fetchUser = function(reqAuth){
  debug('#createUser');

  return User.findOne({username: reqAuth.username})
  .then(user => user.compareHash(reqAuth.password))
  .then(user => user.genToken())
  .catch(err => Promise.reject(err));
};
