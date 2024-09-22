// express imports
import { Router } from "express";

import { validateToken } from "../../../middlewares/checkJwt";
import { validateCreateLoanInit, validateIdLoanInit, validateUpdateLoanInit } from "../validators/loan_init";
import { validateCreateLoan, validateIdLoan, validateUpdateLoan } from "../validators/loan";
import { checkRole } from "../../../middlewares/checkRole";
import { ROLES } from "../../client/interfaces/client.interfaces";


// Controllers
import { 
    getAllLoan, 
    updateLoan, 
    createLoan,
    deleteLoan 
} from "../controllers/loans";


import { 
    getAllLoanInit, 
    createLoanInit,
    updateLoanInit, 
    deleteLoanInit 
} from "../controllers/loan_init";

const router = Router();

router.get("/loan", [
    validateToken,
    checkRole([ROLES.admin, ROLES.user]),
],getAllLoanInit);

router.post("/loan", [
    validateToken,
    checkRole([ROLES.admin]),
    ...validateCreateLoanInit
],createLoanInit);

router.put("/loan/:id", [
    validateToken,
    checkRole([ROLES.admin]),
    ...validateUpdateLoanInit
],updateLoanInit);

router.delete("/loan/:id", [
    validateToken,
    checkRole([ROLES.admin]),
    ...validateIdLoanInit
],deleteLoanInit);


// ============ 
router.get("/", [
    validateToken
],getAllLoan);

router.post("/", [
    validateToken,
    ...validateCreateLoan
],createLoan);

router.put("/:id", [
    validateToken,
    ...validateUpdateLoan
],updateLoan);

router.delete("/:id", [
    validateToken,
    ...validateIdLoan
],deleteLoan);


export default router;