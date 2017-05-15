'use strict';

const Dog = require('../models/dog');
const expect = require('chai').expect;

describe('dog module', () => {
  describe('when creating a new Dog object', () => {
    let newDog = new Dog({name: 'Joe Joe', breed: 'bichon frise'});
    it('should have a name of "Joe Joe"', done => {
      expect(newDog.name).to.equal('Joe Joe');
      done();
    });
    it('should have a breed of "bichon frise"', done => {
      expect(newDog.breed).to.equal('bichon frise');
      done();
    });
    it('should have a property of "_id"', done => {
      expect(newDog).to.have.property('_id');
      done();
    });
  });
});
