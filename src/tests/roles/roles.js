/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';

chai.should();
chai.use(chaiHttp);
// let AdminToken = '';
const roleTest = () => {
  describe('TEST ACCESSING ROLE API WITH USER', () => {
    it('It should not allow user other than superAdmin to access roles the apis', (done) => {
      chai.request(server)
        .get('/api/v1/roles')
        .end((err, response) => {
          response.should.have.status(500);
          done();
        });
    });
  });
};