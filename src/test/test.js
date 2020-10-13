import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';
import express from 'express';

// Assertion style
chai.should();
chai.use(chaiHttp);
describe('test the first endpoint', ()=>{
    describe('GET /',()=>{
        it('It should get response', (done)=>{
            chai.request(server)
                .get('/')
                .end((err,response)=>{
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    done();
                });
        });
    });
});
