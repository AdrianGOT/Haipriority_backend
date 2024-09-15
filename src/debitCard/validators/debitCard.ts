import { check } from "express-validator";
import { checkResult } from "../../middlewares/validatioResult";
import { NextFunction, Request, Response } from "express";

export const validateResults = 
    (req: Request, res: Response, next: NextFunction) => {
        checkResult(req, res, next);
    }

export const validateCreationDebitCard = [
    check('cvc')
        .exists()
        .notEmpty()
        .isLength({max: 3, min: 3}),
    check('cardName')
        .exists()
        .notEmpty(),
    check('expirationDate')
        .exists()
        .notEmpty()
        .isDate(),
    check('cardId')
        .exists()
        .notEmpty(),
    validateResults
]

export const validateIdDebitCard = [
    check('id')
    .exists()
    .notEmpty(),
    validateResults
]


export const validateUpdateDebitCard = [
    check('cvc')
        .exists()
        .notEmpty()
        .isLength({max: 3, min: 3}),
    check('cardName')
        .exists()
        .notEmpty(),
    check('expirationDate')
        .exists()
        .notEmpty()
        .isDate(),
    ...validateIdDebitCard


]