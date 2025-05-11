import express from 'express';
import CarModel from '../models/Car.js';

const router = express.Router();

// Получение всех автомобилей
router.get('/', async (req, res) => {
  try {
    const cars = await CarModel.find();
    res.status(200).json(cars);
  } catch (err) {
    console.error('Ошибка при получении списка автомобилей:', err);
    res.status(500).json({
      message: 'Не удалось получить список автомобилей',
      error: err.message,
    });
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
