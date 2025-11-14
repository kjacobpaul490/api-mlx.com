import FacilityMapper from "../../helpers/mapper/facilityMapper.js";
import { getMSSQLConnection } from "../../helpers/mssql.js";
import type { Facility } from "../../models/facility.js";

class FacilityRepository 
{
    private facilityMapper: FacilityMapper;

    constructor() 
    {
        this.facilityMapper = new FacilityMapper();
    }

    /**
     * Fetches a facility record from the database using its unique GUID.
     * 
     * @param facilityGuid - Unique identifier of the facility.
     * @returns Promise resolving with the facility data.
     */
    async getFacilityByGuid(facilityGuid: string): Promise<any> 
    {
        try 
        {
            const pool = await getMSSQLConnection();
            const request = pool.request();

            const result = await request.query(`exec [facility].[spGetFacilityByGuid] @facility_guid='${facilityGuid}'`);

            return result.recordset;

        } catch (error) 
        {
            return Promise.reject(error);
        }
    }

    /**
     * Retrieves all facilities with pagination support.
     * 
     * @param pageNumber - The page number to fetch.
     * @param PageSize - Number of records per page.
     * @returns Promise resolving with a list of facilities.
     */
    async getAllfacilities(pageNumber: number, PageSize: number): Promise<Facility[]> 
    {
        try 
        {
            const pool = await getMSSQLConnection();
            const request = pool.request();

            const result = await request.query(`exec [facility].[spGetAllfacilities] @PageNumber='${pageNumber}',@PageSize='${PageSize}'`);
            
            return result.recordset.map((record: any) => this.facilityMapper.mapToFacility(record));

        } catch (error) 
        {
            return Promise.reject(error);
        }
    }

    /**
     * Creates a new facility record in the database.
     * 
     * @param facility - Facility object containing all required fields.
     * @returns Promise resolving with the created facility record.
     */
    async createFacility(facility: Facility): Promise<any> 
    {
        try 
        {
            const pool = await getMSSQLConnection();
            const request = pool.request();

            const result = await request.query(`
                exec [facility].[spCreatefacility]
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
                    @result_communication_method='${facility.ResultCommunicationMethod}'
            `);

            return result.recordset;

        } catch (error) 
        {
            return Promise.reject(error);
        }
    }

    /**
    * Deletes a facility from the database based on GUID.
    * 
    * @param facilityGuid - Unique identifier of the facility to delete.
    * @returns Promise resolving when deletion is successful.
    */
    async deleteFacilityByGuid(facilityGuid: string): Promise<any> 
    {
        try 
        {
            const pool = await getMSSQLConnection();
            const request = pool.request();

            const result = await request.query(`exec [facility].[spDeleteFacilityByGuid] @facility_guid='${facilityGuid}'`);
            return result.recordset;

        } catch (error) 
        {
            return Promise.reject(error);
        }
    }
}

export default FacilityRepository;