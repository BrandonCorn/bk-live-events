import { Router, Request, Response } from "express";
import { Ticket } from "../models/Ticket";
import { NotFoundError } from "@ticketmister/lib";

const router = Router();

const getTicketById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const ticket = await Ticket.findById(id);

    if (!ticket) throw new NotFoundError();
    res.send(ticket);
}

router.get(
    '/api/tickets/:id',
    getTicketById
);

export { router as getTicketByIdRouter };

