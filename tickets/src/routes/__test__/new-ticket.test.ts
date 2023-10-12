import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/Ticket';


it('has route listening to /api/tickets for post requests', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .send({});

    expect(response.statusCode).not.toEqual(404);
});


it('Can only access if signed in', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .send({})
        .expect(401)
});

it('Returns status other than 401 if user is signed in', async () => {
    const token = signIn();
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', token)
        .send({});
    
    expect(response.statusCode).not.toEqual(401);
})

it('Returns an error if title invalid', async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', signIn())
        .send({
            title: '',
            prices: 10
        })
        .expect(400)
});

it('Returns an error if invalid price provided', async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', signIn())
        .send({
            title: 'alksjdflkjasd',
            prices: -10
        })
        .expect(400)
});

it('Returns an error if no price provided', async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', signIn())
        .send({
            title: 'alksjdflkjasd',
        })
        .expect(400)
});

it('creates a ticket with valid inputs', async () => {
    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);

    const ticket = {
        title: 'laksjdfljadf',
        price: 20,
    }

    await request(app)
        .post('/api/tickets')
        .set('Cookie', signIn())
        .send(ticket)
        .expect(201)

    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
    expect(tickets[0].title).toEqual(ticket.title);
    expect(tickets[0].price).toEqual(ticket.price);
});
