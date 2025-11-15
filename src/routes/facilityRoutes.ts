import express from 'express';
import FacilityController from '../controller/facilityController.js';

const router = express.Router();

/**
 * Routes for Facility operations
 */

/**
 * @swagger
 * /facilities/getFacilityByGuid/{facility_guid}:
 *   get:
 *     summary: Get facility by GUID
 *     tags: [Facilities]
 *     parameters:
 *       - in: path
 *         name: facility_guid
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The facility GUID
 *     responses:
 *       200:
 *         description: Facility found
 *       400:
 *         description: Facility not found
 */
router.get('/getFacilityByGuid/:facility_guid', FacilityController.getFacilityByGuid);

/**
 * @swagger
 * /facilities/getAllfacilities:
 *   get:
 *     summary: Get paginated list of all facilities
 *     tags: [Facilities]
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
 *         description: List of facilities
 */
router.get('/getAllfacilities', FacilityController.getAllfacilities);

/**
 * @swagger
 * /facilities/createFacility:
 *   post:
 *     summary: Create a new facility
 *     tags: [Facilities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               mobile_number:
 *                 type: string
 *               email:
 *                 type: string
 *               address_line1:
 *                 type: string
 *     responses:
 *       201:
 *         description: Facility created successfully
 */
router.post('/createFacility', FacilityController.createFacility);

/**
 * @swagger
 * /facilities/deleteFacilityByGuid/{facilityGuid}:
 *   delete:
 *     summary: Delete a facility by GUID
 *     tags: [Facilities]
 *     parameters:
 *       - in: path
 *         name: facilityGuid
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The facility GUID
 *     responses:
 *       200:
 *         description: Facility deleted successfully
 *       400:
 *         description: Facility not found
 */
router.delete('/deleteFacilityByGuid/:facilityGuid', FacilityController.deleteFacilityByGuid);

export default router;