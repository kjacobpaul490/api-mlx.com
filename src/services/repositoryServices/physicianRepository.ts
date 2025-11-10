import PhysicianMapper from "../../helpers/mapper/physicianMapper.js";
import { getMSSQLConnection } from "../../helpers/mssql.js";

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
                // Add your SQL query and parameters here
    
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
                    // Add your SQL query and parameters here
        
                    const result = await request.query( `exec [physician].[spGetAllphysicians] @pageNumber = '${pageNumber}',@pageSize = '${pageSize}'`);
        
                    return result.recordset.map((record: any)=> this.physicianMapper.mapToPhysician(record));
        
                } catch (error) {
                    return Promise.reject(error);
                }
            
        }

}

export default PhysicianRepository;