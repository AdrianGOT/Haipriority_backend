import { check } from "express-validator";
import { checkResult } from "../../middlewares/validatioResult";
import { NextFunction, Request, Response } from "express";

export const validateResults = 
(req: Request, res: Response, next: NextFunction) => {
        checkResult(req, res, next);
    }

export const validateCreationCreditCard = [

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
    check('paymentDate')
        .exists()
        .notEmpty(),
    check('courtDate')
        .exists()
        .notEmpty()
        .isNumeric(),
    check('cardId')
        .exists()
        .notEmpty(),
    validateResults
]

export const validateIdCreditCard = [
    check('id')
    .exists()
    .notEmpty(),
    validateResults
]

export const validateUpdatingCreditCard = [
 
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
    check('paymentDate')
        .exists()
        .notEmpty(),
    check('courtDate')
        .exists()
        .notEmpty()
        .isNumeric(),
    ...validateIdCreditCard,
]


