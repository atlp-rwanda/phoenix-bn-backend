/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';
import { requesterToken } from '../users/login.test';

chai.should();
chai.use(chaiHttp);

const bookingDetails = {
    accomodation_id: "1",
    checkIn: "2020-11-20",
    checkOut: "2020-11-25"

};
const accomodation_id = {
    accomodation_id: "1"

};

const booking = () => {

    describe('booking an accomodation', () => {
        it('It should book an accomodation', (done) => {
            chai.request(server)
                .post('/api/v1/accomodations/book')
                .send(bookingDetails)
                .set('authorization', requesterToken)
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

    describe('Check accomodation availability', () => {
        it('It should show   left rooms for the accomodations', (done) => {
            chai.request(server)
                .get('/api/v1/accomodations/book/check')
                .send(accomodation_id)
                .set('authorization', requesterToken)
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

    describe('Find the accomodation', () => {
        it('It should show booked accomodations', (done) => {
            chai.request(server)
                .get('/api/v1/accomodations/book/find')
                .send(accomodation_id)
                .set('authorization', requesterToken)
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

};
export default booking;
