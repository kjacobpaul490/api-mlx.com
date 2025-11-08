import type { IMathBusinessService } from "./interfaces/IMathBusinessService.js";

 

class MathBusinessService implements IMathBusinessService {

    add(a: number, b: number): number {
        return a + b;
    }

    subtract(a: number, b: number): number {
        return a - b;
    }
}
export default  MathBusinessService;
