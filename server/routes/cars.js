import { Router } from 'express';
import { listCars } from '../controllers/carController.js';

const router = Router();
router.get('/', listCars);
export default router;
