import express from 'express';
import ColorService from '../services/ColorService.js';
import ColorController from '../controllers/ColorController.js';
import createConnection from '../db/config/conex.js';

const router = express.Router();

const conex = await createConnection();
const colorService = new ColorService(conex);
const colorController = new ColorController(colorService);

router.get('/get/:id', colorController.getById);
router.get('/all', colorController.getAll);
router.post('/create', colorController.create);
router.put('/update/:id', colorController.update);
router.delete('/delete/:id', colorController.delete);

export default router;