import { Router } from "express";
import * as handler from "../handlers/user.handler";
import { requireAuth } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";

const router = Router();

router.post("/", requireAuth, requireRole("admin"), handler.createUser);

router.get("/", requireAuth, requireRole("admin"), handler.getUsers);
router.get("/employees", requireAuth, handler.getEmployees);
router.put(
    "/:id",
    requireAuth,
     requireRole("admin"),
    handler.upsertUser
);

router.delete(
    "/:id",
    requireAuth,
     requireRole("admin"),
    handler.archiveUser
);
export default router;