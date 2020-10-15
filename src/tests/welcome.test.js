import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

chai.should();
chai.use(chaiHttp);
const welcomeTest=() => {
  describe('GET /', () => {
    it('It should get welcoming message', (done) => {
      chai.request(server)
        .get('/')
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          done();
        });
    });
  });
}
export default welcomeTest;