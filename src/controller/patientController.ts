import express, { type NextFunction, type Request, type Response } from 'express';
import patientBusinessService from '../services/bussinessServices/patientBusinessService.js';
import PatientMapper from '../helpers/mapper/patientMapper.js';

class PatientController {
    private patientMapper: PatientMapper = new PatientMapper();

    constructor() {
        // Bind methods to preserve 'this' context
        this.getPatientByGuid = this.getPatientByGuid.bind(this);
        this.getAllPatients = this.getAllPatients.bind(this);
        this.deletePatientByGuid = this.deletePatientByGuid.bind(this);
        this.createPatient = this.createPatient.bind(this);
    }

    /**
     * Fetch a patient by their GUID
     * @param req Express request object
     * @param res Express response object
     * @param next Express next function
     */
    async getPatientByGuid(req: Request, res: Response, next: NextFunction): Promise<any> {
        const patientServiceInstance = new patientBusinessService();
        const { patientGuid } = req.params;

        if (!patientGuid) {
            return Promise.reject(new Error("patientGuid parameter is required"));
        }

        const result = await patientServiceInstance.getPatientByGuid(patientGuid);
        return res.json({ result });
    }

    /**
     * Fetch paginated list of patients
     * @param req Express request object (expects pageNumber & pageSize)
     * @param res Express response object
     * @param next Express next function
     */
    async getAllPatients(req: Request, res: Response, next: NextFunction): Promise<any> {
        const patientServiceInstance = new patientBusinessService();
        const pageNumber = parseInt(req.query.pageNumber as string) || 1;
        const pageSize = parseInt(req.query.pageSize as string) || 10;

        const result = await patientServiceInstance.getAllPatients(pageNumber, pageSize);
        return res.json({ result });
    }

    /**
     * Delete a patient by their GUID
     * @param req Express request object
     * @param res Express response object
     */
    async deletePatientByGuid(req: Request, res: Response): Promise<any> {
        const patientServiceInstance = new patientBusinessService();
        const { patientGuid } = req.params;

        if (!patientGuid) {
            return Promise.reject(new Error("patientGuid parameter is required"));
        }

        await patientServiceInstance.deletePatientByGuid(patientGuid);
        return res.json({ message: "Patient deleted successfully", patientGuid });
    }

    /**
     * Create a new patient record
     * @param req Express request object containing patient data
     * @param res Express response object
     */
    async createPatient(req: Request, res: Response): Promise<any> {
        const patientServiceInstance = new patientBusinessService();
        const patient = req.body;
        
        const result = await patientServiceInstance.createPatient(patient);
        return res.json({ result });
    }
}
export default new PatientController();