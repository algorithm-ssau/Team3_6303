import Car from '../models/Car.js';

export const listCars = async (req, res) => {
  try {
    const {
      transmission, color, bodyType, engineType,
      minPrice, maxPrice, minYear, maxYear,
      page = 1, limit = 100,
    } = req.query;

    const filter = {};
    const inList = v => ({ $in: v.split(',') });

    if (transmission) filter.transmission = inList(transmission);
    if (color)        filter.color        = inList(color);
    if (bodyType)     filter.bodyType     = inList(bodyType);
    if (engineType)   filter.engineType   = inList(engineType);

    if (minPrice || maxPrice)
      filter.price = {
        ...(minPrice && { $gte: +minPrice }),
        ...(maxPrice && { $lte: +maxPrice })
      };
    if (minYear || maxYear)
      filter.year = {
        ...(minYear && { $gte: +minYear }),
        ...(maxYear && { $lte: +maxYear })
      };

    const skip = (page - 1) * limit;
    const cars = await Car.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(+limit);

    res.json(cars);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка при получении машин' });
  }
};
