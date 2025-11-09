import OrdersRepository from "../../repositoryServices/ordersRepository.js";

class OrdersBussinessService {

   async getOrderByGuid(orderGuid: string): Promise<any> {

        // Business logic can be added here if needed

        const ordersRepository = new OrdersRepository();
        return await ordersRepository.getOrderByGuid(orderGuid);
    }
}
export default OrdersBussinessService;