import { Router, Request, Response } from "express";
import { Ticket, TicketDoc } from "../models/Ticket";
import { requireAuth, validateRequest, NotFoundError, UnauthorizedRequestError } from "@ticketmister/lib";
import { body } from "express-validator";
import { TicketUpdatedPublisher } from "../events/publishers/ticket-updated-publisher";
import { natsClient } from "../events/nats-client";

const router = Router();

const updateTicket = async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) throw new NotFoundError();

    if (ticket.userId !== req.currentUser!.id) throw new UnauthorizedRequestError();

    const { title, price } = req.body;

    ticket.set({title, price});
    await ticket.save();

    await publishUpdateTicketEvent(ticket);

    res.send(ticket);
}

const publishUpdateTicketEvent = async (ticket: TicketDoc) => {
    new TicketUpdatedPublisher(natsClient.client).publish({
        id: ticket.id,
        title: ticket.title,
        price: ticket.price,
        userId: ticket.userId
    })
}

router.put(
    '/api/tickets/:id',
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
    updateTicket,
)


export { router as updateTicketRouter }; 