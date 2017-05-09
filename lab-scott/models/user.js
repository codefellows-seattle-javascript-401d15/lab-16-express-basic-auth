'use strict'

const debug = require('debug')('cfgram:user-model')
const Promise = require('bluebird')
const createError = require('http-errors')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = Schema({
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  findhash: {type: String, unique: true}
})

userSchema.methods.generatePassHash = function(password) {
  debug('#generatePassHash')

  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if(err) return reject(createError(401, 'Password hashing failed'))
      this.password = hash
      console.log(hash, 'hashed pass')
      resolve(this)
    })
  })
}

userSchema.methods.comparePassHash = function(password) {
  debug('#comparePassHash')

  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (err, valid) => {
      if(err) return reject(createError(401, 'Password validation failed'))
      if(!valid) return reject(createError(401, 'Wrong password'))

      resolve(this)
    })
  })
}

userSchema.methods.generateFindHash = function() {
  debug('#generateFindHash')

  return new Promise((resolve, reject) => {
    let tries = 0
    let _generateFindHash = () => {
      this.findHash = crypto.randomBytes(32).toString('hex')
      this.save()
      .then(() => resolve(this.findHash))
      .catch(err => {
        if(tries > 3) return reject(createError(401, 'Generate findhash failed'))
        tries++
        _generateFindHash()
      })
    }

    _generateFindHash()
  })
}

userSchema.methods.generateToken = function() {
  debug('#generateToken')
  return new Promise((resolve, reject) => {
    console.log(process.env.APP_SECRET)
    this.generateFindHash()
    .then(findHash => resolve(jwt.sign({token: findHash}, process.env.APP_SECRET)))
    .catch(err => {
      console.log(err);
      reject(createError(401, 'Generate token failed'))
    })
  })
}

module.exports = mongoose.model('user', userSchema)
