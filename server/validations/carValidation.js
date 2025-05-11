import { body } from 'express-validator';

const transmissionOptions = ['автомат', 'механика', 'робот', 'вариатор'];
const colorOptions = ['черный', 'серебристый', 'белый', 'серый', 'синий', 'красный', 'зеленый', 'коричневый', 'другого цвета'];
const bodyTypeOptions = ['хэтчбек', 'универсал', 'седан', 'купе', 'внедорожник', 'фургон', 'пикап', 'лимузин', 'кабриолет'];
const engineTypeOptions = ['бензин', 'дизель', 'гибрид', 'электро', 'газ'];

export const carValidation = [
  body('brand')
    .trim()
    .notEmpty().withMessage('Укажите марку автомобиля').bail()
    .isLength({ min: 2, max: 50 }).withMessage('Марка должна содержать от 2 до 50 символов').bail()
    .matches(/^[a-zA-Zа-яА-ЯёЁ0-9\s\-]+$/).withMessage('Марка может содержать только буквы, цифры, пробелы и дефисы'),

  body('model')
    .trim()
    .notEmpty().withMessage('Укажите модель автомобиля').bail()
    .isLength({ min: 1, max: 50 }).withMessage('Модель должна содержать от 1 до 50 символов').bail()
    .matches(/^[a-zA-Zа-яА-ЯёЁ0-9\s\-]+$/).withMessage('Модель может содержать только буквы, цифры, пробелы и дефисы'),

  body('year')
    .notEmpty().withMessage('Укажите год выпуска автомобиля').bail()
    .isInt({ min: 1960, max: new Date().getFullYear() + 1 })
    .withMessage(`Год должен быть в диапазоне от 1960 до ${new Date().getFullYear() + 1}`)
    .toInt(),

  body('price')
    .notEmpty().withMessage('Укажите цену автомобиля').bail()
    .isFloat({ min: 0, max: 100_000_000 }).withMessage('Цена должна быть от 0 до 100 000 000')
    .toFloat(),

  body('mileage')
    .notEmpty().withMessage('Укажите пробег автомобиля').bail()
    .isFloat({ min: 0, max: 5_000_000 }).withMessage('Пробег должен быть от 0 до 5 000 000')
    .toFloat(),

  body('engineVolume')
    .notEmpty().withMessage('Укажите объем двигателя').bail()
    .isFloat({ min: 0.1, max: 10 }).withMessage('Объем двигателя должен быть от 0.1 до 10 л')
    .toFloat(),

  body('enginePower')
    .notEmpty().withMessage('Укажите мощность двигателя').bail()
    .isInt({ min: 1, max: 2000 }).withMessage('Мощность должна быть от 1 до 2000 л.с.')
    .toInt(),

  body('transmission')
    .notEmpty().withMessage('Укажите тип коробки передач').bail()
    .isIn(transmissionOptions).withMessage(`Тип коробки должен быть одним из: ${transmissionOptions.join(', ')}`),

  body('color')
    .notEmpty().withMessage('Укажите цвет автомобиля').bail()
    .isIn(colorOptions).withMessage(`Цвет должен быть одним из: ${colorOptions.join(', ')}`),

  body('bodyType')
    .notEmpty().withMessage('Укажите тип кузова').bail()
    .isIn(bodyTypeOptions).withMessage(`Тип кузова должен быть одним из: ${bodyTypeOptions.join(', ')}`),

  body('engineType')
    .notEmpty().withMessage('Укажите тип двигателя').bail()
    .isIn(engineTypeOptions).withMessage(`Тип двигателя должен быть одним из: ${engineTypeOptions.join(', ')}`),

  body('photos')
    .isArray({ min: 1 }).withMessage('Загрузите хотя бы одно фото').bail()
    .custom((photos) => {
      if (!photos.every(p => typeof p === 'string' && /^https?:\/\/.+/.test(p))) {
        throw new Error('Каждое фото должно быть валидным URL');
      }
      return true;
    }),

  body('additionalInfo')
    .optional()
    .trim()
    .isLength({ max: 1000 }).withMessage('Дополнительная информация не должна превышать 1000 символов')
];
