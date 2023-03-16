import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { User } from '../models/User';
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middlewares/validate-request';
import { PasswordManager } from '../utilities/password-manager';
import { Jwt } from '../utilities/jwt';
const router = Router();

router.post(
    '/api/users/signin',
    [body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .not().isEmpty()
        .withMessage('You must supply a password')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;
        
        const user = await User.findOne({email })
        if (!user) {
            throw new BadRequestError('User does not exist');
        }

        const valid = await PasswordManager.compare(user.password, password);
        if (!valid) {
            throw new BadRequestError('Invalid password');
        }
        
        const userToken = await Jwt.createToken({ id: user.id, email: user.email});
        req.session = { jwt: userToken };

        return res.status(201).send(userToken);
    }
)

export { router as signInRouter };