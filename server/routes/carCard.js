import express from 'express';
import CarModel from '../models/Car.js';

const router = express.Router();

// Получение всех автомобилей
router.get('/', async (req, res) => {
  try {
    const filters = {};

    if (req.query.transmission) filters.transmission = req.query.transmission;
    if (req.query.color) filters.color = req.query.color;
    if (req.query.bodyType) filters.bodyType = req.query.bodyType;
    if (req.query.engineType) filters.engineType = req.query.engineType;

    if (req.query.priceMin || req.query.priceMax) {
      filters.price = {};
      if (req.query.priceMin) filters.price.$gte = Number(req.query.priceMin);
      if (req.query.priceMax) filters.price.$lte = Number(req.query.priceMax);
    }

    if (req.query.yearMin || req.query.yearMax) {
      filters.year = {};
      if (req.query.yearMin) filters.year.$gte = Number(req.query.yearMin);
      if (req.query.yearMax) filters.year.$lte = Number(req.query.yearMax);
    }

    if (req.query.mileageMax) {
      filters.mileage = { $lte: Number(req.query.mileageMax) };
    }

    const cars = await CarModel.find(filters);
    res.status(200).json(cars);
  } catch (err) {
    console.error('Ошибка при фильтрации автомобилей:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Получение одного автомобиля по ID
router.get('/:id', async (req, res) => {
  try {
    const car = await CarModel.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        message: 'Автомобиль не найден',
      });
    }

    res.status(200).json(car);
  } catch (err) {
    console.error(`Ошибка при получении автомобиля с ID ${req.params.id}:`, err);
    res.status(500).json({
      message: 'Не удалось получить автомобиль',
      error: err.message,
    });
  }
});

export default router;
