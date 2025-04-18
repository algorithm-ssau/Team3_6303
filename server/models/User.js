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
        passwordHash: {
            type: String,
            required: true
        },
        nickname: {
            type: String,
            unique: true,
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

export default mongoose.model('User', UserSchema); // Экспорт модельки для БД