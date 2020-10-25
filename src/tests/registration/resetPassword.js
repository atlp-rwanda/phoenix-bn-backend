/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';

chai.should();
chai.use(chaiHttp);
const resetToken = '';

const EmailNotExist = {
  email: 'muhire@gmail.com',
};
const EmailExist = {
  email: 'fukundimana@gmail.com',
};
const dataPassword = {
  password: 'password',
  confirmPassword: 'password',
};

const ResetPasswordTest = () => {
  describe('Check if user with the email exists', () => {
    it('It should display error message', (done) => {
      chai.request(server)
        .post('/api/v1/users/forgot-password').send(EmailNotExist)
        .end((err, response) => {
          response.should.have.status(404);
          response.body.should.be.a('object');
          response.body.should.have.property('status');
          response.body.should.have.property('message');
          done();
        });
    });

    it('It should send a reset link to the corresponding email', (done) => {
      chai.request(server)
        .post('/api/v1/users/forgot-password').send(EmailExist)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.property('status');
          response.body.should.have.property('message');
          response.body.should.have.property('data');
          done();
        });
    });
  });

  describe('Change user password', () => {
    it('It should  should change the user password', (done) => {
      chai.request(server)
        .put(`/api/v1/users/reset-password/${resetToken}`)
        .send({ password: '12345678', confirmPassword: '12345678' })
        .then((res) => {
          expect(res).to.have.status(200);
        })
        .catch((err) => {
          throw err;
        });

      done();
    });
  });
};
export default ResetPasswordTest;
