import { Router } from "express";
import * as handler from "../handlers/service.handler";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

router.post("/", requireAuth, handler.createService);
router.get("/", requireAuth, handler.getServices);
router.put("/:id", requireAuth, handler.upsertService);

router.delete("/:id", requireAuth, handler.archiveService);
export default router;