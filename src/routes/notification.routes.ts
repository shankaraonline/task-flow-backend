import { Router } from "express";
import * as handler from "../handlers/notification.handler";
import { requireAuth } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";

const router = Router();

/**
 * Save browser push subscription
 */
router.post(
    "/subscribe",
    requireAuth,
    handler.subscribe
);


router.post("/", requireAuth, requireRole("admin"), handler.createNotification);

router.get("/", requireAuth, handler.getNotifications);

router.patch("/:id/read", requireAuth, handler.markRead);
router.put("/:id", requireAuth, handler.upsertNotification);

router.delete("/:id", requireAuth, handler.archiveNotification);
export default router;