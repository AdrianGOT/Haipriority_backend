// express imports
import { Router } from "express";

// Controllers
import { 
    getAllDebitCard,
    updateDebitCard,
    createDebitCard,
    deleteDebitCard } from "../controllers/debitCard";

import { 
    getAllCard,
    updateCard,
    createCard,
    deleteCard } from "../controllers/cards";

import { validateToken } from "../../../middlewares/checkJwt";
import { checkRole } from "../../../middlewares/checkRole";
import { ROLES } from "../../client/interfaces/client.interfaces";
import { validateCreationCard, validateUpdatingCard } from "../validators/card";
import { validateCreationDebitCard, validateIdDebitCard, validateUpdateDebitCard } from "../validators/debitCard";


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


router.get("/", [
    validateToken
], getAllDebitCard);

router.post("/", [
    validateToken,
    ...validateCreationDebitCard
] ,createDebitCard);

router.put("/:id",[
    validateToken,
    ...validateUpdateDebitCard
], updateDebitCard);

router.delete("/:id", [
    validateToken,
    ...validateIdDebitCard
],deleteDebitCard);


export default router;