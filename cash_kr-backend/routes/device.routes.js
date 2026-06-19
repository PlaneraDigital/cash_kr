import { Router } from 'express';
import { getBrands, getModels, getDeviceBySlug, calculatePrice, searchDevices } from '../controllers/device.controller.js';

const router = Router();

router.get('/search', searchDevices);
router.get('/brands', getBrands);
router.get('/models', getModels);
router.get('/:slug', getDeviceBySlug);
router.post('/calculate-price', calculatePrice);

export default router;
