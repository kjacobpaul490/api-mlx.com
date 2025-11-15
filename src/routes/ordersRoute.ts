import express from 'express';
import OrdersController from '../controller/ordersController.js';

const ordersRoutes = express.Router();

/**
 * @swagger
 * /orders/getOrderByGuid/{orderGuid}:
 *   get:
 *     summary: Get order by GUID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderGuid
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The order GUID
 *     responses:
 *       200:
 *         description: Order found
 *       400:
 *         description: Order not found
 */
ordersRoutes.get('/getOrderByGuid/:orderGuid', OrdersController.getOrderByGuid);

export default ordersRoutes;