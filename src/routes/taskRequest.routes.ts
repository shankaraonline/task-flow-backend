import { Router } from "express";
import * as handler from "../handlers/taskRequest.handler";
import { requireAuth } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";

const router = Router();

router.post(
  "/",
  requireAuth,requireRole("client"),
  handler.createTaskRequest
);

router.get(
  "/my-requests",
  requireAuth,requireRole("client"),
  handler.getClientRequests
);
router.put("/:id", requireAuth, handler.upsertTaskRequest);

router.delete("/:id", requireAuth, handler.archiveTaskRequest);
export default router;