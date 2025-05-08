import { body } from 'express-validator';

export const loginValidation = [
  body('login')
    .notEmpty().withMessage('Email или телефон обязателен для заполнения')
    .custom((value, { req }) => {
      // Определяем метод авторизации по содержимому поля
      const isEmail = value.includes('@');
      const isPhone = /^[\d+()\s-]+$/.test(value.replace(/\s/g, ''));
      
      if (req.body.authMethod === 'email' && !isEmail) {
        throw new Error('Для входа через email введите корректный email');
      }
      
      if (req.body.authMethod === 'phone' && !isPhone) {
        throw new Error('Для входа через телефон введите корректный номер');
      }
      
      return true;
    })
    .customSanitizer(value => value.trim())
    .escape(),

  body('password')
    .notEmpty().withMessage('Пароль обязателен для заполнения')
    .isLength({ min: 6 }).withMessage('Пароль должен быть минимум 6 символов')
    .isLength({ max: 30 }).withMessage('Пароль не должен превышать 30 символов')
    .escape()
];