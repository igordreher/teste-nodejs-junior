import request from 'supertest';
import mongoose from 'mongoose';
import app from 'app';

describe('User Post', () => {
    beforeAll((done) => {
        done();
    });

    it('Should work', async () => {
        const res = await request(app).post('/api/v1/users')
            .send({ email: 'email', password: 'pass' });

        expect(res.statusCode).toBe(201);
    });

    afterAll((done) => {
        mongoose.connection.close();
        done();
    });
});