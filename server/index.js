import express           from 'express';
import mongoose          from 'mongoose';
import dotenv            from 'dotenv';
import cors              from 'cors';
import path              from 'path';
import { fileURLToPath } from 'url';

// ── API-роуты ─────────────────────────────────────────
import RegisterRoutes  from './routes/register.js';
import authRoutes      from './routes/auth.js';
import protectedRoutes from './routes/protected.js';
import carsRouter      from './routes/cars.js';

// ── Базовые константы ────────────────────────────────
dotenv.config();
const PORT = process.env.PORT || 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// ── Подключаем MongoDB ───────────────────────────────
mongoose.connect(process.env.DB_LINK)
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error', err));

const app = express();

// ── Middleware ───────────────────────────────────────
app.use(express.json());
app.use(cors());

// ── API ───────────────────────────────────────────────
app.use('/reg',       RegisterRoutes);
app.use('/auth',      authRoutes);
app.use('/protected', protectedRoutes);
app.use('/cars',      carsRouter);            // ← ваш эндпоинт /cars

// ── React-build статика ─────────────────────────────
const buildDir = path.join(__dirname, '..', 'client', 'build');
app.use(express.static(buildDir));

// ── SPA fallback (без звёздочки!) ────────────────────
app.use((req, res) => {
  // любые GET-запросы, которые не совпали с API и статикой,
  // отдаем index.html, чтобы React Router обработал путь
  if (req.method === 'GET') {
    res.sendFile(path.join(buildDir, 'index.html'));
  } else {
    res.status(404).end();
  }
});

// ── Старт сервера ────────────────────────────────────
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));