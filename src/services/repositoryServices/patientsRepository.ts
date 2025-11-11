import { getMSSQLConnection } from "../../helpers/mssql.js";
import type { Patient } from "../../models/paitent.js";
import PatientMapper from "../../helpers/mapper/patientMapper.js";

class PatientsRepository {
    private patientMapper: PatientMapper;

    constructor() {
        this.patientMapper = new PatientMapper();
    }

    // Implementation of PatientsRepository methods
    /**
         * 
         * @param orderGuid 
         * @returns 
         */
    
        async getPatientByGuid(patientGuid: string): Promise<any> {
            try {
                const pool = await getMSSQLConnection();
                const request = pool.request();
                // Add your SQL query and parameters here
    
                const result = await request.query( `exec [patient].[spGetPatientByGuid] @patient_guid='${patientGuid}'`);
    
                return result.recordset;
    
            } catch (error) {
                return Promise.reject(error);
            }
    
        }

        async getAllPatients(pageNumber: number,pageSize:number): Promise<Patient[]> {
            try {
                const pool = await getMSSQLConnection();
                const request = pool.request();
                // Add your SQL query and parameters here
    
                const result = await request.query( `exec [patient].[spGetAllPatients] @PageNumber=${pageNumber},@PageSize=${pageSize}`);
    
                return result.recordset.map((record: any) => this.patientMapper.mapToPatient(record));
    
            } catch (error) {
                return Promise.reject(error);
            }
    
        }

        async deletePatientByGuid(patientGuid: string): Promise<any> {
            try {
                const pool = await getMSSQLConnection();
                const request = pool.request();
                
                const result = await request.query( `exec [patient].[spDeletePatientByGuid] @patient_guid='${patientGuid}'`);

                return result.recordset;
            } catch (error) {
                return Promise.reject(error);
            }
        }

        async createPatient(patient: Patient): Promise<any> {
            try {
                const pool = await getMSSQLConnection();
                const request = pool.request();
    
                const result = await request.query(`exec
                    [patient].[spCreatePatient] 
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
                            @patient_notes = '${patient.PatientNotes}'`);
    
                return result.recordset;
            } catch (error) {
                return Promise.reject(error);
            }
        }
}

export default PatientsRepository;