'use strict';

const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const createError = require('http-errors');
const debug = require('debug')('cfgram: user.js');
mongoose.Promise = Promise;

const Schema = mongoose.Schema;

const userSchema = Schema({
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  findHash: {type: String, unique: true},
});

userSchema.methods.genPassHash = function(password){
  debug('#genPassHash');

  return new Promise((resolve, reject) => {
    if(!password) return reject(createError(400, 'Password required'));
    bcrypt.hash(password, 10, (err, hash) => {
      if(err) return reject(createError(401, 'Password hashing failed'));
      this.password = hash;
      resolve(this);
    });
  });
};

userSchema.methods.compareHash = function(password){
  debug('#compareHash');

  return new Promise((resolve, reject) => {
    if(!password) return reject(createError(400, 'Password required'));
    bcrypt.compare(password, this.password, (err, valid) => {
      if(err) return reject(createError(401, 'Password validation failed'));
      if(!valid) return reject(createError(401, 'Wrong password'));
      resolve(this);
    });
  });
};

userSchema.methods.genFindHash = function(){
  debug('#genFindHash');

  return new Promise((resolve, reject) => {
    let tries = 0;
    let _genFindHash = () => {
      this.findHash = crypto.randomBytes(32).toString('hex');
      this.save()
      .then(() => resolve(this.findHash))
      .catch(err => {
        if(tries > 3) reject(createError(401, 'Generate Find Hash failed'));
        console.log(err);
        tries++;
        _genFindHash();
      });
    };
    _genFindHash();
  });
};

userSchema.methods.genToken = function(){
  debug('#genToken');

  return new Promise((resolve, reject) => {
    this.genFindHash()
    .then(findHash => resolve(jwt.sign({token: findHash}, process.env.APP_SECRET)))
    .catch(err => {
      console.log(err);
      reject(createError(401, 'Generate token failed'));
    });
  });
};

module.exports = mongoose.model('user', userSchema);
