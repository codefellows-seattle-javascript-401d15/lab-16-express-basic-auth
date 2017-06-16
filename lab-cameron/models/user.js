'use strict';

const debug = require('debug')('pokegram:user-model');
const Promise = require('bluebird');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  findHash: {type: String, unique: true},
});

userSchema.methods.generatePasswordHash = function(password) {
  debug('#generatePasswordHash');

  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return reject(createError(401, 'password hashing failed'));
      this.password = hash;
      resolve(this);
    });
  });
};

userSchema.methods.comparePasswordHash = function(password) {
  debug('#comparePasswordHash');

  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (err, valid) => {
      if (err) return reject(createError(401, 'password validation failed'));
      if (!valid) return reject(createError(401, 'wrong password'));

      resolve(this);
    });
  });
};

userSchema.methods.generateFindHash = function() {
  debug('#generateFindHash');

  return new Promise((resolve, reject) => {
    let tries = 0;

    _generateFindHash.call(this);

    function _generateFindHash() {
      this.findHash = crypto.randomBytes(32).toString('hex');
      this.save()
      .then(() => resolve(this.findHash))
      .catch(() => {
        if (tries > 3) return reject(createError(401, 'generate findHash failed'));
        tries++;
        _generateFindHash();
      });
    }
  });
};

userSchema.methods.generateToken = function() {
  debug('#generateToken');

  return new Promise((resolve, reject) => {
    console.log(process.env.MONGODB_URI);
    this.generateFindHash()
    .then(findHash => resolve(jwt.sign({token: findHash}, process.env.APP_SECRET)))
    .catch(() => reject(createError(401, 'generate token failed')));
  });
};

module.exports = mongoose.model('user', userSchema);
