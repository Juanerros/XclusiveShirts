import express from 'express';
import UserAdminService from '../services/UserAdminService.js';
import UserAdminController from '../controllers/UserAdminController.js';
import createConnection from '../db/config/conex.js';
import requireAuth from '../middlewares/authMiddleware.js';

const router = express.Router();

const conex = await createConnection();
const userAdminService = new UserAdminService(conex);
const userAdminController = new UserAdminController(userAdminService);

// Only admins can access these endpoints
router.patch('/:id_login/toggle-admin', requireAuth, userAdminController.toggleAdmin);
router.get('/', requireAuth, userAdminController.getUsers);

export default router;