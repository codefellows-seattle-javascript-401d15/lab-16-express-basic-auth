const Promise = require('bluebird');
//const createError = require('http-errors');
const User = require('../model/user');

module.exports = exports = {};

exports.createUser = function(body) {
  // if(!body) return Promise.reject(createError(404, 'Body is required'));

  let tempPassword = body.password;
  body.password = null; //extra safety that password is not persisted in req body
  delete body.password;

  let newUser = new User(body);

  return newUser.generatePasswordHash(tempPassword)
  .then(user => user.save())
  .then(user => user.generateToken())
  .then(token => Promise.resolve(token))
  .catch(err => Promise.reject(err));
};

exports.fetchUser = function(auth) {
  // if(!auth) return Promise.reject(createError(400, 'Body is required'));

  return User.findOne({username: auth.username})
  .then(user => user.comparePasswordHash(auth.password))
  .then(user => user.generateToken())
  .then(token => Promise.resolve.json(token))
  .catch(err => Promise.reject(err));

};
