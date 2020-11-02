/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';
import { adminToken, requesterToken } from '../users/login.test';

chai.should();
chai.use(chaiHttp);
const demoPermission = 'demo permission';
const permissionTest = () => {
  describe('TEST ACCESSING PERMISSION API WITH USER', () => {
    it('It should not allow un authenticated user to access the apis', (done) => {
      chai.request(server)
        .get('/api/v1/permissions')
        .end((err, response) => {
          response.should.have.status(500);
          done();
        });
    });
    it('It should not allow user other than superAdmin to access the apis', (done) => {
      chai.request(server)
        .get('/api/v1/permissions')
        .set('authorization', requesterToken)
        .end((err, response) => {
          response.should.have.status(403);
          done();
        });
    });
    it('It should allow saving permission with success', (done) => {
      chai.request(server)
        .post('/api/v1/permissions/save')
        .send(demoPermission)
        .set('authorization', adminToken)
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.a('object');
          done();
        });
    });
  });
};

export default permissionTest;
