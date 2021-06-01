require('dotenv');
import mongoose from 'mongoose';
import request from 'supertest';
import app from 'app';

jest.mock('../src/mongo', () => {
    return () => {
        const db_url = process.env.DB_URL + 'post';
        mongoose.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true });
    };
});

describe('User Post', () => {

    const post = async (data: any) => {
        return await request(app).post('/api/v1/users').send(data);
    };

    it('Should create a user', async () => {
        const res = await post({ email: 'user@email.com', password: 'pass' });
        expect(res.statusCode).toBe(201);
        expect((await mongoose.model('User').find()).length).toBe(1);
    });

    it('Should fail to create user with invalid data', async () => {
        let res = await post({ email: 'user@email' });
        expect(res.statusCode).toBe(400);

        res = await post({ pass: 'pass' });
        expect(res.statusCode).toBe(400);

        res = await post({ email: 'not valid email', pass: 'pass' });
        expect(res.statusCode).toBe(400);
    });

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.disconnect();
    });
});