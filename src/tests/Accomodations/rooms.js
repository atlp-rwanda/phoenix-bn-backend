/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';
import { travelAdminToken } from '../users/login.test';
import { accomodationId } from './accomodations';

chai.should();
chai.use(chaiHttp);
let roomId = '';
const createRooms = () => {
  describe('POST /', () => {
    it('can\'t create rooms without login', (done) => {
      chai.request(server)
        .post('/api/v1/rooms')
        .end((err, response) => {
          response.should.have.status(500);
          done();
        });
    });
    it('travel Admin should create room', (done) => {
      chai.request(server)
        .post('/api/v1/rooms')
        .set('authorization', travelAdminToken)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Content-Type', 'multipart/form-data')
        .field('accomodation_id', parseInt(accomodationId))
        .field('details', 'test room desc')
        .field('roomNumber', 'b38')
        .field('price', '20000 RWF')
        .attach('files', `${__dirname}/images/images.png`)
        .end((err, response) => {
          console.log(response.body);
          response.should.have.status(201);
          roomId = response.body.data.id;
          done();
        });
    });
    it('travel Admin should not  create room, accomodation dont exists', (done) => {
      chai.request(server)
        .post('/api/v1/rooms')
        .set('authorization', travelAdminToken)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Content-Type', 'multipart/form-data')
        .field('accomodation_id', 900)
        .field('details', 'test room desc')
        .field('price', '20000 RWF')
        .field('roomNumber', 'b38')
        .attach('files', `${__dirname}/images/images.png`)
        .end((err, response) => {
          console.log(response.body);
          response.should.have.status(400);
          done();
        });
    });
    it('travel Admin should not  create accomodation missing params', (done) => {
      chai.request(server)
        .post('/api/v1/rooms')
        .set('authorization', travelAdminToken)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Content-Type', 'multipart/form-data')
        .field('details', 'test room desc')
        .field('roomNumber', 'b38')
        .attach('files', `${__dirname}/images/images.png`)
        .end((err, response) => {
          console.log(response.body);
          response.should.have.status(400);
          done();
        });
    });
    it('travel Admin should update room', (done) => {
      chai.request(server)
        .patch(`/api/v1/rooms/${roomId}`)
        .set('authorization', travelAdminToken)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Content-Type', 'multipart/form-data')
        .field('details', 'test room desc')
        .field('roomNumber', 'b38')
        .end((err, response) => {
          console.log(response.body);
          response.should.have.status(200);
          done();
        });
    });
    it('users should get rooms by accomodation ', (done) => {
      chai.request(server)
        .get(`/api/v1/rooms/${accomodationId}`)
        .set('authorization', travelAdminToken)
        .end((err, response) => {
          console.log(response.body);
          response.should.have.status(200);
          done();
        });
    });
  });
};
export { createRooms, roomId };
