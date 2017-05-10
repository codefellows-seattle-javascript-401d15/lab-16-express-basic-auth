// 'use strict';
//
// const expect = require('chai').expect;
// const superagent = require('superagent');
// const mongoose = require('mongoose');
// const Promise = require('bluebird');
// const serverCtrl = require('./lib/server-controller');
// const userTestData = require('./lib/user-testdata');
// const galleryTestData = require('./lib/gallery-testdata');
// // const User = require('../models/user');
// // const Gallery = require('../models/gallery');
//
// const url = `http://localhost:${process.env.PORT}`;
//
// const testUser = {
//   username: 'fuckboy',
//   password: '1234',
//   email: 'iheart@penis.com',
// };
//
// const testGallery = {
//   name: 'Naked photo of Glen',
//   desc: '100% nudes rated 21+',
// };
//
// mongoose.Promise = Promise;
//
// describe('Gallery Routes', function() {
//
//   before(serverCtrl.start);
//   after(serverCtrl.close);
//
//   afterEach((done) => {
//     User.remove({})
//
//     .then(() => done())
//     .catch(done);
//   });
//
//
//   // afterEach( done => {
//   //   Promise.all([
//   //     User.remove({}),
//   //     Gallery.remove({})
//   //   ])
//   //   .then(() => done())
//   //   .catch(() => done())
//   // });
//
//   describe('***POST*** /api/gallery', function() {
//     beforeEach(userTestData.bind(this));
//
//
//     describe('A post with valid parameters', function() {
//       it('should return a status 200', (done) => {
//         superagent.post(`${url}/api/gallery`)
//         .send({name: 'test'})
//         .set({
//           Authorization: `Bearer ${this.tempToken}`,
//         })
//         .then((err, res) => {
//           if(err) console.error(err.message);
//           expect(res.status).to.equal(200);
//         });
//         done();
//       });
//     });
//
//     describe('A post with invalid parameters', function() {
//
//       it('should return a status 404 for invalid route', done => {
//         superagent.post(`${url}/api/WRONG URL LOLOLOLOLOL`)
//         .send(testGallery)
//         .set({
//           Authorization: `Bearer ${this.tempToken}`,
//         })
//         .end((err, res) => {
//           if(err) console.error(err.message);
//           expect(res.status).to.equal(404);
//         });
//         done();
//       });
//
//       it('should return a status 400 for no body provided', done => {
//         superagent.post(`${url}/api/gallery`)
//         .send({
//         })
//         .set({
//           Authorization: `Bearer ${this.tempToken}`,
//         })
//         .end((err, res) => {
//           if(err) console.error(err.message);
//           expect(res.status).to.equal(401);
//         });
//         done();
//       });
//
//       it('should return a status 401 UNAUTHORIZED for no token', done => {
//         superagent.post(`${url}/api/signup`)
//         .send(testGallery)
//         .set({
//           Authorization: `Bearer HAHAHAHAHAHAHHAHAHAHAHAHA`,
//         })
//         .end((err, res) => {
//           if(err) console.error(err.message);
//           expect(res.status).to.equal(401);
//         });
//         done();
//       });
//       it('should return a gallery', done => {
//         superagent.post(`${url}/api/gallery`)
//         .send(testGallery)
//         .set({
//           Authorization: `Bearer ${this.tempToken}`,
//         })
//         .end((err, res) => {
//           if(err) return done(err);
//           let date = new Date(res.body.created).toString();
//           expect(res.body.name).to.equal(testGallery.name);
//           expect(res.body.desc).to.equal(testGallery.desc);
//           expect(res.body.userId).to.equal(this.tempUser._id.toString());
//           expect(date).to.not.equal('Invalid Date');
//           done();
//         });
//       });
//     });
//   });
//
//
//   describe('**GET*** /api/gallery/:id', function () {
//
//     before('Create instance of User', userTestData.bind(this));
//     before('Create instance of Gallery from Parent User', galleryTestData.bind(this));
//
//     describe('requests with valid inputs', function() {
//
//       it('should return a status 200 for valid request', (done) => {
//         superagent.get(`${url}/api/gallery/${this.tempGallery._id}`)
//         .set({
//           Authorization: `Bearer ${this.tempToken}`,
//         })
//         .end((err, res) => {
//           if (err) console.error(err.message);
//           expect(res.status).to.equal(200);
//           done();
//         });
//       });
//     });
//
//     describe('requests with INVALID inputs', function() {
//
//       it('should return a status 404 for invalid url', done => {
//         superagent.get(`${url}/api/gallery/badURL`)
//         .set({
//           Authorization: `Bearer ${this.tempToken}`,
//         })
//         .end((err, res) => {
//           if (err) console.error(err.message);
//           expect(res.status).to.equal(404);
//           done();
//         });
//       });
//
//       it('should return a status 401 UNAUTHORIZED for bad token', done => {
//         superagent.get(`${url}/api/gallery/${this.tempGallery._id}`)
//         .set({
//           Authorization: `Bearer HAHAHAHAHA NO TOKEN BROOOOOO`,
//         })
//         .end((err, res) => {
//           if (err) console.error(err.message);
//           expect(res.status).to.equal(401);
//           done();
//         });
//       });
//     });
//
//     it('should return a gallery', done => {
//       superagent.get(`${url}/api/gallery/${this.tempGallery._id}`)
//       .set({
//         Authorization: `Bearer ${this.tempToken}`,
//       })
//       .end((err, res) => {
//         if(err) return done(err);
//         let date = new Date(res.body.created).toString();
//         expect(res.body.name).to.equal(this.tempGallery.name);
//         expect(res.body.desc).to.equal(this.tempGallery.desc);
//         expect(res.body.userId).to.equal(this.tempUser._id.toString());
//         expect(date).to.not.equal('Invalid Date');
//         done();
//       });
//     });
//   });
//
//
//
//   // describe('***PUT*** /api/gallery', function () {
//   //
//   //
//   //
//   //
//   // })
//   //
//   //
//   //
//   //
//   // describe('***DELETE*** /api/gallery', function () {
//   //
//   //
//   //
//   //
//   //
//   // })
//
//
//
// });
