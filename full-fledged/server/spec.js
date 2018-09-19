var app = require('./server');
var request = require('supertest')
var chaiexpect = require('chai').expect;
require('colors');

describe('[LIONS]'.yellow, function(){
    it('should get all lions', function(done){
        request(app)
        .get('/lions')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, resp){
            chaiexpect(resp.body).to.be.an('array');
            done();
        })
    });

    it('should create a lion', function(done){
        request(app).post('/lions')
        .send({
            name:'Dash',
            age: '100',
            pride: 'Evil Lions',
            gender: 'male'
        })
        .set('Accept', 'application/json')
        .expect('Content-Type',/json/)
        .expect(201)
        .end(function(err, resp){
            chaiexpect(resp.body).to.be.an('Object');
            done();
        });
    })

    it('should delete a lion', function(done){
        request(app)
        .post('/lions')
        .send({
            name:'Dash',
            age: '100',
            pride: 'Evil Lions',
            gender: 'male'
        }).set('Accept', 'application/json')
        .end(function(err, resp){
            var lion = resp.body;
            request(app)
            .delete('/lions/'+lion.id)
            .end(function(err, resp){
                chaiexpect(resp.body[0].name).to.be.eql('Dash');
                done();
            })
        })
    })

    it('should update a lion', function(done){
        request(app)
        .post('/lions')
        .send({
            name:'Dash',
            age: '100',
            pride: 'Evil Lions',
            gender: 'male'
        }).set('Accept', 'application/json')
        .end(function(err, resp){
            var lion = resp.body
            request(app)
            .put('/lions/' +  lion.id)
            .send({
                name:'Smash'
            }).set('Accept', 'application/json')
            .end(function(err, resp){
                done();
            })
        })
    })
});