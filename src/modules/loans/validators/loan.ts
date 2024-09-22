import { check } from "express-validator";
import { checkResult } from "../../../middlewares/validatioResult";
import { NextFunction, Request, Response } from "express";

export const validateResults = 
    (req: Request, res: Response, next: NextFunction) => {
        checkResult(req, res, next);
    }

export const validateCreateLoan = [
    check('current_amount')
        .exists()
        .notEmpty()
        .isNumeric(),
    check('limitDate')
        .exists()
        .notEmpty(),
    check('loanId')
        .exists()
        .notEmpty(),
    validateResults
]

export const validateIdLoan = [
    check('id')
    .exists()
    .notEmpty(),
    validateResults
]

export const validateUpdateLoan = [
    check('current_amount')
        .exists()
        .notEmpty()
        .isNumeric(),
    check('limitDate')
        .exists()
        .notEmpty()
        .isDate(),
    ...validateIdLoan
]
