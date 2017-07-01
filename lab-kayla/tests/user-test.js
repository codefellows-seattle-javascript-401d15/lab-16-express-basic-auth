'use strict'

const server = require('../server');
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;

chai.use(http);

describe('server testing', function() {
  let app;
  before(done => {
    app = server.listen(3000);
    done();
  })

  describe('POST method', function() {
    describe('/api/signup ', function() {
      it('should return a 200 response', done => {
        chai.request(server)
        .post('/api/signup')
        .send({username:'Kayla', email:'kasay@gmail.com', password: 'ABC123'})
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(200);
          done();
        })
      })
    })
  })

  after(done => {
    app.close();
    done();
  });
})
