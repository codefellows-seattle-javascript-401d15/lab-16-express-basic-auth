'use strict';

const debug = require('debug')('cfgram:auth-routes');
const basicAuth = require('../lib/basic-auth-middleware');
const userController = require('../controller/user-controller');

module.exports = function(router) {

  router.post('/signup', (req, res) => {
    console.log(req.body);
    userController.createItem(req, res, req.body);
    console.log('in router');
    debug('POST /signup');


    // let tempPassword = req.body.password;
    // req.body.password = null;
    // delete req.body.password;
    //
    // let newUser = new User(req.body);
    //
    // return newUser.generatePasswordHash(tempPassword)
    // .then(user => user.save())
    // .then(user => user.generateToken())
    // .then(token => res.json(token))
    // .catch(err => res.status(err.status).send(err));
  });

  router.get('/signin', basicAuth, (req, res) => {

    userController.fetchItem(res, req.auth);
    debug('GET /signin');

    // return User.findOne({username: req.auth.username})
    // .then(user => user.comparePasswordHash(req.auth.password))
    // .then(user => user.generateToken())
    // .then(token => res.json(token))
    // .catch(err => res.status(err.status).send(err));
  });
  return router;
};
