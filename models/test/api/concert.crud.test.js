const {DB_URI} = require('../../../const');
const Concert = require('../../../models/concert.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Concert', () => {
  before(async () => {
    try{
      mongoose.connect(DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
    }
    catch(err){
      console.error(err);
    }
  });
  describe('Reading data', () => {
    before(async () => {
      const testConcertOne = new Concert({
        performer: 'John Doe',
        genre: 'Rock',
        price: 25,
        day: 1,
        image: '/img/uploads/1fsd324fsdg.jpg',
      });
      await testConcertOne.save();

      const testConcertTwo = new Concert({
        performer: 'Rebekah Parker',
        genre: 'R&B',
        price: 25,
        day: 1,
        image: '/img/uploads/2f342s4fsdg.jpg',
      });
      await testConcertTwo.save();
    });
    after(async () => {
      await Concert.deleteMany();
    });
    it('should return all the data with "find" method', async () => {
      const concerts = await Concert.find();
      const expectedLength = 2;
      expect(concerts.length).to.be.equal(expectedLength);
    });
    it('should return proper document by various params with "findOne" method', async () => {
      const concert = await Concert.findOne({performer: 'John Doe'});
      expect(concert.performer).to.be.equal('John Doe');
    });
    after(async () => {
      await Concert.deleteMany();
    });
  });
  describe('Creating data', () => {
    it('should insert new document with "insertOne" method', async () => {
      const concert = new Concert({
        performer: 'John Doe',
        genre: 'Rock',
        price: 25,
        day: 1,
        image: '/img/uploads/1fsd324fsdg.jpg',
      });
      await concert.save();
      expect(concert.isNew).to.be.false;
    });
    after(async () => {
      await Concert.deleteMany();
    });
  });
  describe('Updating data', () => {
    beforeEach(async () => {
      const testConcertOne = new Concert({
        performer: 'John Doe',
        genre: 'Rock',
        price: 25,
        day: 1,
        image: '/img/uploads/1fsd324fsdg.jpg',
      });
      await testConcertOne.save();

      const testConcertTwo = new Concert({
        performer: 'Rebekah Parker',
        genre: 'R&B',
        price: 25,
        day: 1,
        image: '/img/uploads/2f342s4fsdg.jpg',
      });
      await testConcertTwo.save();
    });
    it('should properly update one document with "updateOne" method', async () => {
      await Concert.updateOne({performer: 'John Doe'}, {$set: {performer: 'Updated1'}});
      const updatedConcert = await Concert.findOne({performer: 'Updated1'});
      expect(updatedConcert).to.not.be.null;
    });
    it('should properly update one document with "save" method', async () => {
      const concert = await Concert.findOne({performer: 'Rebekah Parker'});
      concert.performer = 'Updated2';
      await concert.save();

      const updatedConcert = await Concert.findOne({performer: 'Updated2'});
      expect(updatedConcert).to.not.be.null;
    });
    it('should properly update multiple documents with "updateMany" method', async () => {
      await Concert.updateMany({}, {$set: {performer: 'Updated!'}});
      const concerts = await Concert.find({performer: 'Updated!'});
      expect(concerts.length).to.be.equal(2);
    });
    afterEach(async () => {
      await Concert.deleteMany();
    });
  });
  describe('Removing data', () => {
    beforeEach(async () => {
      const testConcertOne = new Concert({
        performer: 'John Doe',
        genre: 'Rock',
        price: 25,
        day: 1,
        image: '/img/uploads/1fsd324fsdg.jpg',
      });
      await testConcertOne.save();

      const testConcertTwo = new Concert({
        performer: 'Rebekah Parker',
        genre: 'R&B',
        price: 25,
        day: 1,
        image: '/img/uploads/2f342s4fsdg.jpg',
      });
      await testConcertTwo.save();

      const testConcertThree = new Concert({
        performer: 'Jeck Black',
        genre: 'Rock',
        price: 25,
        day: 1,
        image: '/img/uploads/2f342s4fsdg.jpg',
      });
      await testConcertThree.save();

      const testConcertFour = new Concert({
        performer: 'Mia Khalifa',
        genre: 'R&B',
        price: 25,
        day: 1,
        image: '/img/uploads/2f342s4fsdg.jpg',
      });
      await testConcertFour.save();
    });
    it('should properly remove one document with "deleteOne" method', async () => {
      await Concert.deleteOne({performer: 'John Doe'});
      const removeConcert = await Concert.findOne({performer: 'John Doe'});
      expect(removeConcert).to.be.null;
    });
    it('should properly remove one document with "remove" method', async () => {
      const concert = await Concert.findOne({performer: 'Rebekah Parker'});
      await concert.remove();
      const removedConcert = await Concert.findOne({performer: 'Rebekah Parker'});
      expect(removedConcert).to.be.null;
    });
    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Concert.deleteMany();
      const concerts = await Concert.find();
      expect(concerts.length).to.be.equal(0);
    });
    afterEach(async () => {
      await Concert.deleteMany();
    });
  });
  after(() => {
    mongoose.models = {};
  });
});