import PhysicianMapper from "../../helpers/mapper/physicianMapper.js";
import { getMSSQLConnection } from "../../helpers/mssql.js";
import type { Physician } from "../../models/physician.js";

class PhysicianRepository {

    private physicianMapper: PhysicianMapper;

    constructor() {
        this.physicianMapper = new PhysicianMapper();
    }

    /**
     * Fetches a physician record from the database using its GUID.
     * 
     * @param physicianGuid - Unique identifier of the physician.
     * @returns Promise resolving with physician details.
     */
    async getPhysicianByGuid(physicianGuid: string): Promise<any> {
        try {
            const pool = await getMSSQLConnection();
            const request = pool.request();

            const result = await request.query(`exec [physician].[spGetphysicianByGuid] @physician_guid='${physicianGuid}'`);

            return result.recordset.map((record: any) => this.physicianMapper.mapToPhysician(record));

        } catch (error) {
            return Promise.reject(error);
        }
    }

    /**
    * Retrieves all physicians with pagination.
    * 
    * @param pageNumber - Current page.
    * @param pageSize - Number of records per page.
    * @returns Promise resolving with mapped physicians list.
    */
    async getAllphysicians(pageNumber: Number, pageSize: Number): Promise<any> {
        try {
            const pool = await getMSSQLConnection();
            const request = pool.request();

            const result = await request.query(`exec [physician].[spGetAllphysicians] @pageNumber = '${pageNumber}',@pageSize = '${pageSize}'`);

            return result.recordset.map((record: any) => this.physicianMapper.mapToPhysician(record));

        } catch (error) {
            return Promise.reject(error);
        }

    }

    /**
     * Creates a new physician record in the database.
     * 
     * @param physician - Physician object with required fields.
     * @returns Promise resolving with created physician record.
     */
    async createPhysician(physician: Physician): Promise<any> {
        try {
            const pool = await getMSSQLConnection();
            const request = pool.request();

            const result = await request.query
                (`
                    exec
                    [physician].[spCreatePhysician] 
                        @npi = '${physician.Npi}',
                        @name = '${physician.Name}',
                        @phone_number = '${physician.PhoneNumber}',
                        @alternative_phone_number = '${physician.AlternativePhoneNumber}',
                        @enumeration_date = '${physician.EnumerationDate}',
                        @npiType = '${physician.NpiType}',
                        @is_sole_proprietor = '${physician.IsSoleProprietor}',
                        @is_active = '${physician.IsActive}',
                        @mailing_address = '${physician.MailingAddress}',
                        @primary_practice_address = '${physician.PrimaryPracticeAddress}',
                        @secondary_practice_address = '${physician.SecondaryPracticeAddress}'`
                );

            return result.recordset;

        } catch (error) {
            return Promise.reject(error);
        }
    }

    /**
     * Deletes a physician record based on GUID.
     * 
     * @param physicianGuid - GUID of the physician to delete.
     * @returns Promise resolving when deletion is successful.
     */
    async deletePhysicianByGuid(physicianGuid: string): Promise<any> {
        try {
            const pool = await getMSSQLConnection();
            const request = pool.request();

            const result = await request.query(`exec [physician].[spDeletePhysicianByGuid] @physician_guid='${physicianGuid}'`);

            return result.recordset;
        } catch (error) {
            return Promise.reject(error);
        }
    }

}

export default PhysicianRepository;