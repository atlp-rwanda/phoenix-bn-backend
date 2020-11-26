/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';
import { requesterToken, adminToken } from '../users/login.test';

chai.should();
chai.use(chaiHttp);
const rolePermissionTest = () => {
  describe('TEST ACCESSING RolePERMISSION API WITH USER', () => {
    it('It should not allow un authenticated user to access the apis', (done) => {
      chai.request(server)
        .get('/api/v1/rolesPermissions')
        .end((err, response) => {
          response.should.have.status(500);
          done();
        });
    });
    it('It should not allow user other than superAdmin to access the apis', (done) => {
      chai.request(server)
        .get('/api/v1/rolesPermissions')
        .set('authorization', requesterToken)
        .end((err, response) => {
          response.should.have.status(403);
          done();
        });
    });
    it('It should allow user  superAdmin to access the apis', (done) => {
      chai.request(server)
        .get('/api/v1/rolesPermissions')
        .set('authorization', adminToken)
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
  });
};
export default rolePermissionTest;
