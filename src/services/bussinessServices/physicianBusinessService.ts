import type { Physician } from "../../models/physician.js";
import PhysicianRepository from "../repositoryServices/physicianRepository.js";

/**
 * Business service layer for handling physician-related operations.
 * Acts as an intermediary between controllers and repository layer.
 */
class PhysicianBusinessService {

    /**
     * Fetch physician details by GUID.
     * @param physicianGuid Unique identifier of the physician
     * @returns Physician record if found
     */
    async getPhysicianByGuid(physicianGuid: string): Promise<any> {
        const physicianRepository = new PhysicianRepository();
        return await physicianRepository.getPhysicianByGuid(physicianGuid);
    }

    /**
     * Fetch a paginated list of physicians.
     * @param pageNumber Current page number
     * @param pageSize   Number of records per page
     * @returns Paginated physician list
     */
    async getAllphysicians(pageNumber: Number, pageSize: Number): Promise<any> {
        const physicianRepository = new PhysicianRepository();
        return await physicianRepository.getAllphysicians(pageNumber, pageSize);
    }

    /**
     * Create a new physician record.
     * @param physician Physician object containing the data to be saved
     * @returns Result of insert operation
     */
    async createPhysician(physician: Physician): Promise<any> {
        const physicianRepository = new PhysicianRepository();
        return await physicianRepository.createPhysician(physician);

    }

    /**
     * Soft delete physician using GUID.
     * @param physicianGuid Unique identifier of the physician
     * @returns Result of delete operation
     */
    async deletePhysicianByGuid(physicianGuid: string): Promise<any> {
        const physicianRepository = new PhysicianRepository();
        return await physicianRepository.deletePhysicianByGuid(physicianGuid);
    }
}

export default PhysicianBusinessService;