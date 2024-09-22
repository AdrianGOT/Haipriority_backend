// express imports
import { Router } from "express";

// Controllers
import { 
    getAllCreditCard,
    updateCreditCard,
    createCreditCard,
    deleteCreditCard } from "../controllers/creditCard";

import { 
    getAllCard,
    updateCard,
    createCard,
    deleteCard } from "../controllers/cards";

import { validateToken } from "../../../middlewares/checkJwt";
import { validateCreationCreditCard, validateIdCreditCard, validateUpdatingCreditCard } from "../validators/creditCard";
import { checkRole } from "../../../middlewares/checkRole";
import { ROLES } from "../../client/interfaces/client.interfaces";
import { validateCreationCard, validateUpdatingCard } from "../validators/card";


const router = Router();

// Routes to creation of initial cards
router.get('/card', [
    validateToken,
    checkRole([ROLES.admin, ROLES.user]),
] ,getAllCard)

router.post('/card', [
    validateToken,
    checkRole([ROLES.admin]),
    ...validateCreationCard
] ,createCard)

router.put('/card/:id',[
    validateToken,
    checkRole([ROLES.admin]),
    ...validateUpdatingCard
] ,updateCard)

router.delete('/card/:id',[
    validateToken,
    checkRole([ROLES.admin])
] ,deleteCard)

// Routes to assignment to credit card
router.get("/", [ 
    validateToken 
], getAllCreditCard);

router.post("/", [
    validateToken,
    ...validateCreationCreditCard
] ,createCreditCard);

router.put("/:id",[
    validateToken,
    ...validateUpdatingCreditCard
],updateCreditCard);

router.delete("/:id",[
    validateToken,
    ...validateIdCreditCard
] ,deleteCreditCard);


export default router;