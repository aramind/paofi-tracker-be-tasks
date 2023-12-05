const request = require('supertest');
const app = require('../../routes/user');

describe('User routes', () => {

    //// api/v1/users/:userId
    it('should get a user by ID', () => {
        return request(app).get('/6474e6c10b6b795ebf44e70f').expect('Content-Type', /json/).expect(200);
    })


    it('should be 404 not found', () => {
        return request(app).get('/41224d776a326fb40f000001').expect(404);
    })
})