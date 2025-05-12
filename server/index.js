import express           from 'express';
import mongoose          from 'mongoose';
import dotenv            from 'dotenv';
import cors              from 'cors';
import path              from 'path';
import { fileURLToPath } from 'url';

// ── API-роуты ─────────────────────────────────────────
import registerRoutes   from './routes/register.js';
import authRoutes       from './routes/auth.js';
import protectedRoutes  from './routes/protected.js';
import carsRouter       from './routes/cars.js';        // dev-mt2
import favoritesRoutes  from './routes/favorites.js';   // main

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
app.use('/reg',       registerRoutes);
app.use('/auth',      authRoutes);
app.use('/protected', protectedRoutes);
app.use('/cars',      carsRouter);           // ← /cars эндпоинт
app.use('/favorites', favoritesRoutes);      // ← /favorites эндпоинт

// ── React-build статика + SPA-fallback ───────────────
const buildDir = path.join(__dirname, '..', 'client', 'build');
app.use(express.static(buildDir));

app.use((req, res) => {
  if (req.method === 'GET') {
    res.sendFile(path.join(buildDir, 'index.html'));   // отдаём SPA файл
  } else {
    res.status(404).end();
  }
});

// ── Старт сервера ────────────────────────────────────
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
