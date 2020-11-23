/* eslint-disable radix */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';
import { travelAdminToken } from '../users/login.test';
import { locationId } from './locations';

chai.should();
chai.use(chaiHttp);
let accomodationId = '';
const createAccomodation = () => {
  describe('POST /', () => {
    it('can\'t create Accomodation without login', (done) => {
      chai.request(server)
        .post('/api/v1/accomodations')
        .end((err, response) => {
          response.should.have.status(500);
          done();
        });
    });
    it('travel Admin should create accomodation', (done) => {
      chai.request(server)
        .post('/api/v1/accomodations')
        .set('authorization', travelAdminToken)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Content-Type', 'multipart/form-data')
        .field('name', 'test Accomodation')
        .field('description', 'test Accomodation desc')
        .field('location_id', parseInt(locationId))
        .field('amenities', '["wifi","sanning"]')
        .field('roomsAvailable', 20)
        .field('numberOfRooms', 50)
        .attach('files', `${__dirname}/images/images.png`)
        .end((err, response) => {
          response.should.have.status(201);
          accomodationId = response.body.data.id;
          done();
        });
    });
    it('travel Admin should not  create accomodation location dont exists', (done) => {
      chai.request(server)
        .post('/api/v1/accomodations')
        .set('authorization', travelAdminToken)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .field('Content-Type', 'multipart/form-data')
        .field('name', 'test Accomodation')
        .field('description', 'test Accomodation desc')
        .field('location_id', 900)
        .field('amenities', '["wifi","sanning"]')
        .attach('files', `${__dirname}/images/images.png`)
        .end((err, response) => {
          response.should.have.status(404);

          done();
        });
    });
    it('travel Admin should not  create accomodation missing params', (done) => {
      chai.request(server)
        .post('/api/v1/accomodations')
        .set('authorization', travelAdminToken)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Content-Type', 'multipart/form-data')
        .field('name', 'test Accomodation')
        .field('amenities', '["wifi","sanning"]')
        .attach('files', `${__dirname}/images/images.png`)
        .end((err, response) => {
          response.should.have.status(400);
          done();
        });
    });
    it('travel Admin should update accomodation', (done) => {
      chai.request(server)
        .patch(`/api/v1/accomodations/${accomodationId}`)
        .set('authorization', travelAdminToken)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Content-Type', 'multipart/form-data')
        .field('name', 'test Accomodation')
        .field('amenities', '["wifi","sanning"]')
        .attach('files', `${__dirname}/images/images.png`)
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
    it('users should get accomodation by location ', (done) => {
      chai.request(server)
        .get(`/api/v1/accomodations/${locationId}`)
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
    it('Travel Admin should get all accomodations ', (done) => {
      chai.request(server)
        .get('/api/v1/accomodations/')
        .set('authorization', travelAdminToken)
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
  });
};

export { createAccomodation, accomodationId };
