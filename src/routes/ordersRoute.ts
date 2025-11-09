import express from 'express';
import OrdersController from '../controller/ordersController.js';

const ordersRoutes = express.Router();

ordersRoutes.get('/getOrderByGuid/:orderGuid', OrdersController.getOrderByGuid);

export default ordersRoutes;