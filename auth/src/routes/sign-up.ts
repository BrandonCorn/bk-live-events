import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError, Jwt, validateRequest } from '@ticketmister/lib';
import { User } from '../models/User';
const router = Router();


router.post(
    '/api/users/signup', 
    [body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Valid email must be provided'), 
    body('password')
        .trim()
        .isLength({min: 12})
        .withMessage('Password must be at least 12 characters')]
    ,
    validateRequest,
    async (req: Request, res: Response) => {
    const { email, password } = req.body

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        console.log('user exists');
        throw new BadRequestError('User already exists with this email address');
    }
    
    const user = User.build( {email, password} );
    await user.save();

    //create token for session
    const sessionToken = Jwt.createToken({id: user.id, email: user.email});
    //cache token
    req.session = {
        ...req.session,
        jwt: sessionToken
    }

    return res.status(201).send({ id: user.id, email: user.email });
});

export { router as signUpRouter }