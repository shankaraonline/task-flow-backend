import { Router } from "express";
import * as handler from "../handlers/auth.handler";

const router = Router();

router.post("/login", handler.login);

export default router;