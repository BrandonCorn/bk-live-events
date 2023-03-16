import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { BadRequestError } from '../errors/bad-request-error';
import { User } from '../models/User';
import { Jwt } from '../utilities/jwt';
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
    async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }
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

    return res.status(200).send(user);
});

export { router as signUpRouter }