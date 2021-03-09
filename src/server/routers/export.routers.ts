import { Router } from 'express';
import auth from './auth.routers';
import country from './country.routes';

const router = Router();
router.use('/country', country);
router.use('/auth', auth);

export default router;
