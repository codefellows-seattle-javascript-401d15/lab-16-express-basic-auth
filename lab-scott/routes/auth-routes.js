'use strict'

const debug = require('debug')('cfgram:auth-routes')
const basicAuth = require('../lib/basic-auth-middleware')
const User = require('../models/user')
const UserCtrl = require('../controllers/user-controller')

module.exports = function(router) {
  router.post('/signup', (req, res) => {
    debug('POST /signup')

    let tempPass = req.body.password
    req.body.password = null
    delete req.body.password

    // let newUser = new User(req.body)
    let newUser = UserCtrl.createUser(req.body)

    return newUser.generatePassHash(tempPass)
    .then(user => {
      console.log('user ', user);
      return user.save()})
    .then(user => user.generateToken())
    .then(token => res.json(token))
    .catch(err => {
      console.log(err);
      res.status(err.status).send(err)
    })
  })

  router.get('/signin', basicAuth, (req, res) => {
    debug('GET /signin')

    return User.findOne({username: req.auth.username})
    .then(user => user.comparePassHash(req.auth.password))
    .then(user => user.generateToken())
    .then(token => res.json(token))
    .catch(err => res.status(err.status).send(err))
  })
  return router
}
