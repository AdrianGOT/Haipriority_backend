// express imports
import { Router } from "express";

// Controllers
import { 
    getMenuInfo
} from "../controllers/menu";
import { validateToken } from "../../../middlewares/checkJwt";


const router = Router();

router.get("/", [
    validateToken
],getMenuInfo);



export default router;