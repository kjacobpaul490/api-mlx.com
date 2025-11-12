import express, {type Request, type Response } from 'express';
import PhysicianBusinessService from '../services/bussinessServices/physicianBusinessService.js';



class PhysicianController {
     async getPhysicianByGuid (req: Request, res: Response): Promise<any> {   
      
        const physicianBusinessService = new PhysicianBusinessService();
        const { physicianGuid } = req.params;
        if (!physicianGuid) {
            return Promise.reject(new Error("physicianGuid parameter is required"));
        }   
        const result = await physicianBusinessService.getPhysicianByGuid(physicianGuid);
        return res.json({ result });
    }

    async getAllphysicians (req: Request, res: Response): Promise<any> {   
        const physicianBusinessService = new PhysicianBusinessService();
        const pageNumber = parseInt(req.query.pageNumber as string) || 1;
        const pageSize = parseInt(req.query.pageSize as string) || 20;
        const result = await physicianBusinessService.getAllphysicians(pageNumber, pageSize);
        return res.json({ result });
    }

    async createPhysician (req: Request, res: Response): Promise<any> {
        const physicianBusinessService = new PhysicianBusinessService();
        const physician = req.body;
        const result = await physicianBusinessService.createPhysician(physician);
        return res.json({ result });
    }

    async deletePhysicianByGuid(req: Request, res: Response): Promise<any> {
        const physicianBusinessService = new PhysicianBusinessService();
        const { physicianGuid } = req.params;

        if (!physicianGuid) {
            return Promise.reject(new Error("physicianGuid parameter is required"));
        }

        await physicianBusinessService.deletePhysicianByGuid(physicianGuid);
        return res.json({ message: "Physician deleted successfully", physicianGuid });
    }
}
export default new PhysicianController;