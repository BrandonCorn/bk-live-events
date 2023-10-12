import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';

declare global {
    var signUp: () => Promise<string[]>; 
}

let mongo: any; 

beforeAll(async () => {
    process.env.JWT_SECRET='lkajsdlfj8237823'
    mongo = await MongoMemoryServer.create();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for(let collection of collections) {
        await collection.deleteMany();
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});

global.signUp = async () => {
    const email = 'kat@test.com';
    const password = 'passwordpass';

    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email,
            password
        })
        .expect(201)
    const cookie = response.get('Set-Cookie');
    return cookie;
}
