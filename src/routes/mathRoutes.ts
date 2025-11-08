import express from 'express';
import mathController from '../controller/mathController.js';

const mathRoutes = express.Router();

mathRoutes.get('/add', mathController.add);



export default mathRoutes;
