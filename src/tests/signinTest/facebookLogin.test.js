/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';

chai.should();
chai.use(chaiHttp);
const facebookLoginTest = () => {
  describe('GET /', () => {
    it('It should not get facebook Login form because it is closed now by facebook', (done) => {
      chai.request(server)
        .get('/api/v1/users/login/facebook')
        .end((err, response) => {
          response.should.have.status(500);
          done();
        });
    });
    // it('It should return all user information', (done) => {
    //   chai.request(server)
    //     .get('/api/v1/users/auth/facebook/callback')
    //     .end((err, response) => {
    //       response.should.have.status(200);
    //       done();
    //     });
    // });
  });
};
export default facebookLoginTest;
