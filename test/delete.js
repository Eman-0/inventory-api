import { should as _should, use, request } from 'chai';
import property from '../routes/Propertydelete';
let should = _should();
import server from '../server';
import chaiHttp from 'chai-http';

use(chaiHttp);
//Our parent block
describe('delete.js', () => {
    describe('Delete Non-Existing Property', () => {
        it('it should attempt to delete a specified property given an id that does not exist and fail to do so and should state that in a message with a status code of 404', (done) => {
            request(server)
                .delete('/properties/:id')
                .set('Authorization', "cs4783ftw!")
                .set('Content-Type', 'application/json')
                .send("{\"id\":1}")
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Invalid property selected');
                    done();
                });
        });
    });
    describe('delete.js', () => {
        describe('Non-Authorized Deletion Of A Property', () => {
            it('it should delete a specified address property but not be authorized to do so and return a message stating so with a status code of 401', (done) => {
                request(server)
                    .delete('/properties/:id')
                    .set('Authorization', "cs4783")
                    .set('Content-Type', 'application/json')
                    .send("{\"id\":85}")
                    .end((err, res) => {
                        res.should.have.status(401);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Authentication failed');
                        done();
                    });
            });
        });
    });

});