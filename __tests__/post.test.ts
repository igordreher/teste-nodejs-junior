import mongoose from 'mongoose';
import request from 'supertest';
import app from 'app';


describe('User Post', () => {

    const post = async (data: any) => {
        return await request(app).post('/api/v1/users').send(data);
    };

    it('Should create a user', async () => {
        const res = await post({ email: 'user@email.com', password: 'pass' });
        expect(res.statusCode).toBe(201);
    });

    it('Should fail to create user without data', async () => {
        let res = await post({ email: 'user@email' });
        expect(res.statusCode).toBe(400);

        res = await post({ pass: 'pass' });
        expect(res.statusCode).toBe(400);

        res = await post({ email: 'not valid email', pass: 'pass' });
        expect(res.statusCode).toBe(400);
    });

    afterAll(() => {
        return mongoose.disconnect();
    });
});