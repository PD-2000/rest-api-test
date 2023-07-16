const Concert = require('../../concert.model.js');
const expect = require('chai').expect;

describe('Concert', () => {
  it('should throw an error if any argument is missing', () => {
    const concert = new Concert({});

    concert.validate((err) => {
      expect(err.errors.performer).to.exist;
      expect(err.errors.genre).to.exist;
      expect(err.errors.price).to.exist;
      expect(err.errors.day).to.exist;
      expect(err.errors.image).to.exist;
    });
  });
  it('should throw an error if "performer", "genre", "image" is not a string', () => {
    const cases = [{}, []];

    for(let performer of cases){
      const concert = new Concert({performer});

      concert.validate((err) => {
        expect(err.errors.performer).to.exist;
      });
    }
    for(let genre of cases){
      const concert = new Concert({genre});

      concert.validate((err) => {
        expect(err.errors.genre).to.exist;
      });
    }
    for(let image of cases){
      const concert = new Concert({image});

      concert.validate((err) => {
        expect(err.errors.image).to.exist;
      });
    }
  });
  it('should throw an error if "price", "day" is not a number', () => {
    const cases = [{}, [], 'string'];

    for(let price of cases){
      const concert = new Concert({price});

      concert.validate((err) => {
        expect(err.errors.price).to.exist;
      });
    }
    for(let day of cases){
      const concert = new Concert({day});

      concert.validate((err) => {
        expect(err.errors.day).to.exist;
      });
    }
  });
  it('should not throw an error if "performer", "genre", "price", "day", "image" is okay', () => {
    const cases = {
      performer: ['John Doe', 'Rebekah Parker'],
      genre: ['Rock', 'R&B'],
      price: [25, 50],
      day: [1, 2],
      image: ['/img/uploads/1fsd324fsdg.jpg', '/img/uploads/2f342s4fsdg.jpg'],
    };

    for(let performer of cases.performer){
      for(let genre of cases.genre){
        for(let price of cases.price){
          for(let day of cases.day) {
            for(let image of cases.image){
              const concert = new Concert({performer, genre, price, day, image});

              concert.validate((err) => {
                expect(err).to.not.exist;
              });
            }
          }
        }
      }
    }
  });
});