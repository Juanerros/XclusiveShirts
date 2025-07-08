import express from 'express';
import ProductsService from '../services/ProductService.js';
import ProductsController from '../controllers/ProductController.js'
import createConnection from '../db/config/conex.js';

const router = express.Router();

const conex = await createConnection();
const productsService = new ProductsService(conex);
const productsController = new ProductsController(productsService);

router.get('/get/:id', productsController.getById);
router.get('/all', productsController.getAllProducts);
router.get('/all/info', productsController.getAllInfo);
router.post('/create', productsController.create);
router.put('/update/:id', productsController.update);
router.delete('/delete/:id', productsController.delete);

export default router;