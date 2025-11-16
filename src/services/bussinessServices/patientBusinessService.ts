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
        
        // Convert Dob string to proper Date format
        if (patient.Dob) {
            console.log("Original DOB received:", patient.Dob, "Type:", typeof patient.Dob);
            // patient.Dob = this.parseDate(patient.Dob);
            console.log("Parsed DOB:", patient.Dob);
        }

        return await patientsRepository.createPatient(patient);
    }

    /**
     * Parse date from various formats to a proper Date object
     * Supports: DD-MM-YYYY, DD/MM/YYYY, YYYY-MM-DD, ISO format
     * @param dateString Date string in various formats
     * @returns Date object in UTC
     */
    private parseDate(dateString: any): Date {
        if (dateString instanceof Date) {
            return dateString;
        }

        const dateStr = dateString.toString().trim();
        console.log("Parsing date string:", dateStr);

        // Check if it's in DD-MM-YYYY format
        const ddmmyyyyDashPattern = /^(\d{2})-(\d{2})-(\d{4})$/;
        const matchDash = dateStr.match(ddmmyyyyDashPattern);

        if (matchDash) {
            const [, day, month, year] = matchDash;
            const isoDateString = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T00:00:00.000Z`;
            console.log("Matched DD-MM-YYYY format, created ISO:", isoDateString);
            return new Date(isoDateString);
        }

        // Check if it's in DD/MM/YYYY format
        const ddmmyyyySlashPattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
        const matchSlash = dateStr.match(ddmmyyyySlashPattern);

        if (matchSlash) {
            const [, day, month, year] = matchSlash;
            const isoDateString = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T00:00:00.000Z`;
            console.log("Matched DD/MM/YYYY format, created ISO:", isoDateString);
            return new Date(isoDateString);
        }

        // Check if it's in YYYY-MM-DD format
        const yyyymmddPattern = /^(\d{4})-(\d{2})-(\d{2})$/;
        const matchYYYY = dateStr.match(yyyymmddPattern);

        if (matchYYYY) {
            const isoDateString = `${dateStr}T00:00:00.000Z`;
            console.log("Matched YYYY-MM-DD format, created ISO:", isoDateString);
            return new Date(isoDateString);
        }

        // Try parsing as ISO or other standard formats
        const parsedDate = new Date(dateStr);
        
        if (isNaN(parsedDate.getTime())) {
            console.error("Failed to parse date:", dateStr);
            throw new Error(`Invalid date format: ${dateStr}. Expected DD-MM-YYYY, DD/MM/YYYY, YYYY-MM-DD or ISO format.`);
        }

        console.log("Parsed as standard date:", parsedDate);
        return parsedDate;
    }
}

export default patientBusinessService;