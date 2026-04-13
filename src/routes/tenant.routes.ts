import { Router } from "express";
import * as tenantHandler from "../handlers/tenant.handler";
import { requireAuth } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";

const router = Router();

router.post("/", requireAuth, requireRole("super_admin"),tenantHandler.createTenant);
router.get("/", requireAuth, tenantHandler.getTenants);
router.put("/:id", requireAuth, requireRole("super_admin"),tenantHandler.upsertTenant);

router.delete("/:id", requireAuth,requireRole("super_admin"), tenantHandler.archiveTenant);
export default router;