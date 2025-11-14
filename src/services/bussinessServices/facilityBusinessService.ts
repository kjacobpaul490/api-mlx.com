import type { Facility } from "../../models/facility.js";
import FacilityRepository from "../repositoryServices/facilityRepository.js";

class FacilityBusinessService {

     /**
     * Fetches a facility by its GUID.
     * 
     * @param facilityGuid - Unique identifier of the facility.
     * @returns Promise resolving with facility data.
     */
     async getFacilityByGuid(facilityGuid: string): Promise<any> {
          const facilityRepository = new FacilityRepository();
          return await facilityRepository.getFacilityByGuid(facilityGuid);
     }

     /**
     * Retrieves all facilities with pagination.
     * 
     * @param pageNumber - Current page number.
     * @param PageSize - Number of records per page.
     * @returns Promise resolving with a list of facilities.
     */
     async getAllfacilities(pageNumber: number, PageSize: number): Promise<Facility[]> {
          const facilityRepository = new FacilityRepository();
          return await facilityRepository.getAllfacilities(pageNumber, PageSize);
     }

     /**
     * Creates a new facility record.
     * 
     * @param facility - Facility data to be created.
     * @returns Promise resolving with created facility details.
     */
     async createFacility(facility: Facility): Promise<any> {
          const facilityRepository = new FacilityRepository();
          return await facilityRepository.createFacility(facility);
     }

     /**
     * Deletes a facility using its GUID.
     * 
     * @param facilityGuid - GUID of the facility to delete.
     * @returns Promise resolving when the deletion is completed.
     */
     async deleteFacilityByGuid(facilityGuid: string): Promise<any> {
          const facilityRepository = new FacilityRepository();
          return await facilityRepository.deleteFacilityByGuid(facilityGuid);
     }

}

export default FacilityBusinessService;