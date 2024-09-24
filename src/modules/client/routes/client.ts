// express imports
import { Router } from "express";

// Controllers
import { 
    getAllClients, 
    updateClient, 
    createClient,
    deleteClient, 
    getClientById,
    getClientInfo,
    updateState
} from "../controllers/client";
import { validateToken } from "../../../middlewares/checkJwt";
import { validateClientId, validateCreationClient, validateUpdatingClient, validateUpdatingClientState } from "../validators/client";
import { checkRole } from "../../../middlewares/checkRole";
import { ROLES } from "../interfaces/client.interfaces";


const router = Router();

router.get("/",
    [validateToken],
    getAllClients
);

router.get('/verify', [
    validateToken
],getClientInfo)

router.get("/:id",
    [validateToken]
    ,getClientById
);

router.put("/:id",[
    validateToken,
    ...validateUpdatingClient
    ],updateClient
);

router.delete("/:id",[
    validateToken,
    ...validateClientId
], deleteClient
);
    
router.post("/", [
    ...validateCreationClient
],createClient);

router.patch("/state/:id", [
    validateToken,
    checkRole([ROLES.admin]),
    ...validateUpdatingClientState
], updateState)

export default router;