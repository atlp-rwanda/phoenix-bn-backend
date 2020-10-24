/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';

chai.should();
chai.use(chaiHttp);
const googleLoginTest = () => {
  describe('GET /', () => {
    it('It should get Google Login form', (done) => {
      chai.request(server)
        .get('/api/v1/users/login/google')
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
  });
};
export default googleLoginTest;
