'use strict';

const server = require('../server');
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;
const mockUser = {
  username: 'kaymay1000',
  email: 'k@kay.com',
  password: 'secret',
};

chai.use(http);

describe('server module', function() {
  let app;
  before(done => {
    app = server.listen(5000);
    done();
  });
  after(done => {
    app.close();
    done();
  });
  describe('an unregistered route', function() {
    it('should return a 404 staus code', done => {
      chai.request(server)
      .post('/api/badRoute')
      .send(mockUser)
      .end((err, res) => {
        if(err) console.error(err);
        expect(res.status).to.equal(404);
        done();
      });
    });
  });

  describe('GET method', function() {
    before(done => {
      chai.request(server)
      .post('/api/signup')
      .send(mockUser)
      .end((err) => {
        if(err) console.error(err);
        done();
      });
      after(done => {
        chai.request(server)
        .delete('/api/signin')
        .end(err => {
          if(err) console.error(err);
          done();
        });
      });
    });
    describe('a properly formatted request', function() {
      it('should return a 200 status code given correct username and password', done => {
        chai.request(server)
        .get('/api/signin')
        .auth('kaymay1000', 'secret')
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(200);
          done();
        });
      });
    });
    describe('an improperly formatted request', function() {
      it('should return a 401 status code given an invalid password', done => {
        chai.request(server)
        .get('/api/signin')
        .send({username: 'kaymay1000', password: 'wrong'})
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(401);
          done();
        });
      });
    });
  });

  describe('POST method', function() {
    describe('a properly formatted request', function() {
      it('should return a 200 status code given a valid body', done => {
        chai.request(server)
        .post('/api/signup')
        .send(mockUser)
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(200);
          done();
        });
      });
    });
    describe('an improperly formatted request', function() {
      it('should return a 400 status code if given an invalid body or no body', done => {
        chai.request(server)
        .post('/api/signup')
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
  });
});
