import request from 'supertest';
import app from 'app';

jest.mock('../src/models/user');
jest.mock('../src/mongo');

describe('User Post', () => {

    it('Should ', async () => {
        const res = await request(app).post('/api/v1/users').send({
            email: 'test', password: 'pass'
        });

        expect(res.statusCode).toBe(201);
    });

});