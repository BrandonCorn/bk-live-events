import request from 'supertest';
import { app } from '../../app';

it('Returns 201 on successful signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'brandontest@gmail.com',
            password: 'passwordpass1'
        })
        .expect(201);    
});

it('Returns 400 with an invalid email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'brandontestmail.com',
            password: 'passwordpass1'
        })
        .expect(400);    
});

it('Returns 400 with an invalid password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'brandon@testmail.com',
            password: 'pass'
        })
        .expect(400);    
});

it('Returns 400 with missing email or password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'brandon@testmail.com',
        })
        .expect(400);    
    await request(app)
        .post('/api/users/signup')
        .send({
            password: 'passwordpass'
        })
        .expect(400); 
});

it('Returns 400 because email already in use', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'dro@test.com',
            password: 'passwordpass'
        })
        .expect(201)
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'dro@test.com',
            password: 'passwordpass'
        })
        .expect(400);
});

it('sets a cookie after successful signup', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'dro@test.com',
            password: 'passwordpass'
        })
        .expect(201);
    expect(response.get('Set-Cookie')).toBeDefined();


})
