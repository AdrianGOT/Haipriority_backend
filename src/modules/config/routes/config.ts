import { Router } from "express";
import { validateToken } from "../../../middlewares/checkJwt";
import { saveFrontendPublicKey } from "../controller/config";
import { validatePublicKey } from "../validators/config";

const router = Router()

router.post("/",[
    validateToken,
    ...validatePublicKey
], saveFrontendPublicKey)

export default router;