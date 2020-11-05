/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';
import { requesterToken, adminToken } from '../users/login.test';

chai.should();
chai.use(chaiHttp);
const roleTest = () => {
  describe('TEST ACCESSING ROLE API WITH USER', () => {
    it('It should not allow un authnticated  user  to access roles the apis', (done) => {
      chai.request(server)
        .get('/api/v1/roles')
        .end((err, response) => {
          response.should.have.status(500);
          done();
        });
    });
    it('It should not allow  user rather than superAdmin  to access roles the apis', (done) => {
      chai.request(server)
        .get('/api/v1/roles')
        .set('authorization', requesterToken)
        .end((err, response) => {
          response.should.have.status(403);
          done();
        });
    });

    it('It should  allow   superAdmin  to access roles the apis', (done) => {
      chai.request(server)
        .get('/api/v1/roles')
        .set('authorization', adminToken)
        .end((err, response) => {
          console.log(response.body)
          response.should.have.status(200);
          done();
        });
    });
  });
};
export default roleTest;
