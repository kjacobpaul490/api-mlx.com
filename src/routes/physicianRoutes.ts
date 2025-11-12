import express from 'express';
import PhysicianController from '../controller/physicianController.js';

const router = express.Router();

router.get('/getPhysicianByGuid/:physicianGuid', PhysicianController.getPhysicianByGuid);
router.get('/getAllphysicians/:pageNumber/:pageSize', PhysicianController.getAllphysicians);
router.post('/createPhysician', PhysicianController.createPhysician);
router.delete('/deletePhysicianByGuid/:physicianGuid', PhysicianController.deletePhysicianByGuid);

export default router;