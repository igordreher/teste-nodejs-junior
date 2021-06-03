import mongoose from 'mongoose';
import request from 'supertest';
import app from 'app';

jest.mock('../src/services/mongo', () => {
    return () => {
        const db_url = process.env.DB_URL + 'get';
        mongoose.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true });
    };
});

describe('User Get', () => {
    const User = mongoose.model('User');

    beforeAll(async () => {
        const user = {
            email: 'user@email.com',
            password: 'password'
        };
        await User.insertMany([user, user, user]);
    });

    const post = async (data: any) => {
        return await request(app).post('/api/v1/users').send(data);
    };

    it('Should get all users', async () => {
        const res = await request(app).get('/api/v1/users');
        expect(res.statusCode).toBe(200);
        expect((await User.find()).length).toBe(3);
    });

    it('Should get a specific user', async () => {
        const res = await post({ email: 'email@email.com', password: 'pass' });
        const user = res.body;
        const resGet = await request(app).get(`/api/v1/users/${user.id}`);

        expect(resGet.statusCode).toBe(200);
        expect(resGet.body).toStrictEqual(user);
    });

    it('Should return 400 to invalid id', async () => {
        const res = await request(app).get('/api/v1/users/invalidId');
        expect(res.statusCode).toBe(400);
    });

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.disconnect();
    });
});