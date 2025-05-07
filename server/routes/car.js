// server/routes/car.js   (или routes/cars.js — главное, чтобы путь совпадал)
import { Router } from 'express';
import Car from '../models/Car.js';

const router = Router();

// GET /api/cars?transmission=автомат,механика&color=черный&body=седан&fuel=бензин
router.get('/', async (req, res) => {
  try {
    const { transmission, color, body, fuel } = req.query;
    const filter = {};

    if (transmission) filter.transmission = { $in: transmission.split(',') };
    if (color)        filter.color        = { $in: color.split(',') };
    if (body)         filter.body         = { $in: body.split(',') };
    if (fuel)         filter.fuel         = { $in: fuel.split(',') };

    const cars = await Car.find(filter).lean();
    res.json(cars);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка на сервере' });
  }
});

export default router;       // ← default‑экспорт
