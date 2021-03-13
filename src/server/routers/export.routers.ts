import { Router } from 'express';
import auth from './auth.routers';
import country from './country.routes';
import image from './image.routers';

const router = Router();
router.use('/country', country);
router.use('/auth', auth);
router.use('/image', image);

export default router;
