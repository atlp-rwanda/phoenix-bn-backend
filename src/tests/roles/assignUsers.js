/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';

chai.should();
chai.use(chaiHttp);
let managerToken = '';

const assignUsers = () => {

    describe('Assigning users to managers', () => {
        it('It should  assign user to his manager', (done) => {
            chai.request(server)      
                .put('/api/v1/users/manager/assign')          
                .send({ lineManagerId: '4', userId: '2' })
                .set("Authorization", + managerToken)
                .then((res) => {
                    expect(res).to.have.status(200);
                })
                .catch((err) => {
                    throw err;
                });

            done();
        });
    });

    describe('Get users assigned to managers', () => {
        it('It should display users assigned to manager', (done) => {
            chai.request(server)                        
                .get('/api/v1/users/manager/4') 
                .set("Authorization", + managerToken) 
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
export default assignUsers;
