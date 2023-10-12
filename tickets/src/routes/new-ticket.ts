import { Router, Request, Response } from 'express';
import { requireAuth, validateRequest } from '@ticketmister/lib';
import { body } from 'express-validator';
import { Ticket, TicketDoc } from '../models/Ticket';
import { TicketCreatedPublisher } from '../events/publishers/ticket-created-publisher';
import { natsClient } from '../events/nats-client';

const router = Router();

const createTickets = async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const ticket = Ticket.build({
        title,
        price,
        userId: req.currentUser!.id
    });
    await ticket.save();

    await publishNewTicketEvent(ticket);

    res.status(201).send(ticket);
}


const publishNewTicketEvent = async (ticket: TicketDoc) => {
    new TicketCreatedPublisher(natsClient.client).publish({
        id: ticket.id,
        title: ticket.title,
        price: ticket.price,
        userId: ticket.userId
    })
}

router.post(
    '/api/tickets',
    requireAuth,
    [
        body('title')
            .not()
            .isEmpty()
            .withMessage('Must provide valid title'),
        body('price')
            .not()
            .isEmpty()
            .withMessage('Must provide price')
            .isFloat({ gt: 0 })
            .withMessage('Price must be greater than 0')
    ],
    validateRequest,
    createTickets
);

export { router as createTicketRouter };