"use strict";

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Authenticate user', () => {
      it('Should authenticate user and return token', (done) => {
        let req = {
            email: "testuser@gmail.com",
            password: "password-1"
        }
        chai.request(server)
            .post('/authenticate')
            .send(req)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success').and.equal(true);
                res.body.should.have.property('token').and.not.equal(null);
              done();
            });
      });
      it('Should invalidate user and token as null', (done) => {
        let req = {
            email: "invalid@gmail.com",
            password: "invalid"
        }
        chai.request(server)
            .post('/authenticate')
            .send(req)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success').and.equal(false);
                res.body.should.have.property('token').and.equal(null);
              done();
            });
      });      
});

