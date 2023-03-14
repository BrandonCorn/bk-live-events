import { Router } from 'express';
import getCurrentUsers from './get-current-users'
const router = Router();


router.get('/api/users/currentuser', getCurrentUsers);

export default router;
