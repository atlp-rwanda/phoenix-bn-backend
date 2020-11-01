/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';

chai.should();
chai.use(chaiHttp);
// let AdminToken = '';
const rolePermissionTest = () => {
  describe('TEST ACCESSING RolePERMISSION API WITH USER', () => {
    it('It should not allow user other than superAdmin to access the apis', (done) => {
      chai.request(server)
        .get('/api/v1/rolesPermissions')
        .end((err, response) => {
          response.should.have.status(500);
          done();
        });
    });
  });
} 
export default rolePermissionTest;