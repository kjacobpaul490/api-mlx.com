import { getMSSQLConnection } from "../../helpers/mssql.js";
import type { Patient } from "../../models/paitent.js";
import PatientMapper from "../../helpers/mapper/patientMapper.js";
import sql from 'mssql';

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

            // Add parameters using proper parameterized queries
            request.input('first_name', patient.FirstName);
            request.input('middle_name', patient.MiddleName);
            request.input('last_name', patient.LastName);
            request.input('gender', patient.Gender);
            request.input('dob', sql.Date, patient.Dob);
            request.input('mobile_number', patient.MobileNumber);
            request.input('alternative_mobile_number', patient.AlternativeMobileNumber);
            request.input('email', patient.Email);
            request.input('address_line1', patient.AddressLine1);
            request.input('address_line2', patient.AddressLine2);
            request.input('city', patient.City);
            request.input('state', patient.State);
            request.input('zipcode', patient.Zipcode);
            request.input('country', patient.Country);
            request.input('race', patient.Race);
            request.input('ethnicity', patient.Ethnicity);
            request.input('is_homebound_patient', patient.IsHomeboundPatient);
            request.input('is_hard_stick', patient.IsHardStick);
            request.input('patient_notes', patient.PatientNotes);

            const result = await request.query(`
                exec [patient].[spCreatePatient] 
                    @first_name = @first_name,
                    @middle_name = @middle_name,
                    @last_name = @last_name,
                    @gender = @gender,
                    @dob = @dob,
                    @mobile_number = @mobile_number,
                    @alternative_mobile_number = @alternative_mobile_number,
                    @email = @email,
                    @address_line1 = @address_line1,
                    @address_line2 = @address_line2,
                    @city = @city,
                    @state = @state,
                    @zipcode = @zipcode,
                    @country = @country,
                    @race = @race,
                    @ethnicity = @ethnicity,
                    @is_homebound_patient = @is_homebound_patient,
                    @is_hard_stick = @is_hard_stick,
                    @patient_notes = @patient_notes
            `);

            return result.recordset;

        } catch (error) {
            return Promise.reject(error);
        }
    }
}

export default PatientsRepository;