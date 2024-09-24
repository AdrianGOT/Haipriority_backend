import { Router } from "express";
import { validateToken } from "../../../middlewares/checkJwt";
import { getSecretKey } from "../controller/config";
import { validatePublicKey } from "../validators/config";

const router = Router()

router.get("/",[
    validateToken,
], getSecretKey)

export default router;