import express from "express";
import cors from "cors";
import helmet from "helmet";

import userRoutes from "./routes/user.routes";
import projectRoutes from "./routes/project.routes";
import taskRoutes from "./routes/tasks.routes";
import tenantRoutes from "./routes/tenant.routes";

import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

import rateLimit from "express-rate-limit";
import compression from "compression";
import pinoHttp from "pino-http";

import { errorHandler } from "./middleware/error.middleware";
import notificationRoutes from "./routes/notification.routes"
import taskRequestRoutes from "./routes/taskRequest.routes";
import authRoutes from "./routes/auth.routes";

const app = express();

const swaggerDocument = YAML.load(
  path.join(__dirname, "docs/swagger.yaml")
);

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  })
);

app.use(compression());

app.use(
  pinoHttp({
    transport: {
      target: "pino-pretty"
    }
  })
);
app.use(errorHandler);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/tenants", tenantRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/task-requests", taskRequestRoutes);
export default app;