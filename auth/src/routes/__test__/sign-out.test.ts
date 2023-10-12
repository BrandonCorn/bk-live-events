import request from 'supertest';
import { app } from '../../app';

it('Clears cookie after signing out', async () => {
    const cookie = await global.signUp();
    
    const response = await request(app)
        .post('/api/users/signout')
        .send({})
        .expect(201)
    
    expect(response.get('Set-Cookie')).toBeDefined()
})