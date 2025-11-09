import express, { type NextFunction, type Request, type Response } from 'express';
import OrdersBussinessService from "../services/bussinessServices/interfaces/ordersBussinessService.js";

class OrdersController {

    async getOrderByGuid(req: Request, res: Response, next: NextFunction): Promise<any> {
    debugger;

    const ordersBussinessService = new OrdersBussinessService();
   
    const { orderGuid } = req.params;
    if (!orderGuid) {
        return Promise.reject(new Error("orderGuid parameter is required"));
    }
     const result = await ordersBussinessService.getOrderByGuid(orderGuid);
     return   res.json({ result });
}

}
export default new OrdersController();