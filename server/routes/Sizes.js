import express from 'express';
import SizeService from '../services/SizeService.js';
import SizeController from '../controllers/SizeController.js';
import createConnection from '../db/config/conex.js';

const router = express.Router();

const conex = await createConnection();
const sizeService = new SizeService(conex);
const sizeController = new SizeController(sizeService);

router.get('/get/:id', sizeController.getById);
router.get('/all', sizeController.getAll);
router.post('/create', sizeController.create);
router.put('/update/:id', sizeController.update);
router.delete('/delete/:id', sizeController.delete);

export default router;