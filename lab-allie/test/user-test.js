'use strict';

const server = require('../server.js');
const chai = require('chai');
const expect = chai.expect;
const http = require('chai-http');
// const Promise = require('bluebird');

chai.use(http);

describe('User route tests', function () {
  let app;
  before(done => {
    app = server.listen(8000);
    done();
  });

  describe('POST method', function() {
    describe('create a new user', function() {
      it('should create a new user entry', done => {
        chai.request(server)
        .post('/api/signup')
        .send({'username': 'allie', 'email': 'agrampa@yahoo.com', 'password': 'zeepassword'})
        .end((err, res) => {
          if (err) console.error('oh no!', err);
          console.log('res.auth', res.auth);
          expect(res.body.username).to.equal('allie');
          done();
        });
      });
    });
  });
  
  describe('GET method', function() {});
  
  after(done => {
    app.close();
    done();
  });
});