import mongoose from 'mongoose';
import request from 'supertest';
import app from 'app';


describe('User Get', () => {

    const get = async () => {
        return await request(app).get('/api/v1/users');
    };

    it('Should get all users', async () => {
        const res = await get();
        expect(res.statusCode).toBe(200);
        expect((await mongoose.model('User').find()).length).toBe(0);
    });

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.disconnect();
    });
});