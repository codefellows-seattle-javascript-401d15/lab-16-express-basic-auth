'use strict';

const debug = require('debug')('cfgram:auth-routes');
const User = require('../models/user');

module.exports = exports = {};

exports.createNewUserProf = function(body) {
  debug('createNewUserProf');

  let tempPass = body.password;
  body.password = null;
  delete body.password;

  let newUserProf = new User(body);

  return newUserProf.generatePasswordHash(tempPass)
  .then(user => user.save())
  .then(user => user.generateToken())
  .then(token => Promise.resolve(token))
  .catch(err => Promise.reject(err));

};

exports.authenticateUserProf = function(auth) {
  debug('authenticateUserProf');

  return User.findOne({username: auth.username})
  .then(user => user.comparePasswordHash(auth.password))
  .then(user => generateToken())
  .then(token => Promise.resolve(token))
  .catch(err => Promise.reject(err));
};
