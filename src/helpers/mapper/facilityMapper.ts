import type { Facility } from "../../models/facility.js";

class FacilityMapper {
    
     /**
     * Map a database record to a Facility model
     * @param dbRecord Raw database row returned from SQL
     * @returns A strongly typed Facility object
     */
    mapToFacility(dbRecord: any): Facility {
        return {
            Guid: dbRecord.guid,
            Name: dbRecord.name,
            MobileNumber: dbRecord.mobile_number,
            AlternativeMobileNumber: dbRecord.alternative_mobile_number || null,
            AddressLine1: dbRecord.address_line1,
            AddressLine2: dbRecord.address_line2 || null,
            City: dbRecord.city,
            State: dbRecord.state,
            Zipcode: dbRecord.zipcode,
            Country: dbRecord.country,
            Email: dbRecord.email,
            FaxNumber: dbRecord.fax_number || null,
            PrimaryInchargeName: dbRecord.primary_incharge_name,
            PrimaryInchargeMobileNumber: dbRecord.primary_incharge_mobile_number,
            PrimaryInchargeDesignation: dbRecord.primary_incharge_designation || null,
            IsActive: dbRecord.is_active,
            ResultCommunicationMethod: dbRecord.result_communication_method,
        };
    }
}

export default FacilityMapper;
