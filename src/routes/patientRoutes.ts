import express from 'express';
import PatientController from '../controller/patientController.js';

const router = express.Router();

/**
 * Routes for Patient operations
 */

// Get patient by GUID
router.get('/getPatientByGuid/:patientGuid', PatientController.getPatientByGuid);

// Get all patients with pagination
router.get('/getAllPatients/:pageNumber/:pageSize', PatientController.getAllPatients);

// Delete a patient by GUID
router.delete('/deletePatientByGuid/:patientGuid', PatientController.deletePatientByGuid);

// Create a new patient
router.post('/createPatient', PatientController.createPatient);

export default router;