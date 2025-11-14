import express from 'express';
import PhysicianController from '../controller/physicianController.js';

const router = express.Router();

/**
 * Routes for Physician operations
 */

// Get physician by GUID
router.get('/getPhysicianByGuid/:physicianGuid', PhysicianController.getPhysicianByGuid);

// Get all physicians with pagination
router.get('/getAllphysicians/:pageNumber/:pageSize', PhysicianController.getAllphysicians);

// Create a new physician
router.post('/createPhysician', PhysicianController.createPhysician);

// Delete physician by GUID
router.delete('/deletePhysicianByGuid/:physicianGuid', PhysicianController.deletePhysicianByGuid);

export default router;