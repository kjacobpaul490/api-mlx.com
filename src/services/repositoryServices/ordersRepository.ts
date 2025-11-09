import { getMSSQLConnection } from "../../helpers/mssql.js";

class OrdersRepository {
    async createOrder(orderData: any): Promise<void> {
        const pool = await getMSSQLConnection();
        const request = pool.request();
        // Add your SQL query and parameters here
    }

    async getOrderByGuid(orderGuid: string): Promise<any> {
        try {
            const pool = await getMSSQLConnection();
            const request = pool.request();
            // Add your SQL query and parameters here

            const result = await request.query(`SELECT [guid] ,[order_code],[date_of_service] FROM [MLX].[orders].[orders] as o where o.guid='${orderGuid}' and is_deleted=0 `);
            console.log(result.recordset);
            return result.recordset;

        } catch (error) {
            return Promise.reject(error);
        }

    }

    async updateOrder(orderId: string, orderData: any): Promise<void> {
        const pool = await getMSSQLConnection();
        const request = pool.request();
        // Add your SQL query and parameters here
    }

    async deleteOrder(orderId: string): Promise<void> {
        const pool = await getMSSQLConnection();
        const request = pool.request();
        // Add your SQL query and parameters here
    }
}
export default OrdersRepository;