// express imports
import { Router } from "express";

// Controllers
import { 
    getAllClients, 
    updateClient, 
    createClient,
    deleteClient, 
    getClientById
} from "../controllers/client";
import { validateToken } from "../../middlewares/checkJwt";
import { validateCreationClient } from "../validators/client";


const router = Router();

router.get("/",
    [validateToken],
    getAllClients
);

router.get("/:id",
    [validateToken]
    ,getClientById
);

router.put("/:id",
    [validateToken]
    ,updateClient
);
router.delete("/id",
    [validateToken],
    deleteClient
);
    
router.post("/", [
    ...validateCreationClient
],createClient);

export default router;