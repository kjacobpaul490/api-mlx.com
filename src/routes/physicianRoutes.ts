import express from 'express';
import PhysicianController from '../controller/physicianController.js';

const router = express.Router();

/**
 * Routes for Physician operations
 */

/**
 * @swagger
 * /physicians/getPhysicianByGuid/{physicianGuid}:
 *   get:
 *     summary: Get physician by GUID
 *     tags: [Physicians]
 *     parameters:
 *       - in: path
 *         name: physicianGuid
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The physician GUID
 *     responses:
 *       200:
 *         description: Physician found
 *       400:
 *         description: Physician not found
 */
router.get('/getPhysicianByGuid/:physicianGuid', PhysicianController.getPhysicianByGuid);

/**
 * @swagger
 * /physicians/getAllphysicians:
 *   get:
 *     summary: Get all physicians with pagination
 *     tags: [Physicians]
 *     parameters:
 *       - in: query
 *         name: pageNumber
 *         required: true
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: pageSize
 *         required: true
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Page size
 *     responses:
 *       200:
 *         description: List of physicians
 */
router.get('/getAllphysicians', PhysicianController.getAllphysicians);

/**
 * @swagger
 * /physicians/createPhysician:
 *   post:
 *     summary: Create a new physician
 *     tags: [Physicians]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               mobile_number:
 *                 type: string
 *     responses:
 *       201:
 *         description: Physician created successfully
 */
router.post('/createPhysician', PhysicianController.createPhysician);

/**
 * @swagger
 * /physicians/deletePhysicianByGuid/{physicianGuid}:
 *   delete:
 *     summary: Delete physician by GUID
 *     tags: [Physicians]
 *     parameters:
 *       - in: path
 *         name: physicianGuid
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The physician GUID
 *     responses:
 *       200:
 *         description: Physician deleted successfully
 *       400:
 *         description: Physician not found
 */
router.delete('/deletePhysicianByGuid/:physicianGuid', PhysicianController.deletePhysicianByGuid);

export default router;