/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';
import { managerToken, requesterId, lineManagerId } from '../users/login.test';

chai.should();
chai.use(chaiHttp);

const assignUsers = () => {
  describe('Assigning users to managers', () => {
    it('It should  assign user to his manager', (done) => {
      chai.request(server)
        .put('/api/v1/users/manager/assign')
        .send({ lineManagerId, userId: requesterId })
        .set('authorization', managerToken)
        .end((err, response) => {
          console.log(response.body);
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.property('status');
          response.body.should.have.property('message');
          done();
        });
    });
  });

  describe('Get users assigned to managers', () => {
    it('It should display users assigned to manager', (done) => {
      chai.request(server)
        .get(`/api/v1/users/manager/${lineManagerId}`)
        .set('authorization', managerToken)
        .end((err, response) => {
          console.log(response.body);
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.property('status');
          response.body.should.have.property('message');
          response.body.should.have.property('data');
          done();
        });
    });
  });
};
export default assignUsers;
