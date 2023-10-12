import { Router, Request, Response } from 'express';
import { Ticket } from '../models/Ticket';

const router = Router();

const getTickets = async (req: Request, res: Response) => {
    const tickets = await Ticket.find({});

    res.send(tickets);
}

router.get(
    '/api/tickets',
    getTickets,
)

export { router as getTicketsRouter };