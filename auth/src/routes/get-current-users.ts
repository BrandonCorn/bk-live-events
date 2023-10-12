import { Router, Request, Response } from 'express';
import { currentUser } from '@ticketmister/lib';

const router = Router();

router.get(
    '/api/users/currentuser',
    currentUser,
    (req: Request, res: Response) => {
        return res.status(201).send({ currentUser: req.currentUser || null })
});

export { router as currentUserRouter }  