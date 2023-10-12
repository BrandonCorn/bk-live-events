import { Router } from 'express';
import { createTicketRouter } from "./new-ticket"; 
import { getTicketByIdRouter } from './get-ticket-by-id';
import { getTicketsRouter } from './get-tickets';
import { updateTicketRouter } from './update-ticket';

const router = Router();

router.use(createTicketRouter);

router.use(getTicketByIdRouter);

router.use(getTicketsRouter);

router.use(updateTicketRouter);

export default router;