/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';
import { travelAdminToken } from '../users/login.test';
import { accomodationId } from './accomodations';
import { locationId } from './locations';

chai.should();
chai.use(chaiHttp);
const DeleteAccomos = () => {
  describe('DELETION ', () => {
    it('it should delete accomodations ', (done) => {
      chai.request(server)
        .delete(`/api/v1/accomodations/${accomodationId}`)
        .set('authorization', travelAdminToken)
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
    it('it should delete accomodations ', (done) => {
      chai.request(server)
        .delete(`/api/v1/locations/${locationId}`)
        .set('authorization', travelAdminToken)
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
  });
};
export { DeleteAccomos };
