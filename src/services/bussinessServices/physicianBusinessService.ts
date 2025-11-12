import type { Physician } from "../../models/physician.js";
import PhysicianRepository from "../repositoryServices/physicianRepository.js";

class PhysicianBusinessService {
            async getPhysicianByGuid(physicianGuid: string): Promise<any> {
                const physicianRepository = new PhysicianRepository();
                return await physicianRepository.getPhysicianByGuid(physicianGuid);
            }

            async getAllphysicians(pageNumber: Number, pageSize: Number): Promise<any> {
                const physicianRepository = new PhysicianRepository();
                return await physicianRepository.getAllphysicians(pageNumber, pageSize);
            }

            async createPhysician (physician: Physician): Promise<any> {
                const physicianRepository = new PhysicianRepository ();
                return await physicianRepository.createPhysician(physician);

            }

            async deletePhysicianByGuid (physicianGuid: string): Promise<any> { 
                const physicianRepository = new PhysicianRepository();
                return await physicianRepository.deletePhysicianByGuid(physicianGuid);
            }

}

export default PhysicianBusinessService;