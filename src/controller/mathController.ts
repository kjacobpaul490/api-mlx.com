import express, { type NextFunction, type Request, type Response } from 'express';
import MathBusinessService from '../services/bussinessServices/mathBussinessService.js';
import type { IMathBusinessService } from '../services/bussinessServices/interfaces/IMathBusinessService.js';
const mathBusinessService: IMathBusinessService = new MathBusinessService();

class MathController {


    add(req: Request, res: Response, next: NextFunction): any {
        debugger
        const { a, b } = req.query;
        const result = mathBusinessService.add(Number(a), Number(b));
        res.json({ result });
    }

    subtract(a: number, b: number): number {
        debugger;
        return a - b;
    }
}
export default new MathController();