'use strict';

// routes call controller code.

const debug = require('debug')('cfgram:auth-routes');
const User = require('../models/user');
const createError = require('http-errors');

module.exports = exports = {};

exports.createUser = function(reqBody, tempPass){
  debug('#createUser');
  let newUser = new User(reqBody);

  return newUser.generatePasswordHash(tempPass)
  .then(user => user.save())
  .then(user => user.generateToken())
  .catch(err => createError(401, err.message));
};

exports.fetchUser = function(reqAuth){
  debug('#fetchUser');

  return User.findOne({username: reqAuth.username})
  .then(user => user.comparePasswordHash(reqAuth.password))
  .then(user => user.generateToken())
  .catch(err => err.status().send(err));
};

























// REFERENCE cb
// const debug = require('debug')('pokegram:auth-controller');
// const User = require('../models/user');
//
// module.exports = exports = {};
//
// exports.createNewUser = function(body) {
//   debug('#createNewUser');
//
//   let tempPassword = body.password;
//   body.password = null;
//   delete body.password;
//
//   let newUser = new User(body);
//   return newUser.generatePasswordHash(tempPassword)
//   .then(user => user.save())
//   .then(user => user.generateToken())
//   .then(token => Promise.resolve(token))
//   .catch(err => Promise.reject(err));
// };
//
// exports.authenticateUser = function(auth) {
//   debug('#authenticateUser');
//
//   return User.findOne({username: auth.username})
//   .then(user => user.comparePasswordHash(auth.password))
//   .then(user => user.generateToken())
//   .then(token => Promise.resolve(token))
//   .catch(err => Promise.reject(err));
// };

// FROM ROUTES

// const debug = require('debug')('cfgram:auth-routes');
// const basicAuth = require('../lib/basic-auth-middleware');
// const User = require('../models/user');
//
// module.exports = function(router) {
//   router.post('/signup', (req, res) => {
//     debug('POST /signup');
//
//     let tempPassword = req.body.password;
//     req.body.password = null;
//     delete req.body.password;
//
//     let newUser = new User(req.body);
//
//     return newUser.generatePasswordHash(tempPassword)
//     .then(user => user.save())
//     .then(user => user.generateToken())
//     // Put above in controller.
//     .then(token => res.json(token))
//     .catch(err => res.status(err.status).send(err));
//   });
//
//   router.get('/signin', basicAuth, (req, res) => {
//     debug('GET /signin');
//
//     return User.findOne({username: req.auth.username})
//     .then(user => user.comparePasswordHash(req.auth.password))
//     .then(user => user.generateToken())
//     .then(token => res.json(token))
//     // Put above in controller.
//     .catch(err => res.status(err.status).send(err));
//   });
//   return router;
// };
