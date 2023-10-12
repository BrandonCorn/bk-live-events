import nats from 'node-nats-streaming';
import { Subjects } from './events/subjects';
import { TicketCreatedPublisher } from './events/TicketCreatedPublisher';

console.clear();

const stan = nats.connect('ticketing', 'abc', {
    url: 'http://localhost:4222'
});

stan.on('connect', async () => {
    console.log('connected to stan');

    const publisher = new TicketCreatedPublisher(stan);
    await publisher.publish({
        id: 'sdfdsf', title: 'Concert', price: 3
    });
});





