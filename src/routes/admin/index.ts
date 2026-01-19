import { Router } from "express";
import categoryRoutes from "./category.routes";
import medicineRoutes from "./medicine.routes";
import userRoutes from "./user.routes";
import { authMiddleware } from "../../middleware/auth.middleware";
import { isAdmin } from "../../middleware/admin.middleware";
const router = Router();

// middleware
router.use(authMiddleware, isAdmin);
// admin routes
// /admin
router.use("/categories", categoryRoutes);
router.use("/medicines", medicineRoutes);
router.use("/users", userRoutes);

export default router;
