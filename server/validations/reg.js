import { body } from 'express-validator'

export const registerValidation = [
    body('nickname')
        .notEmpty().withMessage('Имя пользователя обязательно для заполнения')
        .isLength({ min: 3 }).withMessage('Имя должно содержать минимум 3 символа')
        .isLength({ max: 30 }).withMessage('Имя не должно превышать 30 символов')
        .matches(/^[a-zA-Zа-яА-ЯёЁ0-9_\-]+$/).withMessage('Имя может содержать только буквы, цифры, дефисы и подчёркивания')
        .trim()
        .escape(),

    body('email')
        .notEmpty().withMessage('Email обязателен для заполнения')
        .isEmail().withMessage('Неверный формат email')
        .normalizeEmail()
        .escape(),

    body('phone_number')
        .notEmpty().withMessage('Номер телефона обязателен для заполнения')
        .customSanitizer(value => value.replace(/[^\d+]()/g, ''))
        .isMobilePhone('ru-RU').withMessage('Неверный формат телефона. Используйте российский формат')
        .escape(),

    body('password')
        .notEmpty().withMessage('Пароль обязателен для заполнения')
        .isLength({ min: 6 }).withMessage('Пароль должен быть минимум 6 символов')
        .isLength({ max: 30 }).withMessage('Пароль не должен превышать 30 символов')
        .matches(/[0-9]/).withMessage('Пароль должен содержать хотя бы одну цифру')
        .matches(/[a-zA-Z]/).withMessage('Пароль должен содержать хотя бы одну букву')
]