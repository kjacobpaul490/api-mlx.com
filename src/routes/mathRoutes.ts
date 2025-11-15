import express from 'express';
import mathController from '../controller/mathController.js';

const mathRoutes = express.Router();

/**
 * @swagger
 * /math/add:
 *   get:
 *     summary: Add two numbers
 *     tags: [Math]
 *     parameters:
 *       - in: query
 *         name: a
 *         required: true
 *         schema:
 *           type: number
 *         description: First number
 *       - in: query
 *         name: b
 *         required: true
 *         schema:
 *           type: number
 *         description: Second number
 *     responses:
 *       200:
 *         description: Sum of two numbers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 */
mathRoutes.get('/add', mathController.add);

export default mathRoutes;