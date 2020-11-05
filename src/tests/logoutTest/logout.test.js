/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';

chai.should();
chai.use(chaiHttp);
const logoutTest = () => {
  describe('POST /', () => {
    it('It should not logout user who is not authenticated', (done) => {
      chai.request(server)
        .post('/api/v1/users/logout')
        .end((err, response) => {
          response.should.have.status(401); 
          done();
        });
    });
  });
  
};
export default logoutTest;
