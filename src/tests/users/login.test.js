/* eslint-disable no-undef */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable import/no-unresolved */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';
import 'dotenv/config';

chai.should();
chai.use(chaiHttp);
const requester = {
  email: 'requester@barefoot.com',
  password: '123456',
};

const lineManager = {
  email: 'linemanager@barefoot.com',
  password: '123456',
};
const admin = {
  email: 'barefoot@gmail.com',
  password: '123456',
};
let requesterToken = '';
let lineManagerToken = '';
let adminToken = '';

const loginTests = () => {
  describe('POST /', () => {
    it('log requester In', (done) => {
      chai.request(server)
        .post('/api/v1/users/login')
        .send(requester)
        .end((err, response) => {
          response.should.have.status(200);
          requesterToken = response.body.data.authToken;
          done();
        });
    });

    it('log line manager', (done) => {
      chai.request(server)
        .post('/api/v1/users/login')
        .send(lineManager)
        .end((err, response) => {
          response.should.have.status(200);
          lineManagerToken = response.body.data.authToken;
          done();
        });
    });

    it('log in superAdmin', (done) => {
      chai.request(server)
        .post('/api/v1/users/login')
        .send(admin)
        .end((err, response) => {
          response.should.have.status(200);
          adminToken = response.body.data.authToken;
          done();
        });
    });
  });
};

export {
  requesterToken, lineManagerToken, loginTests, adminToken,
};
