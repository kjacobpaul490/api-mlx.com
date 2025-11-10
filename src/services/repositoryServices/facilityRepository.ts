import FacilityMapper from "../../helpers/mapper/facilityMapper.js";
import { getMSSQLConnection } from "../../helpers/mssql.js";
import type { Facility } from "../../models/facility.js";


class FacilityRepository {

    private facilityMapper: FacilityMapper;

    constructor() {
        this.facilityMapper = new FacilityMapper();
    }

    // Implementation of FacilityRepository methods
    /**
         * 
         * @param facilityGuid 
         * @returns 
         */

    async getFacilityByGuid(facilityGuid: string): Promise<any> {
        try {
            const pool = await getMSSQLConnection();
            const request = pool.request();


            const result = await request.query(`exec [facility].[spGetFacilityByGuid] @facility_guid='${facilityGuid}'`);

            return result.recordset;

        } catch (error) {
            return Promise.reject(error);
        }
    }

    async getAllfacilities(pageNumber: number, PageSize: number): Promise<Facility[]> {
        try {
            const pool = await getMSSQLConnection();
            const request = pool.request();

            const result = await request.query(`exec [facility].[spGetAllfacilities] @PageNumber='${pageNumber}',@PageSize='${PageSize}'`);
            return result.recordset.map((record: any) => this.facilityMapper.mapToFacility(record));

        } catch (error) {
            return Promise.reject(error);
        }
    }
    async createFacility(facility: Facility): Promise<any> {
        try {
            const pool = await getMSSQLConnection();
            const request = pool.request();

            const result = await request.query(`exec
            [facility].[spCreatefacility]
                @name='${facility.Name}', 
                @mobile_number='${facility.MobileNumber}',	
                @alternative_mobile_number='${facility.AlternativeMobileNumber}',
                @address_line1='${facility.AddressLine1}', 
                @address_line2='${facility.AddressLine2}', 
                @city='${facility.City}',
                @state='${facility.State}',
                @zipcode='${facility.Zipcode}', 
                @country='${facility.Country}', 
                @email='${facility.Email}',
                @fax_number='${facility.FaxNumber}',
                @primary_incharge_name='${facility.PrimaryInchargeName}',
                @primary_incharge_mobile_number='${facility.PrimaryInchargeMobileNumber}', 
                @primary_incharge_designation='${facility.PrimaryInchargeDesignation}',
                @is_active='${facility.IsActive}',
                @result_communication_method='${facility.ResultCommunicationMethod}'`);

            return result.recordset;
        } catch (error) {
            return Promise.reject(error);
        }



    }
}

export default FacilityRepository;