import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const checkResult = 
    (req: Request, res: Response, next: NextFunction) => {

        
        const err = validationResult(req);
        
        if(!err.isEmpty()){
        
            return res.status(403).json({
                ok: false,
                errors: err.mapped(),
                msg: "Hay errores con los valores ingresados"
            })
        }
        next();
}
