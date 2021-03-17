import { Router, Request, Response } from 'express';
import { check, validationResult, Result, ValidationError } from 'express-validator';
import bcrypt from 'bcryptjs';
import User from '../models/Users';
import createJWToken from '../utils/createJWToken';
import auth from '../auth.middleware';
import shortid from 'shortid';
import { UploadedFile } from 'express-fileupload';

const router = Router();

router.post(
  '/register',
  [
    check('email', 'Incorrect email.').isEmail(),
    check('password', 'Minimum field length 6 characters.').isLength({ min: 6 }),
    check('login', 'Minimum field length 1 characters.').isLength({ min: 1 }),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors: Result<ValidationError> = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect data during registration.',
        });
      }
      const postData: { email: string; password: string; login: string } = {
        email: req.body.email,
        password: req.body.password,
        login: req.body.login,
      };

      const candidate = await User.findOne({ email: postData.email });

      if (candidate) {
        return res.status(400).json({ message: 'Such user already exists.' });
      }

      const hashedPassword = await bcrypt.hash(postData.password, 12);
      const user = new User({
        email: postData.email,
        password: hashedPassword,
        login: postData.login,
        filepath: 'new_user.png',
      });
      console.log(req.body);
      await user.save();

      res.status(201).json({ message: 'User was created.' });
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong, try again.' });
    }
  },
);
router.post(
  '/login',
  [check('email', 'Enter correct email.').normalizeEmail().isEmail(), check('password', 'Введите пароль').exists()],
  async (req: Request, res: Response) => {
    try {
      const errors: Result<ValidationError> = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect login data.',
        });
      }

      const postData: { email: string; password: string } = {
        email: req.body.email,
        password: req.body.password,
      };

      const user = await User.findOne({ email: postData.email });

      if (!user) {
        return res.status(400).json({ message: 'User is not found.' });
      }

      const isMatch = await bcrypt.compare(postData.password, user.password);

      if (isMatch) {
        const token = createJWToken(user);
        console.log(req.body);
        res.json({
          status: 'success',
          token,
        });
      } else {
        res.status(403).json({
          status: 'error',
          message: 'Incorrect password or email',
        });
      }
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong, try again.' });
    }
  },
);

router.post('/getUserLogin', async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });

    return res.json(user.login);
  } catch (e) {
    return res.status(500).json({ message: 'Can not get user.' });
  }
});

router.post('/upload', auth, async (req: Request, res: Response) => {
  const user = await User.findOne({ _id: req.user._id });
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    const sampleFile = req.files.file as UploadedFile;
    const fileName = shortid.generate() + '.jpg';
    const uploadPath = `${process.env.USER_FILE_PATH}` + '/' + fileName;

    sampleFile.mv(uploadPath, async function (err) {
      if (err) {
        return res.status(500).send(err);
      }

      user.filepath = fileName;

      await user.save();
      res.status(200).send('File uploaded!');
    });
  } catch (error) {}
});

router.post('/getImg', auth, async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.user._id });

    return res.json(user.filepath);
  } catch (e) {
    return res.status(500).json({ message: 'Can not get user.' });
  }
});

export default router;
