import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
const router = Router();

router.post(
    '/api/users/signin',
    body('email')
        .isEmail()
        .normalizeEmail(),
    body('password')
        .trim()
        .not().isEmpty(),
    (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send(errors.array());
        }
    }
)

export { router as signInRouter };