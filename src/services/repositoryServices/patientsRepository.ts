import { getMSSQLConnection } from "../../helpers/mssql.js";
import type { Patient } from "../../models/paitent.js";
import PatientMapper from "../../helpers/mapper/patientMapper.js";

class PatientsRepository {
    private patientMapper: PatientMapper;

    constructor() {
        this.patientMapper = new PatientMapper();
    }

    /**
     * Fetches a single patient record by GUID.
     * 
     * @param patientGuid - Unique identifier of the patient.
     * @returns Promise resolving with patient data.
     */
    async getPatientByGuid(patientGuid: string): Promise<any> {
        try {
            const pool = await getMSSQLConnection();
            const request = pool.request();

            const result = await request.query(`exec [patient].[spGetPatientByGuid] @patient_guid='${patientGuid}'`);

            return result.recordset;

        } catch (error) {
            return Promise.reject(error);
        }

    }

    /**
     * Retrieves all patients with pagination support.
     * 
     * @param pageNumber - Page number to fetch.
     * @param pageSize - Number of records per page.
     * @returns Promise resolving with a mapped list of patients.
     */
    async getAllPatients(pageNumber: number, pageSize: number): Promise<Patient[]> {
        try {
            const pool = await getMSSQLConnection();
            const request = pool.request();

            const result = await request.query(`exec [patient].[spGetAllPatients] @PageNumber=${pageNumber},@PageSize=${pageSize}`);

            return result.recordset.map((record: any) => this.patientMapper.mapToPatient(record));

        } catch (error) {
            return Promise.reject(error);
        }
    }

    /**
     * Deletes a patient record based on GUID.
     * 
     * @param patientGuid - Patient GUID to delete.
     * @returns Promise resolving after deletion.
     */
    async deletePatientByGuid(patientGuid: string): Promise<any> {
        try {
            const pool = await getMSSQLConnection();
            const request = pool.request();

            const result = await request.query(`exec [patient].[spDeletePatientByGuid] @patient_guid='${patientGuid}'`);

            return result.recordset;

        } catch (error) {
            return Promise.reject(error);
        }
    }

    /**
     * Creates a new patient record in the database.
     * 
     * @param patient - Patient object with all required fields.
     * @returns Promise resolving with created patient.
     */
    async createPatient(patient: Patient): Promise<any> {
        try {
            const pool = await getMSSQLConnection();
            const request = pool.request();

            const result = await request.query(`
                exec [patient].[spCreatePatient] 
                    @first_name = '${patient.FirstName}',
                    @middle_name = '${patient.MiddleName}',
                    @last_name = '${patient.LastName}',
                    @gender = '${patient.Gender}',
                    @dob = '${patient.Dob}',
                    @mobile_number = '${patient.MobileNumber}',
                    @alternative_mobile_number = '${patient.AlternativeMobileNumber}',
                    @email = '${patient.Email}',
                    @address_line1 = '${patient.AddressLine1}',
                    @address_line2 = '${patient.AddressLine2}',
                    @city = '${patient.City}',
                    @state = '${patient.State}',
                    @zipcode = '${patient.Zipcode}',
                    @country = '${patient.Country}',
                    @race = '${patient.Race}',
                    @ethnicity = '${patient.Ethnicity}',
                    @is_homebound_patient = '${patient.IsHomeboundPatient}',
                    @is_hard_stick = '${patient.IsHardStick}',
                    @patient_notes = '${patient.PatientNotes}'
            `);

            return result.recordset;

        } catch (error) {
            return Promise.reject(error);
        }
    }
}

export default PatientsRepository;