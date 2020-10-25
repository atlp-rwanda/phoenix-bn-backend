/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import { response } from 'express';
import server from '../../app';

chai.should();
chai.use(chaiHttp);
const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOm51bGwsImxhc3ROYW1lIjpudWxsLCJlbWFpbCI6ImJhcmVmb290QGdtYWlsLmNvbSIsImlkIjoyNSwiUm9sZUlkIjoxLCJpYXQiOjE2MDM2NjYwNTksImV4cCI6MTYwMzY2OTY1OX0.eN5SAU1d8CZFykQG_kOLKNdCkcBPC6QQzOsfHloY3o0';
const demoPermission = 'user';
const permissionTest = () => {
  describe('TEST ACCESSING PERMISSION API WITH USER', () => {
    it('It should not allow user other than superAdmin to access the apis', (done) => {
      chai.request(server)
        .get('/api/v1/permissions')
        .end((err, response) => {
          response.should.have.status(500);
          done();
        });
    });
  });
  describe('TEST FOR ADDING PERMISSION', () => {
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
