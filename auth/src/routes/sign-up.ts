import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';
const router = Router();


router.post(
    '/api/users/signup', 
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Valid email must be provided'), 
    body('password')
        .trim()
        .isLength({min: 12})
        .withMessage('Password must be at least 12 characters'),
    (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }
    const { email, password } = req.body;

    return res.status(200).send({email, msg: 'created'})
    
    //new User({email, password});
});

export { router as signUpRouter }