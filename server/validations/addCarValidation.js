import { check } from 'express-validator';

 const addCarValidation = [
  check('photos').isArray({ min: 1 }).withMessage('Добавьте хотя бы одно фото'),
  check('photos.*').isURL().withMessage('Некорректный URL фото'),
  check('price')
    .isNumeric().withMessage('Цена должна быть числом')
    .custom(value => value > 0).withMessage('Цена должна быть больше нуля'), // Новая проверка
  check('brand').notEmpty().withMessage('Укажите марку автомобиля'),
  check('model').notEmpty().withMessage('Укажите модель автомобиля'),
  check('transmission').isIn(['автомат', 'механика', 'робот', 'вариатор']).withMessage('Некорректный тип коробки передач'),
  check('color').isIn(['черный', 'серебристый', 'белый', 'серый', 'синий', 'красный', 'зеленый', 'коричневый', 'другого цвета']).withMessage('Некорректный цвет'),
  check('year').isInt({ min: 1960, max: new Date().getFullYear() }).withMessage(`Год должен быть между 1960 и ${new Date().getFullYear()}`),
  check('bodyType').isIn(['хэтчбек', 'универсал', 'седан', 'купе', 'внедорожник', 'фургон', 'пикап', 'лимузин', 'кабриолет']).withMessage('Некорректный тип кузова'),
  check('engineType').isIn(['бензин', 'дизель', 'гибрид', 'электро', 'газ']).withMessage('Некорректный тип двигателя'),
  check('engineVolume').isFloat({ min: 0.5, max: 10 }).withMessage('Объем двигателя должен быть между 0.5 и 10 л'),
  check('enginePower').isInt({ min: 1 }).withMessage('Мощность должна быть положительным числом'),
  check('mileage').isInt({ min: 0 }).withMessage('Пробег должен быть положительным числом'),
  check('additionalInfo').optional().isString().withMessage('Дополнительная информация должна быть строкой')
];

export { addCarValidation };