import { check } from "express-validator";
import { checkResult } from "../../middlewares/validatioResult";
import { NextFunction, Request, Response } from "express";

export const validateCreationCard = [
    check('type')
        .exists()
        .notEmpty(),
    check('amoutallowed')
        .exists()
        .notEmpty()
        .isNumeric(),
    check('franchise')
        .exists()
        .notEmpty(),
        (req: Request, res: Response, next: NextFunction) => {
            checkResult(req, res, next);
        }
]

export const validateUpdatingCard = [
    check('id')
        .exists()
        .notEmpty(),
    check('type')
        .exists()
        .notEmpty(),
    check('amoutallowed')
        .exists()
        .notEmpty()
        .isNumeric(),
    check('franchise')
        .exists()
        .notEmpty(),
        (req: Request, res: Response, next: NextFunction) => {
            checkResult(req, res, next);
        }
]