'use strict';

const debug = require('debug')('cfgram:user-testdata');
const User = require('../../models/user.js');

module.exports = function(done) {
  debug('user-testdata');

  new User ({
    username: 'fuckwad',
    email: 'shithead@fuckme.com',
  })
  .generatePasswordHash('123')
  .then(user => user.save())
  .then(user => {
    this.tempUser = user;
    console.log(`user : ${user}`);
    return user.generateToken();
  })
  .then(token => {
    this.tempToken = token;
    done();
  })
  .catch(done);
};
