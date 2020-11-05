/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';
import { requesterToken, lineManagerToken, adminToken } from '../users/login.test';

chai.should();
chai.use(chaiHttp);
const request1 = {
  travelDate: '2020-10-03',
  returnDate: '2020-11-03',
  destination: ['rusizi', 'ka'],
  origin: 'kigali',
  accomodation: 1,
  reason: 'business',
};
const datetime = new Date();
const date = datetime.toISOString().slice(0, 10);

const request2 = {
  travelDate: date,
  returnDate: '2020-10-04',
  destination: ['rusizi', 'ka'],
  origin: 'kigali',
  accomodation: 1,
  reason: 'business',
};
const request3 = {
  travelDate: date,
  returnDate: date,
  destination: ['rusizi', 'ka'],
  origin: 'kigali',
  accomodation: 1,
};
const request4 = {
  travelDate: date,
  returnDate: date,
  destination: ['rusizi', 'ka'],
  origin: 'kigali',
  accomodation: 1,
  reason: 'business',
};

const request5 = {
  travelDate: date,
  returnDate: date,
  destination: ['rusizi', 'ka'],
  origin: 'kigali',
  accomodation: 400,
  reason: 'business',
};

const createTripRequest = () => {
  describe('POST /', () => {
    it('can\'t create request without login', (done) => {
      chai.request(server)
        .post('/api/v1/trips/request')
        .end((err, response) => {
          console.log(response.body);
          response.should.have.status(500);
          done();
        });
    });
    it('can\'t create request invalid travelling date', (done) => {
      chai.request(server)
        .post('/api/v1/trips/request')
        .send(request1)
        .set('authorization', requesterToken)
        .end((err, response) => {
          console.log(response.body);
          response.should.have.status(400);
          done();
        });
    });
    it('can\'t create request invalid returning  date', (done) => {
      chai.request(server)
        .post('/api/v1/trips/request')
        .send(request2)
        .set('authorization', requesterToken)
        .end((err, response) => {
          console.log(response.body);
          response.should.have.status(400);
          done();
        });
    });
    it('can\'t create request missing required info', (done) => {
      chai.request(server)
        .post('/api/v1/trips/request')
        .send(request3)
        .set('authorization', requesterToken)
        .end((err, response) => {
          console.log(response.body);
          response.should.have.status(400);
          done();
        });
    });
    it('can\'t create request user not allowed', (done) => {
      chai.request(server)
        .post('/api/v1/trips/request')
        .send(request4)
        .set('authorization', adminToken)
        .end((err, response) => {
          console.log(response.body);
          response.should.have.status(403);
          done();
        });
    });
    it('can\'t create request accomodation dont exist', (done) => {
      chai.request(server)
        .post('/api/v1/trips/request')
        .send(request5)
        .set('authorization', requesterToken)
        .end((err, response) => {
          console.log(response.body);
          response.should.have.status(404);
          done();
        });
    });
    it('created request', (done) => {
      chai.request(server)
        .post('/api/v1/trips/request')
        .send(request4)
        .set('authorization', requesterToken)
        .end((err, response) => {
          console.log(response.body);
          response.should.have.status(201);
          done();
        });
    });
    it('display all trip request', (done) => {
      chai.request(server)
        .get('/api/v1/trips/mine')
        .send(request4)
        .set('authorization', requesterToken)
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
    it('it should not display reports', (done) => {
      chai.request(server)
        .get('/api/v1/trips/report')
        .set('authorization', requesterToken)
        .end((err, response) => {
          response.should.have.status(403);
          done();
        });
    });
    it('it should  display reports', (done) => {
      chai.request(server)
        .get('/api/v1/trips/report')
        .set('authorization', lineManagerToken)
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
  });
};

export default createTripRequest;
