import { body } from 'express-validator'

// Такая конструкция валидации будет удобна на фронтенде
export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль минимум 5 символов').isLength({ min: 5 }),
]