import { check } from "express-validator";
import { checkResult } from "../../middlewares/validatioResult";
import { NextFunction, Request, Response } from "express";

export const validateCreationClient = [
    check('name')
        .exists()
        .notEmpty(),
    check('email')
        .exists()
        .notEmpty()
        .isEmail(),
    check('password')
        .exists()
        .notEmpty(),
    check('phoneNumber')
        .exists()
        .notEmpty(),
        (req: Request, res: Response, next: NextFunction) => {
            checkResult(req, res, next);
        }
]

export const validateUpdatingClient = [
    check('name')
        .exists()
        .notEmpty(),
    check('email')
        .exists()
        .notEmpty()
        .isEmail(),
    check('phoneNumber')
        .exists()
        .notEmpty(),
    (req: Request, res: Response, next: NextFunction) => {
        checkResult(req, res, next);
    }
]