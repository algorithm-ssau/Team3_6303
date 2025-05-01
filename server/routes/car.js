// server/routes/cars.js
const express = require('express');
const router = express.Router();
const Car = require('../models/Car'); // ваша Mongoose-модель

// GET /api/cars?transmission=автомат,механика&color=черный&body=седан&fuel=бензин
router.get('/', async (req, res) => {
  try {
    const { transmission, color, body, fuel } = req.query;
    const filter = {};

    if (transmission) filter.transmission = { $in: transmission.split(',') };
    if (color)        filter.color        = { $in: color.split(',') };
    if (body)         filter.body         = { $in: body.split(',') };
    if (fuel)         filter.fuel         = { $in: fuel.split(',') };

    // сюда можно добавить фильтрацию по числовым полям:
    // if (req.query.minPrice) filter.price = { $gte: +req.query.minPrice };
    // if (req.query.maxPrice) filter.price = { ...filter.price, $lte: +req.query.maxPrice };

    const cars = await Car.find(filter).lean();
    res.json(cars);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка на сервере' });
  }
});

module.exports = router;
