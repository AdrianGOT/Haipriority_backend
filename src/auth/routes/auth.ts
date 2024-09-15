// express imports
import { Router } from "express";

// Controllers
import { login } from "../controllers/auth";

const router = Router();

router.post("/login", login);

export default router;