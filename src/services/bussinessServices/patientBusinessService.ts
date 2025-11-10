import type { Patient } from "../../models/paitent.js";
import PatientsRepository from "../repositoryServices/patientsRepository.js";

class patientBusinessService {
    // Business logic methods for patient services will go here

            async getPatientByGuid(patientGuid: string): Promise<any> {
                // Business logic can be added here if needed

                const patientsRepository = new PatientsRepository();
                return await patientsRepository.getPatientByGuid(patientGuid);
            }
            /**
             * 
             * @param pageNumber    
             * @param pageSize 
             * @returns 
             */
            async getAllPatients(pageNumber: number,pageSize:number): Promise<Patient[]> {
                const patientsRepository = new PatientsRepository();
                return await patientsRepository.getAllPatients(pageNumber, pageSize);
            }

            async deletePatientByGuid(patientGuid: string): Promise<any> {
                const patientsRepository = new PatientsRepository();
                return await patientsRepository.deletePatientByGuid(patientGuid);
            }

}

export default patientBusinessService;