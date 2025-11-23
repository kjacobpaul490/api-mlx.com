import Express from "express";
import insuranceController from "../controller/insuranceController.js";

const insuranceRoutes = Express.Router();

/**
 * @swagger
 * /insurances/getinsuranceByGuid/{orderGuid}:
 *   get:
 *     summary: Get insurance by GUID
 *     tags: [Insurances]
 *     parameters:
 *       - in: path
 *         name: orderGuid
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The insurance GUID
 *     responses:
 *       200:
 *         description: Insurance found
 *       400:
 *         description: Insurance not found
 */
insuranceRoutes.get('/getinsuranceByGuid/:orderGuid', insuranceController.getinsuranceByGuid);

/**
 * @swagger
 * /insurances/getAllInsurances:
 *   get:
 *     summary: Get all insurances with pagination
 *     tags: [Insurances]
 *     parameters:
 *       - in: query
 *         name: pagenumber
 *         required: true
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: pagesize
 *         required: true
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Page size
 *     responses:
 *       200:
 *         description: List of insurances
 */
insuranceRoutes.get('/getAllInsurances', insuranceController.getAllInsurances);

export default insuranceRoutes;