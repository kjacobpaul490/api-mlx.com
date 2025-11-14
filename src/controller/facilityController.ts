import express, { type Request, type Response } from 'express';
import FacilityBusinessService from "../services/bussinessServices/facilityBusinessService.js";

class FacilityController {

    /**
     * Fetch a facility by its GUID
     * @param req Express request object
     * @param res Express response object
     */
    async getFacilityByGuid(req: Request, res: Response): Promise<any> {
        const facilityBusinessService = new FacilityBusinessService();
        const { facility_guid } = req.params;

        if (!facility_guid) {
            return Promise.reject(new Error("facility_guid parameter is required"));
        }

        const result = await facilityBusinessService.getFacilityByGuid(facility_guid);
        return res.json({ result });
    }

    /**
     * Fetch paginated list of all facilities
     * @param req Express request object
     * @param res Express response object
     */
    async getAllfacilities(req: Request, res: Response): Promise<any> {
        const facilityBusinessService = new FacilityBusinessService();
        const pageNumber = parseInt(req.query.pageNumber as string) || 1;
        const pageSize = parseInt(req.query.pageSize as string) || 10;

        const result = await facilityBusinessService.getAllfacilities(pageNumber, pageSize);
        return res.json({ result });
    }

    /**
     * Create a new facility
     * @param req Express request containing facility data
     * @param res Express response object
     */
    async createFacility(req: Request, res: Response): Promise<any> {
        const facilityBusinessService = new FacilityBusinessService();
        const facility = req.body;
        
        const result = await facilityBusinessService.createFacility(facility);
        return res.json({ result });
    }

    /**
     * Delete a facility by its GUID
     * @param req Express request object
     * @param res Express response object
     */
    async deleteFacilityByGuid(req: Request, res: Response): Promise<any> {
        const facilityBusinessService = new FacilityBusinessService();
        const { facilityGuid } = req.params;

        if (!facilityGuid) {
            return Promise.reject(new Error("facilityGuid parameter is required"));
        }

        await facilityBusinessService.deleteFacilityByGuid(facilityGuid);
        return res.json({ message: "Facility deleted successfully", facilityGuid });
    }
}

export default new FacilityController;