'use strict';

const server = require('../server');
const chai = require('chai');
const http = require('chai-http');
const expect = require('chai').expect;

chai.use(http);

describe('Server module tests', () => {
  let app;
  before(done => {
    app = server.listen(8000);
    done();
  });
  after(done => {
    app.close();
    done();
  });
// ====POST====
  describe('POST method', () => {
    describe('request made to /api/signup endpoint', () => {
      describe('a properly formatted request', () => {
        it('should return a 200 response', done => {
          chai.request(server)
          .post('/api/signup')
          .send({username: 'Joe', email: 'joe@gmail.com', password: 'password123'})
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
        });
        it('should return a response body with a token', done => {
          chai.request(server)
          .post('/api/signup')
          .send({username: 'Jane', email: 'jane@gmail.com', password: 'password123'})
          .end((err, res) => {
            expect(res).to.have.be.an('object');
            done();
          });
        });
      });
      describe('an improperly formmated request', () => {

        it('should return a 400 error if no request body provided', done => {
          chai.request(server)
          .post('/api/signup')
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
        });
        it('should return a 404 error for an unregistered route', done => {
          chai.request(server)
          .post('/api/checkin')
          .end((err, res) => {
            expect(res).to.have.status(404);
            done();
          });
        });
      });

    });
  });

// ====GET====
  describe('GET method', () => {
    before(done => {
      chai.request(server)
      .post('/api/signup')
      .send({username: 'Zach', password: 'password123', email: 'zach@gmail.com'})
      .end((err, res) => {
        res.body;
        done();
      });
    });
    after(done => {
      chai.request(server)
      .delete('api/signin')
      .end(() => {
        console.error();
        done();
      });
    });
    describe('requests made to /api/signin endpoint', () => {
      describe('a properly formatted request', () => {
        it('should return a 200 response', done => {
          chai.request(server)
          .get('/api/signin')
          .auth('Zach', 'password123')
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
        });
        it('should return a response body with a token', done => {
          chai.request(server)
          .get('/api/signin')
          .auth('Zach', 'password123')
          .end((err, res) => {
            expect(res).to.be.an('object');
            done();
          });
        });
      });

      describe('an improperly formmated request', () => {
        it('should return a 401 error for invalid user login', done => {
          chai.request(server)
          .get('/api/signin')
          .auth('Zach', 'wrongpassword')
          .end((err, res) => {
            expect(res).to.have.status(401);
            done();
          });
        });
        it('should return a 404 error for unregistered route', done => {
          chai.request(server)
          .get('/api/logmein')
          .auth('Zach', 'wrongpassword')
          .end((err, res) => {
            expect(res).to.have.status(404);
            done();
          });
        });
      });

    });
  });
});
