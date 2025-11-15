import express from 'express';
import PatientController from '../controller/patientController.js';

const router = express.Router();

/**
 * Routes for Patient operations
 */

/**
 * @swagger
 * /patients/getPatientByGuid/{patientGuid}:
 *   get:
 *     summary: Get patient by GUID
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: patientGuid
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The patient GUID
 *     responses:
 *       200:
 *         description: Patient found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *       400:
 *         description: Patient not found
 */
router.get('/getPatientByGuid/:patientGuid', PatientController.getPatientByGuid);

/**
 * @swagger
 * /patients/getAllPatients:
 *   get:
 *     summary: Get all patients with pagination
 *     tags: [Patients]
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
 *         description: List of patients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Patient'
 */
router.get('/getAllPatients', PatientController.getAllPatients);

/**
 * @swagger
 * /patients/deletePatientByGuid/{patientGuid}:
 *   delete:
 *     summary: Delete a patient by GUID
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: patientGuid
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The patient GUID
 *     responses:
 *       200:
 *         description: Patient deleted successfully
 *       400:
 *         description: Patient not found
 */
router.delete('/deletePatientByGuid/:patientGuid', PatientController.deletePatientByGuid);

/**
 * @swagger
 * /patients/createPatient:
 *   post:
 *     summary: Create a new patient
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Patient'
 *     responses:
 *       201:
 *         description: Patient created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 */
router.post('/createPatient', PatientController.createPatient);

export default router;