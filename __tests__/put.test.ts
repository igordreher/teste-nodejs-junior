import mongoose from 'mongoose';
import request from 'supertest';
import app from 'app';

jest.mock('../src/mongo', () => {
    return () => {
        const db_url = process.env.DB_URL + 'put';
        mongoose.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true });
    };
});

describe('User Put', () => {
    const User = mongoose.model('User');
    let seedUser: any;

    beforeAll(async () => {
        const user = {
            email: 'user@email.com',
            password: 'password'
        };
        const user2 = {
            email: 'user2@email.com',
            password: 'pass'
        };

        seedUser = await User.create(user);
        await User.create(user2);
    });

    const put = async (id: string, data: any) => {
        return await request(app).put('/api/v1/users/' + id).send(data);
    };

    it('Should update a user data', async () => {
        const res = await put(seedUser._id, { email: 'new_email@email.com' });
        expect(res.statusCode).toBe(204);

        const user = await User.findOne({ _id: seedUser._id }) as any;
        expect(user?.email).toBe('new_email@email.com');
    });

    it('Should fail to update user without any data', async () => {
        const res = await put(seedUser._id, {});
        expect(res.statusCode).toBe(400);
    });

    it('Should fail to update user email to existing one', async () => {
        const res = await put(seedUser._id, { email: 'user2@email.com' });

        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual(['Invalid email: already used']);
    });

    it('Should return 400 to invalid id', async () => {
        const res = await put('invalidId', { email: 'email@email.com', password: 'pass' });
        expect(res.statusCode).toBe(400);
    });

    it('Should return 404 to not existing user', async () => {
        const res = await put('000000000000', { email: 'newEmail@email.com', password: 'pass' });
        expect(res.statusCode).toBe(404);
    });

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.disconnect();
    });
});