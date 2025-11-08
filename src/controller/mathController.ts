import express, { type NextFunction, type Request, type Response } from 'express';
import MathBusinessService from '../services/mathBussinessService.js';

class MathController {


    add(req: Request, res: Response, next: NextFunction): any {
        debugger
        const { a, b } = req.query;
        const result = MathBusinessService.add(Number(a), Number(b));
        res.json({ result });
    }

    subtract(a: number, b: number): number {
        debugger;
        return a - b;
    }
}
export default new MathController();