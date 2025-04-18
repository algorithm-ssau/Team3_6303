import mongoose from 'mongoose';

// Создаём таблицу (схему) для юзера
const UserSchema = new mongoose.Schema(
    {
        type: {
            type: Boolean,
            required: true
        },
        phone_number: {
            type: String
        },
        email: {
            type: String, // Тип данных 
            required: true, // Обязательная или нет
            unique: true // Уникальная или нет
        },
        passwordHash: { // Хеш нашего пароля, кабы хранить сам пароль небезопасно
            type: String,
            required: true
        },
        nickname: {
            type: String,
            unique: true, // Лучше это поменять нахуй
        },
        gender: {
            type: Boolean
        },
        age: {
            type: Number
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('User', UserSchema); // Экспортируем модельку для БД