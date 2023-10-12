import { Router } from 'express';
import { currentUserRouter } from './get-current-users'
import { signInRouter } from './sign-in';
import { signOutRouter } from './sign-out';
import { signUpRouter } from './sign-up';

const router = Router();


router.use(currentUserRouter);

router.use(signInRouter);

router.use(signOutRouter);

router.use(signUpRouter);


export default router;

