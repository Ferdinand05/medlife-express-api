import { Router } from "express";

import authRoutes from "./auth.routes";
import adminRoutes from "./admin";
import userRoutes from "./user";

const router = Router();

// admin routes
router.use("/admin", adminRoutes);

// user routes
router.use("/user", userRoutes);

// auth routes
router.use("/", authRoutes);
export default router;
