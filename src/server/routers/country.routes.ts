import { Router, Request, Response } from 'express';
import Country from '../models/Country';
const router = Router();

router.get('/all/:lang', async (req: Request, res: Response) => {
  try {
    const data = await Country.find({});
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ message: 'Can not get date.' });
  }
});

router.get('/:lang/:name', async (req: Request, res: Response) => {
  try {
    const data = await Country.findOne({ alpha2: req.params.name });
    if (!data) {
      return res.status(500).json({ message: 'Can not get date.' });
    }
    const result = {
      alpha2: data.alpha2,
      currency: data.currency,
      name: '',
      capital: '',
      description: '',
    };
    switch (req.params.lang) {
      case 'ru':
        result.name = data.name_ru;
        result.capital = data.capital_ru;
        result.description = data.description_ru;
        break;
      case 'by':
        result.name = data.name_by;
        result.capital = data.capital_by;
        result.description = data.description_by;
        break;
      case 'en':
        result.name = data.name_en;
        result.capital = data.capital_en;
        result.description = data.description_en;
        break;
      default:
        break;
    }
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({ message: 'Can not get date.' });
  }
});

router.post('/set', async (req: Request, res: Response) => {
  try {
    const data = new Country({
      alpha2: req.body.alpha2,
      name_ru: req.body.name_ru,
      name_by: req.body.name_by,
      name_en: req.body.name_en,
      capital_ru: req.body.capital_ru,
      capital_by: req.body.capital_by,
      capital_en: req.body.capital_en,
      description_ru: req.body.description_ru,
      description_by: req.body.description_by,
      description_en: req.body.description_en,
      currency: req.body.currency,
    });
    await data.save();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ message: 'Can not get date.' });
  }
});

export default router;
