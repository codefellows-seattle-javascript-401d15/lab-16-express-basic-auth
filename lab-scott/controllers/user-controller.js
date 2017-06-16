'use strict'

const User = require('../models/user')

module.exports = exports = {}

exports.createUser = function(reqUser){
  return new User(reqUser).save()

  // return newUser.generatePassHash(tempPass)
  // .then(user => {
  //   console.log('user ', user);
  //   return user.save()})
  // .then(user => user.generateToken())
  // .then(token => res.json(token))
  // .catch(err => {
  //   console.log(err);
  //   res.status(err.status).send(err)
  // })
}

exports.fetchUser = function(id){
  return User.findById(Id)
}
