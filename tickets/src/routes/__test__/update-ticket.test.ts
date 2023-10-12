import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';


it('Returns a 404 if provided ID does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie', signIn())
        .send({
            title: 'alsdjflsadf',
            price: '20'
        })
        .expect(404);
});

it('Returns a 401 if user not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
        .put(`/api/tickets/${id}`)
        .send({
            title: 'alsdjflsadf',
            price: '20'
        })
        .expect(401);
});

it('Returns a 401 if user does not own the ticket', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', signIn())
        .send({
            title: 'lasdjf',
            price: 20 
        });

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', signIn())
        .send({
            title: 'concert',
            price: 30, 
        })
        .expect(401);
});

it('Returns a 400 if user provides invalid title or price', async () => {
    const cookie = signIn();

    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title: 'lasdjf',
            price: 20 
        });

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: '',
            price: 20
        })
        .expect(400);
});

it('Updates a ticket provided valid inputs', async () => {
    const cookie = signIn();

    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title: 'lasdjf',
            price: 20 
        });

    const ticketUpdate = {
        title: 'concert',
        price: 30
    }

    const updateResponse = await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send(ticketUpdate)
        .expect(200);

    expect(updateResponse.body.title).toEqual(ticketUpdate.title);
    expect(updateResponse.body.price).toEqual(ticketUpdate.price);
});