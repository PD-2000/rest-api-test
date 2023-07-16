const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../../server.js');
const Concert = require('../../../concert.model.js');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('DELETE /api/concerts', () => {
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

    const testConcertTwo = new Concert({
      _id: '5d9f1140f10a81216cfd4407',
      performer: 'Rebekah Parker',
      genre: 'R&B',
      price: 25,
      day: 1,
      image: '/img/uploads/2f342s4fsdg.jpg',
    });
    await testConcertTwo.save();
  });
  it('/:id should delete chosen document and return success', async () => {
    const res = await request(server).delete('/api/concerts/5d9f1140f10a81216cfd4408');
    const deletedConcert = await Concert.findOne({performer: 'John Doe'});
    expect(res.status).to.be.equal(200);
    expect(res.body.message).to.be.equal('OK');
    expect(deletedConcert).to.be.null;
  });
  after(async () => {
    await Concert.deleteMany();
  });
});