/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';
import { requesterToken, lineManagerToken, adminToken } from '../users/login.test';

chai.should();
chai.use(chaiHttp);

const comment = () => {
  describe('POST /', () => {
    it('can\'t create request comment without login', (done) => {
      chai.request(server)
        .post(`/api/v1/request/comment/${1}`)
        .end((err, response) => {
          console.log(response.body);
          response.should.have.status(500);
          done();
        });
    });
    it('can\'t create comment on request with invalid id', (done) => {
      chai.request(server)
        .post('/api/v1/request/comment/j')
        .send({ comment: 'Test Comment' })
        .set('authorization', requesterToken)
        .end((err, response) => {
          console.log(response.body);
          response.should.have.status(500);
          done();
        });
    });
    it('can\'t create comment on request which doesn\'t exist ', (done) => {
      chai.request(server)
        .post(`/api/v1/request/comment/${76}`)
        .send({ comment: 'Test comments' })
        .set('authorization', adminToken)
        .end((err, response) => {
          console.log(response.body);
          response.should.have.status(400);
          done();
        });
    });
    it('comment on request', (done) => {
      chai.request(server)
        .post(`/api/v1/request/comment/${1}`)
        .send({ comment: 'Test Comment' })
        .set('authorization', requesterToken)
        .end((err, response) => {
          console.log(response.body);
          response.should.have.status(201);
          done();
        });
    });
    it('display all comments on request', (done) => {
      chai.request(server)
        .get(`/api/v1/request/comment/${1}`)
        .set('authorization', requesterToken)
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
    it('can\'t get comments on request with invalid id', (done) => {
      chai.request(server)
        .get('/api/v1/request/comment/j')
        .set('authorization', requesterToken)
        .end((err, response) => {
          console.log(response.body);
          response.should.have.status(500);
          done();
        });
    });
    it('can\'t get comments on request which doesn\'t exist ', (done) => {
      chai.request(server)
        .get(`/api/v1/request/comment/${76}`)
        .set('authorization', adminToken)
        .end((err, response) => {
          console.log(response.body);
          response.should.have.status(400);
          done();
        });
    });
  });
};

export default comment;
