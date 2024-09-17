// express imports
import { Router } from "express";

// Controllers
import { getPublicKey, login } from "../controllers/auth";

const router = Router();

router.post("/login", login);
router.get("/public-key", getPublicKey);

export default router;