import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { Jwt } from '@ticketmister/lib';

declare global {
    var signIn: () => string[]; 
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

global.signIn = () => {
    //build jwt payload {id, email}
    const id = new mongoose.Types.ObjectId().toHexString();
    const payload = { id, email: 'test@test.com' }

    //create jwt sign
    const token = Jwt.createToken(payload);

    //build session object {jwt: lajsdfljasdf}
    const session = { jwt: token };
    //turn session into json
    const sessionJson = JSON.stringify(session);
    //encode as base64
    const base64 = Buffer.from(sessionJson).toString('base64');

    return [`session=${base64}`];
}
