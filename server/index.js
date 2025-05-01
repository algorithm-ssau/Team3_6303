// index.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';                  // ⬅ если не используете CORS, можно убрать
import registerRouter from './routes/register.js';
import carsRouter    from './routes/cars.js';   // ⬅ новый роутер

// Создаём экземпляр приложения
const app = express();

// ── MIDDLEWARES ──────────────────────────────────

// Преобразование JSON-тела
app.use(express.json());

// Разрешить CORS (при необходимости)
app.use(cors());

// ── РОУТЕРЫ ──────────────────────────────────────

// Существующий роутер регистрации
app.use('/api/register', registerRouter);

// Новый роутер для списка и фильтрации машин
app.use('/api/cars', carsRouter);

// ── ПОДКЛЮЧЕНИЕ К БАЗЕ ДАННЫХ ────────────────────

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/yourdbname';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected');
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
});

// ── ЗАПУСК СЕРВЕРА ───────────────────────────────

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
