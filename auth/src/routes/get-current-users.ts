import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
const router = Router();

router.get(
    '/api/users/currentuser',
    (req: Request, res: Response) => {
        
    }
)

export { router as currentUserRouter }