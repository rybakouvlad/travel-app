import { Router } from 'express';
import auth from './auth.routers';
import country from './country.routes';
import image from './image.routers';
import raiting from './raiting.routers';

const router = Router();
router.use('/country', country);
router.use('/auth', auth);
router.use('/image', image);
router.use('/raiting', raiting);

export default router;
