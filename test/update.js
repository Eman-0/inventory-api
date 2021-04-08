let chai = require('chai');
let property = require('../routes/Propertyupdate');
let should = chai.should();
let server = require('../server');
let chaiHttp = require('chai-http');

chai.use(chaiHttp);
//Our parent block
describe('update.js', () => {
    describe('Update Property', () => {
        it('it should update a specified address property given an id and inform its completion with a success message with status code 200', (done) => {
            chai.request(server)
                .put('/properties/:id')
                .set('Authorization', "cs4783ftw!")
                .set('Content-Type', 'application/json')
                .send({"id": 3, "address": "1225 Boardwalk", "city":"San Angles", "state":"CA", "zip":"9877"})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Property updated');
                    done();
                });
        });
    });
    describe('Update Non-Existing Property', () => {
        it('it should attempt update a specified address property but fail because the id does not exist, so it sends an error message and status code 404', (done) => {
            chai.request(server)
                .put('/properties/:id')
                .set('Authorization', "cs4783ftw!")
                .set('Content-Type', 'application/json')
                .send({"id": 1, "address": "1555 Boardwalk", "city":"San Angles", "state":"CA", "zip":"9877"})
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Property not found');
                    done();
                });
        });
    });
    describe('Unauthorized Update', () => {
        it('it should attempt update a specified property by id but fail because it was not authenticated and return a message stating so with a status code of 401', (done) => {
            chai.request(server)
                .put('/properties/:id')
                .set('Authorization', "cs4783")
                .set('Content-Type', 'application/json')
                .send({"id": 3, "address": "1555 Boardwalk", "city":"San Angles", "state":"CA", "zip":"9877"})
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Authentication failed');
                    done();
                });
        });
    });
});