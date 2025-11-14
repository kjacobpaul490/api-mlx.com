import type { Patient } from "../../models/paitent.js";
import PatientsRepository from "../repositoryServices/patientsRepository.js";

class patientBusinessService {

    // Fetch a single patient by GUID
    async getPatientByGuid(patientGuid: string): Promise<any> {
        const patientsRepository = new PatientsRepository();
        return await patientsRepository.getPatientByGuid(patientGuid);
    }

    /**
     * Fetch paginated list of patients
     * @param pageNumber Current page number
     * @param pageSize   Number of records per page
     */
    async getAllPatients(pageNumber: number, pageSize: number): Promise<Patient[]> {
        const patientsRepository = new PatientsRepository();
        return await patientsRepository.getAllPatients(pageNumber, pageSize);
    }

    // Remove a patient using GUID
    async deletePatientByGuid(patientGuid: string): Promise<any> {
        const patientsRepository = new PatientsRepository();
        return await patientsRepository.deletePatientByGuid(patientGuid);
    }

    // Create a new patient record
    async createPatient(patient: Patient): Promise<any> {
        const patientsRepository = new PatientsRepository();
        return await patientsRepository.createPatient(patient);
    }
}

export default patientBusinessService;