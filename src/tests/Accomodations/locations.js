/* eslint-disable import/no-mutable-exports */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';
import { travelAdminToken } from '../users/login.test';

chai.should();
chai.use(chaiHttp);
const location = {
  name: 'testing Location',
};
const location1 = {
  name: 'testing Location',
  fakefield: 'fake',
};
let locationId = '';

const createlocations = () => {
  describe('POST /', () => {
    it('can\'t create locations without login', (done) => {
      chai.request(server)
        .post('/api/v1/locations')
        .set('authorization', 'bad')
        .end((err, response) => {
          response.should.have.status(500);
          done();
        });
    });
    it('travel Admin should create location', (done) => {
      chai.request(server)
        .post('/api/v1/locations')
        .send(location)
        .set('authorization', travelAdminToken)
        .end((err, response) => {
          response.should.have.status(201);
          locationId = response.body.data.id;
          done();
        });
    });
    it('travel Admin should not create location', (done) => {
      chai.request(server)
        .post('/api/v1/locations')
        .send(location1)
        .set('authorization', travelAdminToken)
        .end((err, response) => {
          response.should.have.status(400);
          done();
        });
    });
    it('travel Admin should update locations', (done) => {
      chai.request(server)
        .put(`/api/v1/locations/update/${locationId}`)
        .send(location)
        .set('authorization', travelAdminToken)
        .end((err, response) => {
          console.log(response.body);
          response.should.have.status(200);
          done();
        });
    });
    it('should not update locations dont exits', (done) => {
      chai.request(server)
        .put('/api/v1/locations/update/900')
        .send(location)
        .set('authorization', travelAdminToken)
        .end((err, response) => {
          console.log(response.body);
          response.should.have.status(404);
          done();
        });
    });
    it('should get list of locations', (done) => {
      chai.request(server)
        .get('/api/v1/locations')
        .send(location)
        .set('authorization', travelAdminToken)
        .end((err, response) => {
          console.log(response.body);
          response.should.have.status(200);
          done();
        });
    });
  });
};

export { createlocations, locationId };
