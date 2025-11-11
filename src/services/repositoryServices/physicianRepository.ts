import PhysicianMapper from "../../helpers/mapper/physicianMapper.js";
import { getMSSQLConnection } from "../../helpers/mssql.js";
import type { Physician } from "../../models/physician.js";

class PhysicianRepository {

    private physicianMapper: PhysicianMapper;

    constructor(){
        this.physicianMapper = new PhysicianMapper();
    }

    // Implementation of PatientsRepository methods
    /**
         * 
         * @param physicianGuid 
         * @returns 
         */
    
        async getPhysicianByGuid(physicianGuid: string): Promise<any> {
            try {
                const pool = await getMSSQLConnection();
                const request = pool.request();
    
                const result = await request.query( `exec [physician].[spGetphysicianByGuid] @physician_guid='${physicianGuid}'`);
    
                return result.recordset;
    
            } catch (error) {
                return Promise.reject(error);
            }
        }   

        async getAllphysicians(pageNumber: Number, pageSize: Number): Promise<any> {
            try {
                const pool = await getMSSQLConnection();
                const request = pool.request();
        
                 const result = await request.query( `exec [physician].[spGetAllphysicians] @pageNumber = '${pageNumber}',@pageSize = '${pageSize}'`);
        
                return result.recordset.map((record: any)=> this.physicianMapper.mapToPhysician(record));
        
            } catch (error) {
                return Promise.reject(error);
            }
            
        }

        async createPhysician (physician: Physician): Promise<any> 
        {
            try
            {
                const pool = await getMSSQLConnection();
                const request = pool.request();

                const result = await request.query
                (`
                    exec
                    [physician].[spCreatePhysician] 
                        @npi = '${physician.Npi}',
                        @name = '${physician.Name}',
                        @phone_number = '${physician.PhoneNumber}',
                        @alternative_phone_number = '${physician.Npi}',
                        @enumeration_date = '${physician.EnumerationDate}',
                        @npiType = '${physician.NpiType}',
                        @is_sole_proprietor = '${physician.IsSoleProprietor}',
                        @is_active = '${physician.IsActive}',
                        @mailing_address = '${physician.MailingAddress}',
                        @primary_practice_address = '${physician.PrimaryPracticeAddress}',
                        @secondary_practice_address = '${physician.SecondaryPracticeAddress}'`
                );

                return result.recordset;  

             } catch (error) 
             {
                return Promise.reject(error);
             }         
        }

}

export default PhysicianRepository;