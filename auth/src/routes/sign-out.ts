import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
const router = Router();

router.post(
    '/api/users/signout',
    (req: Request, res: Response) => {
        req.session = null;
        return res.status(201).send({});
    }
)

export { router as signOutRouter };