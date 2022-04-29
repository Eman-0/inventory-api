let chai = require('chai');
let property = require('../routes/Propertypost');
let should = chai.should();
let server = require('../server');
let chaiHttp = require('chai-http');

chai.use(chaiHttp);
//Our parent block
describe('post.js', () => {
    describe('Insert Property', () => {
        it('it should insert a new address property into the database given accurate information and state its success and return status code 200', (done) => {
            let property = {
                address: "1234 Hunt Ln.",
                city: "San Antonio",
                state: "TX",
                zip: "78253"
            }
            chai.request(server)
                .post('/properties')
                .set('Content-Type', 'application/json')
                .set('api_key', "cs4783ftw!")
                .send(property)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Property added successfully');
                    done();
                });
        });
    });
    describe('Insert Incomplete Property', () => {
        it('it should not insert a property because it is incomplete, and should state so with status code 400', (done) => {
            let property = {
                address: "1234 Hunt Ln.",
                state: "TX",
                zip: "78253"
            }
            chai.request(server)
                .post('/properties')
                .set('Content-Type', 'application/json')
                .send(property)
                .set('api_key', "cs4783ftw!")
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Please enter a complete property address');
                    done();
                });
        });
    });
    describe('Non-Authorized Insert Of A Property', () => {
        it('it should fail to insert because authentication was not established and return a message stating so with a status code of 401', (done) => {
            let property = {
                address: "1234 Hunt Ln.",
                city: "San Antonio",
                state: "TX",
                zip: "78253"
            }
            chai.request(server)
                .post('/properties')
                .set('Content-Type', 'application/json')
                .set('api_key', "cs4783")
                .send(property)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Authentication failed');
                    done();
                });
        });
    });


});