'use strict';

const expect = require('chai').expect;
const mongoose = require('mongoose');
const Promise = require('bluebird');
const serverCtrl = require('./lib/server-controller');
const superagent = require('superagent');
const User = require('../models/user');
const Gallery = require('../models/gallery');

const url = `http://localhost:${process.env.PORT}`;

const exampleUser = {
  username: 'exampleuser',
  password: '1234',
  email: 'exampleuser@test.com',
};

const exampleGallery = {
  name: 'test gallery',
  desc: 'test gallery description',
};

mongoose.Promise = Promise;

describe('Gallery Routes', function() {

  before(serverCtrl.start);
  after(serverCtrl.close);

  after(done => {
    Promise.all([
      User.remove({}),
      Gallery.remove({}),
    ])
    .then(() => done())
    .catch(() => done());
  });

  describe('###POST### /api/gallery', () => {
    before(done => {
      new User(exampleUser)
      .generatePasswordHash(exampleUser.password)
      .then(user => user.save())
      .then(user => {
        this.tempUser = user;
        console.log('temp user', this.tempUser);
        return user.generateToken();
      }).then(token => {
        this.tempToken = token;
        done();
      }).catch(() => done());
    });

    it('should return a gallery', done => {
      superagent.post(`${url}/api/gallery`)
      .send(exampleGallery)
      .set({Authorization: `Bearer ${this.tempToken}`})
      .end((err, res) => {
        if (err)
          return done(err);
        let date = new Date(res.body.created).toString();
        expect(res.body.name).to.equal(exampleGallery.name);
        expect(res.body.desc).to.equal(exampleGallery.desc);
        expect(res.body.userId).to.equal(this.tempUser._id.toString());
        expect(date).to.not.equal('Invalid Date');
        done();
      });
    });

    it('should return a status 200', (done) => {
      superagent.post(`${url}/api/gallery`)
      .send({exampleGallery})
      .set({Authorization: `Bearer ${this.tempToken}`})
      .then((err, res) => {
        if (err)
          console.error(err.message);
        expect(res.status).to.equal(200);
      });
      done();
    });

    it('should return a status 404 for invalid route', done => {
      superagent.post(`${url}/api/WRONG URL LOLOLOLOLOL`)
      .send(exampleGallery)
      .set({
        Authorization: `Bearer ${this.tempToken}`,
      })
      .end((err, res) => {
        if(err) console.error(err.message);
        expect(res.status).to.equal(404);
      });
      done();
    });

    it('should return a status 401 for no body provided', done => {
      superagent.post(`${url}/api/gallery`)
      .send('}')
      .set({
        Authorization: `Bearer ${this.tempToken}`,
      })
      .end((err, res) => {
        if(err) console.error(err.message);
        expect(res.status).to.equal(400);
      });
      done();
    });

    it('should return a status 401 UNAUTHORIZED for bad token', done => {
      superagent.post(`${url}/api/gallery`)
      .send(exampleGallery)
      .set({
        Authorization: `Bearer badtoken`,
      })
      .end((err, res) => {
        if(err) console.error(err.message);
        expect(res.status).to.equal(401);
      });
      done();
    });

  });

  describe('###GET### /api/gallery/:id', () => {
    before(done => {
      new User(exampleUser)
      .generatePasswordHash(exampleUser.password)
      .then(user => user.save()).then(user => {
        this.tempUser = user;
        return user.generateToken();
      }).then(token => {
        this.tempToken = token;
        done();
      }).catch(() => done());
    });

    before(done => {
      exampleGallery.userId = this.tempUser._id.toString();
      new Gallery(exampleGallery).save()
      .then(gallery => {
        this.tempGallery = gallery;
        done();
      })
      .catch(() => done());
    });

    after(() => {
      delete exampleGallery.userId;
    });

    it('should return a status 404 for invalid route', done => {
      superagent.get(`${url}/api/WRONG URL LOLOLOLOLOL`)
      .send(exampleGallery)
      .set({
        Authorization: `Bearer ${this.tempToken}`,
      })
      .end((err, res) => {
        if(err) console.error(err.message);
        expect(res.status).to.equal(404);
      });
      done();
    });

    it('should return a status 401 UNAUTHORIZED for bad token', done => {
      superagent.get(`${url}/api/gallery/${this.tempGallery._id}`)
      .send(exampleGallery)
      .set({
        Authorization: `Bearer HAHAHAHAHAHAHHAHAHAHAHAHA`,
      })
      .end((err, res) => {
        if(err) console.error(err.message);
        expect(res.status).to.equal(401);
      });
      done();
    });

    it('should return a gallery and status 200', done => {
      superagent.get(`${url}/api/gallery/${this.tempGallery._id}`)
      .set({Authorization: `Bearer ${this.tempToken}`})
      .end((err, res) => {
        if (err)
          return done(err);
        let date = new Date(res.body.created).toString();
        expect(res.body.name).to.equal(exampleGallery.name);
        expect(res.body.desc).to.equal(exampleGallery.desc);
        expect(res.body.userId).to.equal(this.tempUser._id.toString());
        expect(date).to.not.equal('Invalid Date');
        expect(res.status).to.equal(200);
        done();
      });
    });
  });

  describe('###PUT### /api/gallery', function() {
    before(done => {
      new User(exampleUser)
      .generatePasswordHash(exampleUser.password)
      .then(user => user.save()).then(user => {
        this.tempUser = user;
        return user.generateToken();
      }).then(token => {
        this.tempToken = token;
        done();
      }).catch(() => done());
    });

    before(done => {
      exampleGallery.userId = this.tempUser._id.toString();
      new Gallery(exampleGallery).save()
      .then(gallery => {
        this.tempGallery = gallery;
        done();
      })
      .catch(() => done());
    });

    after(() => {
      delete exampleGallery.userId;
    });

    it('should return a status 404 for invalid route', done => {
      superagent.put(`${url}/api/WRONG URL LOLOLOLOLOL`)
      .send(exampleGallery)
      .set({
        Authorization: `Bearer ${this.tempToken}`,
      })
      .end((err, res) => {
        if(err) console.error(err.message);
        expect(res.status).to.equal(404);
      });
      done();
    });

    it('should return a status 401 UNAUTHORIZED for bad token', done => {
      superagent.put(`${url}/api/gallery/${this.tempGallery._id}`)
      .send(exampleGallery)
      .set({
        Authorization: `Bearer HAHAHAHAHAHAHHAHAHAHAHAHA`,
      })
      .end((err, res) => {
        if(err) console.error(err.message);
        expect(res.status).to.equal(401);
      });
      done();
    });

    it('should return a status 401 for no body provided', done => {
      superagent.put(`${url}/api/gallery/${this.tempGallery._id}`)
      .send('}{')
      .set({
        Authorization: `Bearer ${this.tempToken}`,
      })
      .end((err, res) => {
        if(err) console.error(err.message);
        expect(res.status).to.equal(401);
      });
      done();
    });

    it('should update a gallery and return status 200', done => {
      console.log(this.tempGallery);
      console.log(this.tempGallery._id);
      superagent.put(`${url}/api/gallery/${this.tempGallery._id}`)
      .send({name: 'changed',
        desc: 'shitty gallery'})
      .set({Authorization: `Bearer ${this.tempToken}`})
      .end((err, res) => {
        console.log(this.tempGallery);
        if (err)
          return done(err);
        expect(this.tempGallery.name).to.equal('shitty gallery');
        expect(res.status).to.equal(200);
      });
      done();
    });
  });

  describe('###DELETE### /api/gallery', function() {

    before(done => {
      new User(exampleUser)
      .generatePasswordHash(exampleUser.password)
      .then(user => user.save()).then(user => {
        this.tempUser = user;
        return user.generateToken();
      }).then(token => {
        this.tempToken = token;
        done();
      }).catch(() => done());
    });

    before(done => {
      exampleGallery.userId = this.tempUser._id.toString();
      new Gallery(exampleGallery).save()
      .then(gallery => {
        this.tempGallery = gallery;
        done();
      })
      .catch(() => done());
    });

    after(() => {
      delete exampleGallery.userId;
    });

    it('should delete a gallery and return status 204', done => {
      superagent.delete(`${url}/api/gallery/${this.tempGallery._id}`)
      .set({Authorization: `Bearer ${this.tempToken}`})
      .end((err, res) => {
        if (err)
          return done(err);
        expect(res.status).to.equal(204);
      });
      done();
    });

    it('should return a status 404 for invalid route', done => {
      superagent.delete(`WRONG URL`)
      .set({
        Authorization: `Bearer ${this.tempToken}`,
      })
      .end((err, res) => {
        if(err) console.error(err.message);
        expect(res.status).to.equal(404);
      });
      done();
    });

    it('should return a status 401 UNAUTHORIZED for bad token', done => {
      superagent.delete(`${url}/api/gallery/${this.tempGallery._id}`)
      .set({
        Authorization: `Bearer LOLOLOLOLOL`,
      })
      .end((err, res) => {
        if(err) console.error(err.message);
        expect(res.status).to.equal(401);
      });
      done();
    });
  });
});
