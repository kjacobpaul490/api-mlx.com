import express from 'express';
import FacilityController from '../controller/facilityController.js';

const router = express.Router();

/**
 * Routes for Facility operations
 */

// Get a facility by GUID
router.get('/getFacilityByGuid/:facility_guid', FacilityController.getFacilityByGuid);

// Get paginated list of all facilities
router.get('/getAllfacilities/:pageNumber/:pageSize', FacilityController.getAllfacilities);

// Create a new facility
router.post('/createFacility', FacilityController.createFacility);

// Delete a facility by GUID
router.delete('/deleteFacilityByGuid/:facilityGuid', FacilityController.deleteFacilityByGuid);

export default router;