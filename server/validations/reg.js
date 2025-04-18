import { body } from 'express-validator'

// Удобная конструкция валидации для фронта
export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль минимум 5 символов').isLength({ min: 5 }),
]