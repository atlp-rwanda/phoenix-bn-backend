/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
import chai from 'chai';
import server from '../../app';
import { requesterToken, lineManagerToken } from '../users/login.test';
const manageTripRequest=()=>{
  it('it should not dislay all created trip request as report for unauthorized users', (done) => {
    chai.request(server)
      .get('/api/v1/trips/report?page=1&limit=1')
      .end((err, response) => {
        response.should.have.status(500);
        done();
      });
  });
  it('it should allow line manager to approve trip request', (done) => {
    chai.request(server)
      .put('/api/v1/trips/approve')
      .set('authorization',lineManagerToken)
      .send({requestId:1})
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });
  it('it should not allow user to display list of his/her created trip requests', (done) => {
    chai.request(server)
      .get('/api/v1/trips/mine?page=1&limit=1')
      .end((err, response) => {
        response.should.have.status(500);
        done();
      });
  });

  it('it should not allow requester to edit his/her created trip request', (done) => {
    chai.request(server)
      .put('/api/v1/trips/edit')
      .set('authorization',requesterToken)
      .send({Tid:1})
      .end((err, response) => {
        response.should.have.status(500);
        done();
      });
  });
  it('It should allow user to cancel his rejected trip request', (done) => {
    chai.request(server)
      .delete('/api/v1/trips/cancel')
      .set('authorization',requesterToken)
      .send({id:1})
      .end((err, response) => {
        console.log(response.body);
        response.should.have.status(200);
        done();
      });
  });
  it('It should not allow unauthorized user to cancel rejected trip request', (done) => {
    const badRequestersToken='fyfyfyfyfy';
    chai.request(server)
      .delete('/api/v1/trips/cancel')
      .set('authorization',badRequestersToken)
      .send({Tid:73})
      .end((err, response) => {
        response.should.have.status(500);
        done();
      });
  });
  
  

}
export default manageTripRequest;