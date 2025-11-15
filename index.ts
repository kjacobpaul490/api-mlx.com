import dotenv from 'dotenv';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './src/swagger/swagger.js';

import mathRoutes from './src/routes/mathRoutes.js';
import ordersRoutes from './src/routes/ordersRoute.js';
import patientRoutes from './src/routes/patientRoutes.js';
import physicianRoutes from './src/routes/physicianRoutes.js';
import facilityRoutes from './src/routes/facilityRoutes.js';
import insuranceRoutes from './src/routes/insuranceRoutes.js';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * Math routes
 * Handles simple mathematical operations for testing purposes.
 * Base URL: /
 */
app.use("/", mathRoutes);

/**
 * Order routes
 * Contains CRUD operations related to orders.
 * Base URL: /orders
 */
app.use("/orders", ordersRoutes);

/**
 * Patient routes
 * Exposes API endpoints for creating, reading, updating,
 * and deleting patient data.
 * Base URL: /patients
 */
app.use("/patients", patientRoutes);

/**
 * Facility routes
 * API endpoints for facility management.
 * Base URL: /facilities
 */
app.use("/facilities", facilityRoutes);

/**
 * Insurance routes
 * Handles insurance provider and related data operations.
 * Base URL: /insurance
 */
app.use("/insurance", insuranceRoutes);

/**
 * Physician routes
 * Manages physician creation, updates, deletion,
 * and listing of physician information.
 * Base URL: /physicians
 */
app.use("/physicians", physicianRoutes);

/**
 * Starts the Node.js Express server
 */
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
