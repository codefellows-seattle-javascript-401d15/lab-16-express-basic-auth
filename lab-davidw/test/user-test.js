'use strict';

const server = require('../server');
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;

// const sampleUser = { username: 'testUser', password: 'wordpass', email: 'test@test.com' };

chai.use(http);

describe('server module', function() {
  let users = [];

  describe('#POST new user method', function() {
    it.only('creating a user should get a 200 response', done => {
      chai.request(server)
      .post('/user')
      .send({ username: 'testUser', password: 'wordpass', email:'test@test.com' })
      .end((err, res) => {
        console.log('Running POST test', res.body);
        let user = JSON.parse(res.body);
        users.push(user);
        expect(res.status).to.equal(200);
        done();
      });
    });

    it('should get a 404 response if requesting a bad route', done => {
      chai.request(server)
      .post('/nada')
      .send({ username: 'testUser', password: 'wordpass', email:'test@test.com' })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });

  });
});
