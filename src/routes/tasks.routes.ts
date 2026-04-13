import { Router } from "express";
import * as handler from "../handlers/tasks.handler";
import { requireAuth } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";

const router = Router();

router.post("/assign", requireAuth, handler.assignTask);
router.get("/", requireAuth, handler.getTasks);
router.patch("/status/:entryId", requireAuth, handler.updateStatus);
router.put("/:id", requireAuth, requireRole("admin"), handler.upsertTask);

router.delete("/:id", requireAuth, requireRole("admin"), handler.archiveTask);
export default router;8