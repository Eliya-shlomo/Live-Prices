import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../backend/server'; 

const should = chai.should();

chai.use(chaiHttp);

describe('GET /api/crypto-prices', () => {
  it('should GET the specified crypto prices', (done) => {
    chai.request(server)
      .get('/api/crypto-prices')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(3); 
        done();
      });
  });

  it('should return 500 on error', (done) => {
    chai.request(server)
      .get('/api/crypto-prices')
      .end((err, res) => {
        if (err) {
          res.should.have.status(500);
          res.body.should.have.property('error');
          done();
        }
      });
  });
});
