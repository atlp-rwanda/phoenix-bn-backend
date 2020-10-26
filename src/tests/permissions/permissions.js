/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';

chai.should();
chai.use(chaiHttp);
// let token = '';
const permissionTest = () => {
  describe('TEST ACCESSING PERMISSION API WITH USER', () => {
    it('It should not allow user other than superAdmin to access the apis', (done) => {
      chai.request(server)
        .get('/api/v1/permissions')
        .end((err, response) => {
          response.should.have.status(400);
          done();
        });
    });
  });
};
// const SignUpTest = () => {
//   describe('TEST USER REGISTRATION WITH EMAIL AND PASSWORD', () => {
//     it('It should not create user missing required parameter', (done) => {
//       chai.request(server)
//         .post('/api/v1/users/signup').send(invalidData)
//         .end((err, response) => {
//           response.should.have.status(400);
//           response.body.should.be.a('object');
//           response.body.should.have.property('status');
//           response.body.should.have.property('message');
//           done();
//         });
//     });
//     it('It should not create user passwords not equal', (done) => {
//       chai.request(server)
//         .post('/api/v1/users/signup').send(wrongpassword)
//         .end((err, response) => {
//           response.should.have.status(400);
//           response.body.should.be.a('object');
//           response.body.should.have.property('status');
//           response.body.should.have.property('message');
//           done();
//         });
//     });
//     it('It should create user', (done) => {
//       chai.request(server)
//         .post('/api/v1/users/signup').send(validData)
//         .end((err, response) => {
//           response.should.have.status(201);
//           response.body.should.be.a('object');
//           response.body.should.have.property('status');
//           response.body.should.have.property('message');
//           token = response.body.data.token;
//           done();
//         });
//     });
//     it('It should not create user email exists in system', (done) => {
//       chai.request(server)
//         .post('/api/v1/users/signup').send(validData)
//         .end((err, response) => {
//           response.should.have.status(409);
//           response.body.should.be.a('object');
//           response.body.should.have.property('status');
//           response.body.should.have.property('message');
//           done();
//         });
//     });
//   });
//   describe('USER VERIFICATION', () => {
//     it('It should not verify the user token is missing', (done) => {
//       chai.request(server)
//         .get('/api/v1/users/verify/token')
//         .end((err, response) => {
//           response.should.have.status(500);
//           response.body.should.be.a('object');
//           response.body.should.have.property('status');
//           response.body.should.have.property('message');
//           done();
//         });
//     });
//     it('It should not verify the user bad request method', (done) => {
//       chai.request(server)
//         .post('/api/v1/users/verify/token')
//         .end((err, response) => {
//           response.should.have.status(404);
//           done();
//         });
//     });
//     it('It should  verify the user', (done) => {
//       chai.request(server)
//         .get(`/api/v1/users/verify/${token}`)
//         .end((err, response) => {
//           response.should.have.status(200);
//           response.body.should.be.a('object');
//           response.body.should.have.property('status');
//           response.body.should.have.property('message');
//           done();
//         });
//     });
//     it('It should  verify the user only once', (done) => {
//       chai.request(server)
//         .get(`/api/v1/users/verify/${token}`)
//         .end((err, response) => {
//           response.should.have.status(422);
//           response.body.should.be.a('object');
//           response.body.should.have.property('status');
//           response.body.should.have.property('message');
//           done();
//         });
//     });
//   });
// };
export default permissionTest;
