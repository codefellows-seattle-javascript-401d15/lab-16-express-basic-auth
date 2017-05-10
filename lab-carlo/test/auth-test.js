'use strict';

const server = require('../server.js');
const User = require('../model/user');
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;

chai.use(http);

describe('Server Module', function() {

  describe('#POST method', function() {
    after(done => {
      User.findOne({username: 'Carlomari'})
      .then(user => {
        User.findByIdAndRemove(user._id)
        .then(() => done());
      });
    });

    describe('Posting a new User', function(){

      it('should send a 200 status on good request', done => {
        chai.request(server)
        .post('/api/signup')
        .send({username: 'Carlomari', email: 'Carlomari@octopods.com', password: 'abalone'})
        .end((err, res) => {
          expect(res).to.equal(200);
          done();
        });
      });

      it('should send a 400 status on bad request', done => {
        chai.request(server)
        .post('/api/signup')
        .send({username: 'Carlomari', email: 'Carlomari@octopods.com', password: 'abalone'})
        .end((err, res) => {
          expect(res).to.equal(400);
          done();
        });
      });
    });
  });
});
