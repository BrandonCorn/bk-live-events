import request from 'supertest';
import { app } from '../../app';

it('Respond with details of current user', async () => {
    const cookie = await global.signUp();
    
    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie)
        .send()
        .expect(201);
    expect(response.body.currentUser.email).toEqual('kat@test.com');
});

it('Respond with null if not authenticated', async () => {
    const response = await request(app)
        .get('/api/users/currentuser')
        .send()
        .expect(201)
    expect(response.body.currentUser).toBeNull();
})