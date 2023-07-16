const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../../server.js');
const Concert = require('../../../concert.model.js');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('POST /api/concerts', () => {
  before(async () => {
    const testConcertOne = new Concert({
      _id: '5d9f1140f10a81216cfd4408',
      performer: 'John Doe',
      genre: 'Rock',
      price: 25,
      day: 1,
      image: '/img/uploads/1fsd324fsdg.jpg',
    });
    await testConcertOne.save();
  });
  it('should insert new document to db and return success', async () => {
    const res = await request(server).post('/api/concerts').send({performer: 'Rebekah Parker', genre: 'R&B', price: 25, day: 1, image: '/img/uploads/2f342s4fsdg.jpg'});
    const newConcert = await Concert.findOne({performer: 'Rebekah Parker'});
    expect(res.status).to.be.equal(201);
    expect(res.body.message).to.be.equal('OK');
    expect(newConcert).to.not.be.null;
  });
  after(async () => {
    await Concert.deleteMany();
  });
});