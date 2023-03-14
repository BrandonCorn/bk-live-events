import { Router } from 'express';
const router = Router();
import authRoutes from './auth';

router.use(authRoutes);

export default router;

