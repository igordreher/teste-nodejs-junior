import mongoose from 'mongoose';
import request from 'supertest';
import app from 'app';

jest.mock('../src/services/mongo', () => {
    return () => {
        const db_url = process.env.DB_URL + 'delete';
        mongoose.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true });
    };
});


describe('User Delete', () => {
    const User = mongoose.model('User');
    let seedUser: any;

    beforeAll(async () => {
        const user = {
            email: 'user@email.com',
            password: 'password'
        };
        seedUser = await User.create(user);
        await User.insertMany([user, user, user]);
    });

    it('Should delete a user', async () => {
        let res = await request(app).del('/api/v1/users/' + seedUser._id);
        expect(res.statusCode).toBe(200);

        const user = await User.findOne({ _id: seedUser._id });
        expect(user).toBeNull();
    });

    it('Should delete all users', async () => {
        let res = await request(app).del('/api/v1/users');
        expect(res.statusCode).toBe(200);

        const users = await User.find();
        expect(users.length).toBe(0);
    });

    it('Should still return 200 after deleting', async () => {
        let res = await request(app).del('/api/v1/users/' + seedUser._id);
        expect(res.statusCode).toBe(200);
    });

    it('Should return 400 to invalid id', async () => {
        const res = await request(app).del('/api/v1/users/invalidId');
        expect(res.statusCode).toBe(400);
    });

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.disconnect();
    });
});