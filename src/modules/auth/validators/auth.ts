import { check } from "express-validator";
import { checkResult } from "../../../middlewares/validatioResult";
import { NextFunction, Request, Response } from "express";

export const validateCreationClient = [
    check('email')
        .exists()
        .notEmpty()
        .isEmail(),
    check('password')
        .exists()
        .notEmpty(),
        (req: Request, res: Response, next: NextFunction) => {
            checkResult(req, res, next);
        }
]