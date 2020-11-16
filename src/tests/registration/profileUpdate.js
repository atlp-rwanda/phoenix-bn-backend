/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';
import { requesterToken, requesterId } from '../users/login.test';

chai.should();
chai.use(chaiHttp);

const profileData = {
  firstName: 'Faustin',
  lastName: 'Ukundimana',
  email: 'ukundimana@gmail.com',
  preferedLanguage: 'English',
  officeAddress: 'Remera, Giporoso',
};

const profileUpdate = () => {

  describe('Updating user profile', () => {
    it('It should  update user profile', (done) => {
      chai.request(server)
        .put(`/api/v1/users/updateProfile/${requesterId}`)
        .send(profileData)
        .set('authorization', requesterToken)
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

  describe('Displaying user profile', () => {
    it('It should display user profile', (done) => {
      chai.request(server)
        .get(`/api/v1/users/profile/${requesterId}`)
        .set('authorization', requesterToken)
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
export default profileUpdate;
