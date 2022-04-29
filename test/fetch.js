let chai = require('chai');
let property = require('../routes/Propertyfetch');
let should = chai.should();
let server = require('../server');
let chaiHttp = require('chai-http');

chai.use(chaiHttp);
//Our parent block
describe('fetch.js', () => {
    describe('Fetch Properties', () => {
        it('it should get all the address properties in the database and return status code 200', (done) => {
            chai.request(server)
                .get('/properties')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
    describe('Fetch Property', () => {
        it('it should fetch the info of a specified property given an id and return status code 200', (done) => {
            chai.request(server)
                .get('/properties/:id')
                .set('Content-Type', 'application/json')
                .send({"id": 1})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('[{\"id\":1,\"address\":\"5203 witt\",\"city\":\"san antonio\",\"state\":\"Tx\",\"zip\":\"78228\"}]');
                    done();
                });
        });
    });
    describe('Fetch Non-Existing Property', () => {
        it('it should attempt to get the info of a specified property given an id that does not exist, return an error message and status code 404', (done) => {
            chai.request(server)
                .get('/properties/:id')
                .set('Content-Type', 'application/json')
                .send({"id": 0})
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.have.property('message').eql('Property not found')
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});