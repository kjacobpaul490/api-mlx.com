import express from 'express';
import FacilityController from '../controller/facilityController.js';

const router = express.Router();

router.get('/getFacilityByGuid/:facility_guid', FacilityController.getFacilityByGuid);
router.get('/getAllfacilities/:pageNumber/:pageSize', FacilityController.getAllfacilities);
router.post('/createFacility', FacilityController.createFacility);

export default router;