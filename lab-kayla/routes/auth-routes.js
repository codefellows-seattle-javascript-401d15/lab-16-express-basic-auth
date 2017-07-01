'use strict'

const debug = require('debug')('cfgram:auth-routes')
const authMiddle = require('../controller/auth-middleware')
const User = require('../model/user')

module.exports = function(router) {
  router.post('/signup', (req, res) => {
    debug('#POST /signup')

    let tempPassword = req.body.password
    req.body.password = null
    delete req.body.password

    let newUser = new User(req.body)

    return newUser.generatePasswordHash(tempPassword)
    .then(user => user.save())
    .then(user => user.generateToken())
    .then(token => res.json(token))
    .then(err => res.status(err.status).send(err))
  })
  router.get('/signin', authMiddle, (req,res) => {
    debug('#GET /signin')

    return User.findOne({username: req.auth.username})
    .then(user => user.comparePasswordHash(req.auth.password))
    .then(user => user.generateToken())
    .then(token => res.json(token))
    .catch(err => res.status(err.status).send(err))
  })
  return router
}
