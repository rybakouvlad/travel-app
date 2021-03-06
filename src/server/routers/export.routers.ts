import { Router } from 'express';
import auth from './auth.routers';

const router = Router();

router.use('/auth', auth);

export default router;
