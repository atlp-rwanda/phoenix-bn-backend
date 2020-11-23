/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';

chai.should();
chai.use(chaiHttp);
const socialSignUpTest = () => {
  describe('USER SOCIAL REGISTRATION WITH GOOGLE AND FACEBOOK', () => {
    it('It should get Google signup form', (done) => {
      chai.request(server)
        .get('/api/v1/users/signup/google')
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
    it('It should return all user information', (done) => {
      chai.request(server)
        .get('/api/v1/users/auth/google/redirect')
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
    it('It should not get facebook signup form because it is closed now by facebook', (done) => {
      chai.request(server)
        .get('/api/v1/users/signup/facebook')
        .end((err, response) => {
          response.should.have.status(500);
          done();
        });
    });
    it('It should return all user information', (done) => {
      chai.request(server)
        .get('/api/v1/users/auth/facebook/callback')
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
  });
};
export default socialSignUpTest;
