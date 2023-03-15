import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
const router = Router();

router.post(
    '/api/users/signout',
    (req: Request, res: Response) => {

    }
)

export { router as signOutRouter };