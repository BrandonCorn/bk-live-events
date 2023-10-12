import request from 'supertest';
import { app } from '../../app';

it('Fail with email that is not supplied', async () => {
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(400)
});

it('Fails when an incorrect password is supplied', async () => {
    const cookie = await global.signUp();

    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'kat@test.com',
            password: 'password'
        })
        .expect(400);
});

it('Respond with cookie with valid credentials', async () => {
    const cookie = await global.signUp();

    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'kat@test.com',
            password: 'passwordpass'
        })
        .expect(201);
});
