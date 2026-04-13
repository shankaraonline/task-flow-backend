import { Router } from "express";
import * as handler from "../handlers/project.handler";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

router.post("/", requireAuth, handler.createProject);
router.get("/", requireAuth, handler.getProjects);
router.put("/:id", requireAuth, handler.upsertProject);

router.delete("/:id", requireAuth, handler.archiveProject);
export default router;