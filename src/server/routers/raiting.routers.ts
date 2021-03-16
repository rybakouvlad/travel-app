import { Router, Request, Response } from 'express';
import { check, validationResult, Result, ValidationError } from 'express-validator';
import auth from '../auth.middleware';
import Raiting from '../models/Raiting';

const router = Router();

router.post('/getAll', async (req: Request, res: Response) => {
  try {
    console.log(req.body.imageId);
    const raitings = await Raiting.find({ image: req.body.imageId });
    return res.json(raitings);
  } catch (e) {
    return res.status(500).json({ message: 'Can not get raitings' });
  }
});

router.post('/set', auth, [check('comment', 'Enter comment.').exists()], async (req: Request, res: Response) => {
  try {
    console.log(req.user._id);
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Comment is incorrect.',
      });
    }
    const raiting = new Raiting({
      rating: req.body.raiting,
      comment: req.body.comment,
      image: req.body.imageId,
      user: req.user._id,
    });
    await raiting.save();
    res.status(201).json({ message: 'Raiting created.' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong, try again.' });
  }
});

export default router;
