import type { Facility } from "../../models/facility.js";
import FacilityRepository from "../repositoryServices/facilityRepository.js";

class FacilityBusinessService {

     async getFacilityByGuid(facilityGuid: string): Promise<any> {
          const facilityRepository = new FacilityRepository();
          return await facilityRepository.getFacilityByGuid(facilityGuid);
     }

     async getAllfacilities(pageNumber: number, PageSize: number): Promise<Facility[]> {
          const facilityRepository = new FacilityRepository();
          return await facilityRepository.getAllfacilities(pageNumber, PageSize);
     }

     async createFacility(facility: Facility): Promise<any> {
          const facilityRepository = new FacilityRepository();
          return await facilityRepository.createFacility(facility);
     }
     
     async deleteFacilityByGuid(facilityGuid: string): Promise<any> { 
          const facilityRepository = new FacilityRepository(); 
          return await facilityRepository.deleteFacilityByGuid(facilityGuid); 
     }
     
}

export default FacilityBusinessService;