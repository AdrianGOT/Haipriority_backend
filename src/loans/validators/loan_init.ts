import { check } from "express-validator";
import { checkResult } from "../../middlewares/validatioResult";
import { NextFunction, Request, Response } from "express";

export const validateResults = 
    (req: Request, res: Response, next: NextFunction) => {
        checkResult(req, res, next);
    }

export const validateCreateLoanInit = [
    check('title')
        .exists()
        .notEmpty(),
    check('amountAllowed')
        .exists()
        .notEmpty()
        .isFloat(),
    validateResults
]

export const validateIdLoanInit = [
    check('id')
    .exists()
    .notEmpty(),
    validateResults
]

export const validateUpdateLoanInit = [
    check('title')
        .exists()
        .notEmpty(),
    check('amountAllowed')
        .exists()
        .notEmpty()
        .isFloat(),
    ...validateIdLoanInit
]
